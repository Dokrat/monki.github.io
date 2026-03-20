'use strict';

const PROP_KEY = 'planConfig';
const HISTORY_KEY = 'gymtimerConfigHistory';

// ── Serialization ──────────────────────────────────────────────────────────
// Format: "PlanName|LOOPS:N|ExName,sets,reps,rest,workTime|..."
// LOOPS token is optional (omitted when loops=1); reps=0 → MAX; workTime=0 → no limit
function serializePlan(p) {
  const parts = [p.planName || 'My Plan'];
  if (p.loops && p.loops > 1) parts.push(`LOOPS:${p.loops}`);
  (p.exercises || []).forEach(e => {
    parts.push(`${e.name},${e.sets},${e.reps},${e.rest},${e.workTime || 0}`);
  });
  return parts.join('|');
}

function deserializePlan(raw) {
  if (!raw) return null;
  const parts = raw.split('|');
  if (parts.length < 1) return null;
  const p = { planName: parts[0], exercises: [], loops: 1 };
  let startIdx = 1;
  if (parts.length > 1 && parts[1].startsWith('LOOPS:')) {
    p.loops = parseInt(parts[1].slice(6)) || 1;
    startIdx = 2;
  }
  for (let i = startIdx; i < parts.length; i++) {
    const f = parts[i].split(',');
    if (f.length >= 4) {
      p.exercises.push({
        name:     f[0],
        sets:     parseInt(f[1]) || 3,
        reps:     parseInt(f[2]),        // 0 = MAX — keep as-is
        rest:     parseInt(f[3]) || 60,
        workTime: f.length >= 5 ? (parseInt(f[4]) || 0) : 0,
      });
    }
  }
  return p;
}

function serializeAll(plans) { return plans.map(serializePlan).join(';'); }

function deserializeAll(raw) {
  if (!raw) return [];
  return raw.split(';').map(deserializePlan).filter(p => p !== null);
}

// ── Garmin SDK bridge ──────────────────────────────────────────────────────
const GarminSDK = (() => {
  if (window.garmin && window.garmin.settings) {
    return {
      getSettings: cb => window.garmin.settings.getSettings(s => cb(deserializeAll(s[PROP_KEY]))),
      setSettings: (plans, cb) => {
        const payload = {};
        payload[PROP_KEY] = serializeAll(plans);
        window.garmin.settings.setSettings(payload, cb);
      },
    };
  }
  return {
    getSettings: cb => cb(deserializeAll(localStorage.getItem('gymtimerPlanConfig'))),
    setSettings: (plans, cb) => {
      localStorage.setItem('gymtimerPlanConfig', serializeAll(plans));
      if (cb) cb();
    },
  };
})();

// ── State ──────────────────────────────────────────────────────────────────
let allExercises    = [];
let plan            = { planName: '', exercises: [], loops: 1 };
let savedPlans      = [];
let pendingExercise = null;
let editingIndex    = null;

// ── DOM refs ──────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const planNameEl     = $('planName');
const exerciseListEl = $('exerciseList');
const exerciseCount  = $('exerciseCount');
const modalOverlay   = $('modalOverlay');
const editOverlay    = $('editOverlay');
const searchInput    = $('searchInput');
const searchResults  = $('searchResults');
const filterMuscle   = $('filterMuscle');
const filterEquip    = $('filterEquip');
const paramsPanel    = $('paramsPanel');
const selectedName   = $('selectedName');

// ── Init ──────────────────────────────────────────────────────────────────
async function init() {
  await loadExercises();
  loadSavedPlans();
  renderHistory();
  bindEvents();
}

async function loadExercises() {
  try {
    const res = await fetch('exercises.json');
    const data = await res.json();
    allExercises = data.exercises || [];
    populateFilters();
  } catch (e) {
    allExercises = [];
  }
}

function loadSavedPlans() {
  GarminSDK.getSettings(loaded => {
    savedPlans = loaded || [];
    renderPlanList();
  });
}

// ── Filter dropdowns ──────────────────────────────────────────────────────
function populateFilters() {
  const muscles = new Set(), equips = new Set();
  allExercises.forEach(e => {
    (e.primaryMuscles || []).forEach(m => muscles.add(m));
    if (e.equipment) equips.add(e.equipment);
  });
  [...muscles].sort().forEach(m => {
    const o = document.createElement('option');
    o.value = m; o.textContent = capitalize(m);
    filterMuscle.appendChild(o);
  });
  [...equips].sort().forEach(eq => {
    const o = document.createElement('option');
    o.value = eq; o.textContent = capitalize(eq);
    filterEquip.appendChild(o);
  });
}

