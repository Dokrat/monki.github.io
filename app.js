'use strict';

// ── Garmin Connect SDK bridge ──────────────────────────────────────────────
// Property key used on the watch side (properties.xml).
const PROP_KEY = 'planConfig';

// Pipe-delimited format: "Plan Name|Ex Name,sets,reps,rest|..."
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

// In production Garmin injects window.garmin.settings.
// In browser dev mode we use localStorage as a mock.
const GarminSDK = (() => {
  if (window.garmin && window.garmin.settings) {
    return {
      getSettings: (cb) => window.garmin.settings.getSettings(settings => {
        cb(deserializePlan(settings[PROP_KEY]));
      }),
      setSettings: (data, cb) => {
        const payload = {};
        payload[PROP_KEY] = serializePlan(data);
        window.garmin.settings.setSettings(payload, cb);
      },
    };
  }
  // Dev mock via localStorage
  return {
    getSettings: (cb) => {
      const raw = localStorage.getItem('gymtimerPlanConfig');
      cb(deserializePlan(raw));
    },
    setSettings: (data, cb) => {
      localStorage.setItem('gymtimerPlanConfig', serializePlan(data));
      if (cb) cb();
    },
  };
})();

// ── State ─────────────────────────────────────────────────────────────────
let allExercises = [];   // full library from exercises.json
let plan = {             // current plan being edited
  planName: '',
  exercises: [],         // { name, sets, reps, rest }
};
let pendingExercise = null;  // exercise selected in modal, waiting for params
let editingIndex = null;     // index of exercise being edited

// ── DOM refs ──────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const planNameEl     = $('planName');
const exerciseListEl = $('exerciseList');
const exerciseCount  = $('exerciseCount');
const emptyState     = $('emptyState');

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
  loadSavedPlan();
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

function loadSavedPlan() {
  GarminSDK.getSettings(saved => {
    if (saved && saved.planName !== undefined) {
      plan = saved;
    }
    planNameEl.value = plan.planName || '';
    renderExerciseList();
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

  // clear
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

// ── Search ────────────────────────────────────────────────────────────────
function runSearch() {
  const query  = searchInput.value.trim().toLowerCase();
  const muscle = filterMuscle.value;
  const equip  = filterEquip.value;

  let results = allExercises;

  if (query) {
    results = results.filter(e => e.name.toLowerCase().includes(query));
  }
  if (muscle) {
    results = results.filter(e => (e.primaryMuscles || []).includes(muscle));
  }
  if (equip) {
    results = results.filter(e => e.equipment === equip);
  }

  // limit display for performance
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

  // highlight selected
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
  switchTab('list');  // switch to show params panel in same modal
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

// ── Generate ──────────────────────────────────────────────────────────────
function savePlan() {
  plan.planName = planNameEl.value.trim() || 'My Plan';

  if (!plan.exercises.length) {
    showToast('Add at least one exercise first.');
    return;
  }

  const str = serializePlan(plan);

  // Show output section and fill textarea
  const section = document.getElementById('outputSection');
  const output  = $('planOutput');
  section.style.display = '';
  output.value = str;
  output.select();
  section.scrollIntoView({ behavior: 'smooth' });

  // Also persist via SDK as before
  GarminSDK.setSettings(plan, () => {
    showToast('Plan generated ✓');
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
  $('btnSave').addEventListener('click', savePlan);
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

  // close modals on overlay click
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeAddModal();
  });
  editOverlay.addEventListener('click', e => {
    if (e.target === editOverlay) closeEditModal();
  });
}

// ── Start ─────────────────────────────────────────────────────────────────
init();
