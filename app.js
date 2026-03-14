'use strict';

// ── Garmin Connect SDK bridge ──────────────────────────────────────────────
// Property key used on the watch side (properties.xml).
const PROP_KEY = 'planConfig';

// Pipe-delimited format for one plan: "Plan Name|Ex Name,sets,reps,rest|..."
// Plans separated by semicolons: "Plan1|...|...;Plan2|...|..."
function serializePlan(p) {
  const parts = [p.planName || 'My Plan'];
  (p.exercises || []).forEach(e => {
    parts.push(`${e.name},${e.sets},${e.reps},${e.rest}`);
  });
  return parts.join('|');
}

function deserializePlan(raw) {
  if (!raw) return null;
  const parts = raw.split('|');
  if (parts.length < 1) return null;
  const p = { planName: parts[0], exercises: [] };
  for (let i = 1; i < parts.length; i++) {
    const f = parts[i].split(',');
    if (f.length >= 4) {
      p.exercises.push({ name: f[0], sets: parseInt(f[1]) || 3, reps: parseInt(f[2]) || 10, rest: parseInt(f[3]) || 60 });
    }
  }
  return p;
}

function serializeAll(plans) {
  return plans.map(serializePlan).join(';');
}

function deserializeAll(raw) {
  if (!raw) return [];
  return raw.split(';').map(deserializePlan).filter(p => p !== null);
}

// In production Garmin injects window.garmin.settings.
// In browser dev mode we use localStorage as a mock.
const GarminSDK = (() => {
  if (window.garmin && window.garmin.settings) {
    return {
      getSettings: (cb) => window.garmin.settings.getSettings(settings => {
        cb(deserializeAll(settings[PROP_KEY]));
      }),
      setSettings: (plans, cb) => {
        const payload = {};
        payload[PROP_KEY] = serializeAll(plans);
        window.garmin.settings.setSettings(payload, cb);
      },
    };
  }
  // Dev mock via localStorage
  return {
    getSettings: (cb) => {
      const raw = localStorage.getItem('gymtimerPlanConfig');
      cb(deserializeAll(raw));
    },
    setSettings: (plans, cb) => {
      localStorage.setItem('gymtimerPlanConfig', serializeAll(plans));
      if (cb) cb();
    },
  };
})();

// ── State ─────────────────────────────────────────────────────────────────
let allExercises  = [];   // full library from exercises.json
let plan          = { planName: '', exercises: [] };  // plan being built
let savedPlans    = [];   // list of finalized plans [{ planName, exercises[] }]
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
  bindEvents();
}