// ── Exercise list render ──────────────────────────────────────────────────
function renderExerciseList() {
  exerciseCount.textContent = plan.exercises.length;
  exerciseListEl.innerHTML = '';

  if (plan.exercises.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty-state';
    li.textContent = 'No exercises added yet';
    exerciseListEl.appendChild(li);
    return;
  }

  plan.exercises.forEach((ex, i) => {
    const repsDisplay = ex.reps === 0 ? 'MAX' : ex.reps;
    const wtDisplay   = ex.workTime > 0 ? ` · ${ex.workTime}s work` : '';
    const li = document.createElement('li');
    li.className = 'exercise-item';
    li.dataset.index = i;
    li.innerHTML = `
      <div class="exercise-index">${i + 1}</div>
      <div class="exercise-info">
        <div class="exercise-name">${ex.name}</div>
        <div class="exercise-params">${ex.sets} sets · ${repsDisplay} reps${wtDisplay} · ${ex.rest}s rest</div>
      </div>
      <div class="exercise-drag">☰</div>
    `;
    li.addEventListener('click', () => openEditModal(i));
    exerciseListEl.appendChild(li);
  });
}

// ── Plan list render ──────────────────────────────────────────────────────
function renderPlanList() {
  const listEl  = $('planList');
  const countEl = $('planCount');
  countEl.textContent = savedPlans.length;

  if (savedPlans.length === 0) {
    listEl.innerHTML = '<div class="empty-state">No plans added yet</div>';
    $('btnGenerateConfig').style.display = 'none';
    return;
  }

  $('btnGenerateConfig').style.display = '';
  listEl.innerHTML = '';
  savedPlans.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'plan-card';
    const loopMeta = p.loops > 1 ? ` · ${p.loops}× loop` : '';
    card.innerHTML = `
      <div class="plan-card-info">
        <div class="plan-card-name">${p.planName}</div>
        <div class="plan-card-meta">${p.exercises.length} exercise${p.exercises.length !== 1 ? 's' : ''}${loopMeta}</div>
      </div>
      <button class="btn-remove-plan" data-index="${i}" title="Remove plan">✕</button>
    `;
    card.querySelector('.btn-remove-plan').addEventListener('click', e => {
      e.stopPropagation();
      savedPlans.splice(i, 1);
      renderPlanList();
      $('outputSection').style.display = 'none';
    });
    card.addEventListener('click', () => loadPlanIntoEditor(i));
    listEl.appendChild(card);
  });
}

