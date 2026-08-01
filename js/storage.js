import { STORAGE_KEY, SCHEMA_VERSION } from './constants.js';

const listeners = new Set();

const DEFAULT_GOALS = {
  water: 3200,
  protein: 120,
  fibras: 30,
  fats: 70,
  calories: 2700,
  study: 120
};

export function createDefaultState() {
  const now = new Date().toISOString();

  return {
    version: SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    settings: {
      goals: { ...DEFAULT_GOALS },
      theme: 'light'
    },
    days: {}
  };
}

function normalizeDay(day = {}) {
  return {
    water: Number(day.water) || 0,
    protein: Number(day.protein) || 0,
    fibras: Number(day.fibras ?? day.carbs) || 0,
    fats: Number(day.fats) || 0,
    calories: Number(day.calories) || 0,
    study: Number(day.study) || 0,
    training: Boolean(day.training),
    cardio: Boolean(day.cardio),
    notes: typeof day.notes === 'string' ? day.notes : ''
  };
}

function normalizeState(value) {
  const defaults = createDefaultState();
  const source = value && typeof value === 'object' ? value : {};
  const settings = source.settings && typeof source.settings === 'object' ? source.settings : {};
  const sourceGoals = settings.goals && typeof settings.goals === 'object' ? settings.goals : {};
  const sourceDays = source.days && typeof source.days === 'object' ? source.days : {};

  return {
    version: SCHEMA_VERSION,
    createdAt: source.createdAt || defaults.createdAt,
    updatedAt: source.updatedAt || defaults.updatedAt,
    settings: {
      goals: {
        water: Number(sourceGoals.water) || DEFAULT_GOALS.water,
        protein: Number(sourceGoals.protein) || DEFAULT_GOALS.protein,
        fibras: Number(sourceGoals.fibras ?? sourceGoals.carbs) || DEFAULT_GOALS.fibras,
        fats: Number(sourceGoals.fats) || DEFAULT_GOALS.fats,
        calories: Number(sourceGoals.calories) || DEFAULT_GOALS.calories,
        study: Number(sourceGoals.study) || DEFAULT_GOALS.study
      },
      theme: ['light', 'dark', 'system'].includes(settings.theme) ? settings.theme : 'light'
    },
    days: Object.fromEntries(
      Object.entries(sourceDays).map(([dateKey, day]) => [dateKey, normalizeDay(day)])
    )
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    console.warn('Não foi possível carregar os dados. Um novo estado foi criado.', error);
    return createDefaultState();
  }
}

let state = loadState();

export function getState() {
  return structuredClone(state);
}

export function setState(nextState) {
  state = normalizeState({
    ...nextState,
    updatedAt: new Date().toISOString()
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  listeners.forEach(listener => listener(getState()));
}

export function updateState(updater) {
  const draft = getState();
  const next = updater(draft) || draft;
  setState(next);
}

export function getDay(dateKey) {
  return normalizeDay(state.days[dateKey]);
}

export function patchDay(dateKey, patch) {
  updateState(draft => {
    draft.days[dateKey] = normalizeDay({
      ...draft.days[dateKey],
      ...patch
    });
    return draft;
  });
}

export function patchSettings(patch) {
  updateState(draft => {
    draft.settings = {
      ...draft.settings,
      ...patch
    };
    return draft;
  });
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  state = createDefaultState();
  listeners.forEach(listener => listener(getState()));
}