async function loadExercises() {
  try {
    const res = await fetch('exercises.json');
    const data = await res.json();
    allExercises = data.exercises || [];
    populateFilters();
  } catch (e) {
    console.warn('Could not load exercises.json:', e);
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
  const muscles = new Set();
  const equips  = new Set();
  allExercises.forEach(e => {
    (e.primaryMuscles || []).forEach(m => muscles.add(m));
    if (e.equipment) equips.add(e.equipment);
  });

  [...muscles].sort().forEach(m => {
    const opt = document.createElement('option');
    opt.value = m; opt.textContent = capitalize(m);
    filterMuscle.appendChild(opt);
  });

  [...equips].sort().forEach(eq => {
    const opt = document.createElement('option');
    opt.value = eq; opt.textContent = capitalize(eq);
    filterEquip.appendChild(opt);
  });
}

// ── Exercise list render ──────────────────────────────────────────────────
function renderExerciseList() {
  const items = plan.exercises;
  exerciseCount.textContent = items.length;
  exerciseListEl.innerHTML = '';

  if (items.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty-state';
    li.textContent = 'No exercises added yet';
    exerciseListEl.appendChild(li);
    return;
  }

  items.forEach((ex, i) => {
    const li = document.createElement('li');
    li.className = 'exercise-item';
    li.dataset.index = i;
    li.innerHTML = `
      <div class="exercise-index">${i + 1}</div>
      <div class="exercise-info">
        <div class="exercise-name">${ex.name}</div>
        <div class="exercise-params">${ex.sets} sets · ${ex.reps} reps · ${ex.rest}s rest</div>
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
    $('outputSection').style.display = 'none';
    return;
  }

  $('btnGenerateConfig').style.display = '';
  listEl.innerHTML = '';
  savedPlans.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'plan-card';
    card.innerHTML = `
      <div class="plan-card-info">
        <div class="plan-card-name">${p.planName}</div>
        <div class="plan-card-meta">${p.exercises.length} exercise${p.exercises.length !== 1 ? 's' : ''}</div>
      </div>
      <button class="btn-remove-plan" data-index="${i}" title="Remove plan">✕</button>
    `;
    card.querySelector('.btn-remove-plan').addEventListener('click', () => {
      savedPlans.splice(i, 1);
      renderPlanList();
      $('outputSection').style.display = 'none';
    });
    listEl.appendChild(card);
  });
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
  switchTab('list');
  runSearch();
  modalOverlay.classList.add('open');
  setTimeout(() => searchInput.focus(), 300);
}

function closeAddModal() {
  modalOverlay.classList.remove('open');
}

function confirmAdd() {
  if (!pendingExercise) return;
  plan.exercises.push({
    name: pendingExercise,
    sets: parseInt($('paramSets').value) || 3,
    reps: parseInt($('paramReps').value) || 10,
    rest: parseInt($('paramRest').value) || 60,
  });
  renderExerciseList();
  closeAddModal();
}

function addCustom() {
  const name = $('customName').value.trim();
  if (!name) return;
  selectExercise(name);
  switchTab('list');
}

// ── Edit flow ─────────────────────────────────────────────────────────────
function openEditModal(index) {
  editingIndex = index;
  const ex = plan.exercises[index];
  $('editName').textContent = ex.name;
  $('editSets').value = ex.sets;
  $('editReps').value = ex.reps;
  $('editRest').value = ex.rest;
  editOverlay.classList.add('open');
}

function closeEditModal() {
  editOverlay.classList.remove('open');
  editingIndex = null;
}

function confirmEdit() {
  if (editingIndex === null) return;
  plan.exercises[editingIndex] = {
    name: plan.exercises[editingIndex].name,
    sets: parseInt($('editSets').value) || 3,
    reps: parseInt($('editReps').value) || 10,
    rest: parseInt($('editRest').value) || 60,
  };
  renderExerciseList();
  closeEditModal();
}

function deleteExercise() {
  if (editingIndex === null) return;
  plan.exercises.splice(editingIndex, 1);
  renderExerciseList();
  closeEditModal();
}

// ── Add plan to list ───────────────────────────────────────────────────────
function addPlanToList() {
  const name = planNameEl.value.trim() || 'My Plan';
  if (!plan.exercises.length) {
    showToast('Add at least one exercise first.');
    return;
  }
  savedPlans.push({ planName: name, exercises: [...plan.exercises] });

  // Reset builder for next plan
  plan = { planName: '', exercises: [] };
  planNameEl.value = '';
  renderExerciseList();

  renderPlanList();
  showToast(`"${name}" added to list ✓`);
  $('planListSection').scrollIntoView({ behavior: 'smooth' });
}

// ── Generate config string ─────────────────────────────────────────────────
function generateConfigString() {
  if (!savedPlans.length) {
    showToast('Add at least one plan first.');
    return;
  }
  const str = serializeAll(savedPlans);

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
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-content').forEach(c => {
    c.classList.toggle('hidden', c.id !== 'tab' + capitalize(tabId));
  });
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
  $('btnCopy').addEventListener('click', () => {
    const val = $('planOutput').value;
    if (!val) return;
    navigator.clipboard.writeText(val).then(() => showToast('Copied ✓')).catch(() => {
      $('planOutput').select();
      document.execCommand('copy');
      showToast('Copied ✓');
    });
  });

  $('btnCloseEdit').addEventListener('click', closeEditModal);
  $('btnConfirmEdit').addEventListener('click', confirmEdit);
  $('btnDeleteExercise').addEventListener('click', deleteExercise);

  searchInput.addEventListener('input', runSearch);
  filterMuscle.addEventListener('change', runSearch);
  filterEquip.addEventListener('change', runSearch);

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeAddModal();
  });
  editOverlay.addEventListener('click', e => {
    if (e.target === editOverlay) closeEditModal();
  });
}

// ── Visual viewport: push page up when keyboard appears ───────────────────
// Fallback for browsers that don't support interactive-widget=resizes-content
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const offset = window.innerHeight - window.visualViewport.height;
    document.body.style.marginBottom = offset > 0 ? offset + 'px' : '';
    if (offset > 50) {
      // Scroll focused element into view after a short delay
      const el = document.activeElement;
      if (el && el !== document.body) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      }
    }
  });
}

// ── Start ─────────────────────────────────────────────────────────────────
init();