// ── History ───────────────────────────────────────────────────────────────
function saveToHistory(str) {
  let history = [];
  try { history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch (_) {}
  history.unshift({ ts: Date.now(), str });
  if (history.length > 10) history = history.slice(0, 10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  let history = [];
  try { history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch (_) {}
  const section = $('historySection');
  const listEl  = $('historyList');
  if (!history.length) { section.style.display = 'none'; return; }
  section.style.display = '';
  listEl.innerHTML = '';
  history.forEach((entry, i) => {
    const d = new Date(entry.ts);
    const ts = `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const row = document.createElement('div');
    row.className = 'history-entry';
    row.innerHTML = `
      <div class="history-meta">${ts}</div>
      <div class="history-str">${entry.str.length > 60 ? entry.str.slice(0, 60) + '…' : entry.str}</div>
      <div class="history-actions">
        <button class="btn-history-copy">Copy</button>
        <button class="btn-history-load">Load</button>
      </div>
    `;
    row.querySelector('.btn-history-copy').addEventListener('click', () => {
      copyText(entry.str, 'Copied ✓');
    });
    row.querySelector('.btn-history-load').addEventListener('click', () => {
      importString(entry.str);
    });
    listEl.appendChild(row);
  });
}

// ── Import from string ─────────────────────────────────────────────────────
function importString(raw) {
  raw = (raw || '').trim();
  if (!raw) { showToast('Paste a plan string first.'); return; }
  const plans = deserializeAll(raw).filter(p => p && p.exercises.length);
  if (!plans.length) { showToast('Invalid plan string.'); return; }
  $('importInput').value = '';
  if (plans.length === 1) {
    plan = plans[0];
    planNameEl.value = plan.planName;
    _restoreLoopUI(plan.loops);
    renderExerciseList();
    showToast(`"${plan.planName}" loaded into editor ✓`);
    planNameEl.scrollIntoView({ behavior: 'smooth' });
  } else {
    plans.forEach(p => savedPlans.push(p));
    renderPlanList();
    showToast(`${plans.length} plans loaded into list ✓`);
    $('planListSection').scrollIntoView({ behavior: 'smooth' });
  }
}

// ── Load plan from list into editor ───────────────────────────────────────
function loadPlanIntoEditor(index) {
  const p = savedPlans[index];
  plan = { planName: p.planName, exercises: p.exercises.map(e => ({ ...e })), loops: p.loops || 1 };
  planNameEl.value = plan.planName;
  _restoreLoopUI(plan.loops);
  renderExerciseList();
  showToast(`"${plan.planName}" loaded into editor`);
  planNameEl.scrollIntoView({ behavior: 'smooth' });
}

// ── Search ────────────────────────────────────────────────────────────────
function runSearch() {
  const query  = searchInput.value.trim().toLowerCase();
  const muscle = filterMuscle.value;
  const equip  = filterEquip.value;

  let results = allExercises;
  if (query)  results = results.filter(e => e.name.toLowerCase().includes(query));
  if (muscle) results = results.filter(e => (e.primaryMuscles || []).includes(muscle));
  if (equip)  results = results.filter(e => e.equipment === equip);

  const shown = results.slice(0, 60);
  searchResults.innerHTML = '';

  if (shown.length === 0) {
    searchResults.innerHTML = '<li style="color:var(--text-dim);padding:12px;text-align:center">No results</li>';
    return;
  }

  shown.forEach(ex => {
    const li = document.createElement('li');
    li.className = 'search-result-item';
    li.innerHTML = `
      <div class="result-name">${ex.name}</div>
      <div class="result-meta">${(ex.primaryMuscles || []).map(capitalize).join(', ')} · ${capitalize(ex.equipment || '')}${(ex.secondaryMuscles || []).length ? ' [' + ex.secondaryMuscles.map(capitalize).join(', ') + ']' : ''}</div>
    `;
    li.addEventListener('click', () => selectExercise(ex.name));
    searchResults.appendChild(li);
  });
}

function selectExercise(name) {
  pendingExercise = name;
  searchResults.querySelectorAll('.search-result-item').forEach(el => {
    el.classList.toggle('selected', el.querySelector('.result-name').textContent === name);
  });
  selectedName.textContent = name;
  paramsPanel.classList.remove('hidden');
  paramsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Add flow ──────────────────────────────────────────────────────────────
function openAddModal() {
  pendingExercise = null;
  paramsPanel.classList.add('hidden');
  searchInput.value = '';
  $('customName').value = '';
  $('paramRepsMax').checked = false;
  $('paramReps').value = 10;
  $('paramWorkTime').value = 0;
  switchTab('list');
  runSearch();
  modalOverlay.classList.add('open');
  setTimeout(() => searchInput.focus(), 300);
}

function closeAddModal() { modalOverlay.classList.remove('open'); }

function confirmAdd() {
  if (!pendingExercise) return;
  const isMax = $('paramRepsMax').checked;
  plan.exercises.push({
    name:     pendingExercise,
    sets:     parseInt($('paramSets').value) || 3,
    reps:     isMax ? 0 : (parseInt($('paramReps').value) || 10),
    rest:     parseInt($('paramRest').value) || 60,
    workTime: parseInt($('paramWorkTime').value) || 0,
  });
  renderExerciseList();
  closeAddModal();
}

function addCustom() {
  const name = $('customName').value.trim();
  if (!name) return;
  selectExercise(name);
}

// ── Edit flow ─────────────────────────────────────────────────────────────
function openEditModal(index) {
  editingIndex = index;
  const ex = plan.exercises[index];
  $('editName').textContent     = ex.name;
  $('editSets').value           = ex.sets;
  $('editReps').value           = ex.reps;
  $('editRest').value           = ex.rest;
  $('editWorkTime').value       = ex.workTime || 0;
  $('editRepsMax').checked      = ex.reps === 0;
  editOverlay.classList.add('open');
}

function closeEditModal() {
  editOverlay.classList.remove('open');
  editingIndex = null;
}

function confirmEdit() {
  if (editingIndex === null) return;
  const isMax = $('editRepsMax').checked;
  plan.exercises[editingIndex] = {
    name:     plan.exercises[editingIndex].name,
    sets:     parseInt($('editSets').value) || 3,
    reps:     isMax ? 0 : (parseInt($('editReps').value) || 10),
    rest:     parseInt($('editRest').value) || 60,
    workTime: parseInt($('editWorkTime').value) || 0,
  };
  renderExerciseList();
  closeEditModal();
}

function moveExercise(delta) {
  if (editingIndex === null) return;
  const newIdx = editingIndex + delta;
  if (newIdx < 0 || newIdx >= plan.exercises.length) return;
  const tmp = plan.exercises[editingIndex];
  plan.exercises[editingIndex] = plan.exercises[newIdx];
  plan.exercises[newIdx] = tmp;
  editingIndex = newIdx;
  renderExerciseList();
  // Update edit modal index indicator
  $('editName').textContent = plan.exercises[editingIndex].name;
}

function deleteExercise() {
  if (editingIndex === null) return;
  plan.exercises.splice(editingIndex, 1);
  renderExerciseList();
  closeEditModal();
}

// ── Add plan to list ──────────────────────────────────────────────────────
function addPlanToList() {
  const name = planNameEl.value.trim() || 'My Plan';
  if (!plan.exercises.length) {
    showToast('Add at least one exercise first.');
    return;
  }
  const loopEnabled = $('loopEnabled').checked;
  const loops = loopEnabled ? (parseInt($('loopCount').value) || 2) : 1;
  savedPlans.push({ planName: name, exercises: [...plan.exercises], loops });
  plan = { planName: '', exercises: [], loops: 1 };
  planNameEl.value = '';
  $('loopEnabled').checked = false;
  $('loopCountWrap').style.display = 'none';
  renderExerciseList();
  renderPlanList();
  showToast(`"${name}" added to list ✓`);
  $('planListSection').scrollIntoView({ behavior: 'smooth' });
}

// ── Generate config string ────────────────────────────────────────────────
function generateConfigString() {
  if (!savedPlans.length) {
    showToast('Add at least one plan first.');
    return;
  }
  const str = serializeAll(savedPlans);
  saveToHistory(str);

  const section = $('outputSection');
  const output  = $('planOutput');
  section.style.display = '';
  output.value = str;
  output.select();
  section.scrollIntoView({ behavior: 'smooth' });

  GarminSDK.setSettings(savedPlans, () => {
    showToast('Config generated ✓');
  });
}

// ── Tabs ──────────────────────────────────────────────────────────────────
function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('hidden', c.id !== 'tab' + capitalize(tabId)));
}

// ── Toast ─────────────────────────────────────────────────────────────────
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ── Copy helper ───────────────────────────────────────────────────────────
function copyText(val, msg) {
  navigator.clipboard.writeText(val)
    .then(() => showToast(msg))
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = val;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(msg);
    });
}

// ── Loop UI helper ────────────────────────────────────────────────────────
function _restoreLoopUI(loops) {
  const enabled = loops > 1;
  $('loopEnabled').checked = enabled;
  if (enabled) $('loopCount').value = loops;
  $('loopCountWrap').style.display = enabled ? 'flex' : 'none';
}

// ── Helpers ───────────────────────────────────────────────────────────────
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Events ────────────────────────────────────────────────────────────────
function bindEvents() {
  $('btnAdd').addEventListener('click', openAddModal);
  $('btnCloseModal').addEventListener('click', closeAddModal);
  $('btnConfirmAdd').addEventListener('click', confirmAdd);
  $('btnAddCustom').addEventListener('click', addCustom);
  $('btnSave').addEventListener('click', addPlanToList);
  $('btnGenerateConfig').addEventListener('click', generateConfigString);
  $('btnImport').addEventListener('click', () => importString($('importInput').value));

  $('btnCopy').addEventListener('click', () => copyText($('planOutput').value, 'Copied ✓'));

  $('btnCloseOutput').addEventListener('click', () => {
    $('outputSection').style.display = 'none';
  });

  $('btnClearHistory').addEventListener('click', () => {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
  });

  $('btnCloseEdit').addEventListener('click', closeEditModal);
  $('btnConfirmEdit').addEventListener('click', confirmEdit);
  $('btnDeleteExercise').addEventListener('click', deleteExercise);
  $('btnMoveUp').addEventListener('click', () => moveExercise(-1));
  $('btnMoveDown').addEventListener('click', () => moveExercise(1));

  // Loop training checkbox
  $('loopEnabled').addEventListener('change', e => {
    $('loopCountWrap').style.display = e.target.checked ? 'flex' : 'none';
  });

  // MAX reps checkbox syncs with reps field
  $('paramRepsMax').addEventListener('change', e => {
    $('paramReps').disabled = e.target.checked;
    if (e.target.checked) $('paramReps').value = 0;
    else if ($('paramReps').value == '0') $('paramReps').value = 10;
  });
  $('editRepsMax').addEventListener('change', e => {
    $('editReps').disabled = e.target.checked;
    if (e.target.checked) $('editReps').value = 0;
    else if ($('editReps').value == '0') $('editReps').value = 10;
  });

  searchInput.addEventListener('input', runSearch);
  filterMuscle.addEventListener('change', runSearch);
  filterEquip.addEventListener('change', runSearch);

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Close overlay on tap/click outside modal — use pointerdown for mobile
  modalOverlay.addEventListener('pointerdown', e => {
    if (e.target === modalOverlay) closeAddModal();
  });
  editOverlay.addEventListener('pointerdown', e => {
    if (e.target === editOverlay) closeEditModal();
  });
}

// ── Visual viewport: push page up when keyboard appears ───────────────────
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const offset = window.innerHeight - window.visualViewport.height;
    document.body.style.marginBottom = offset > 0 ? offset + 'px' : '';
    if (offset > 50) {
      const el = document.activeElement;
      if (el && el !== document.body) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      }
    }
  });
}

// ── Start ─────────────────────────────────────────────────────────────────
init();
