export const APP_NAME = 'Hábitos';
export const STORAGE_KEY = 'habitos-app-state-v1';
export const SCHEMA_VERSION = 2;

export const METRICS = [
  { key: 'water', label: 'Água', icon: '💧', unit: 'ml', goalKey: 'water' },
  { key: 'protein', label: 'Proteína', icon: '🥩', unit: 'g', goalKey: 'protein' },
  { key: 'fibras', label: 'Fibras', icon: '🍚', unit: 'g', goalKey: 'fibras' },
  { key: 'fats', label: 'Gorduras', icon: '🥑', unit: 'g', goalKey: 'fats' },
  { key: 'calories', label: 'Calorias', icon: '🔥', unit: 'kcal', goalKey: 'calories' }
];

export const HABITS = [
  { key: 'training', label: 'Treino', icon: '🏋️' },
  { key: 'cardio', label: 'Cardio', icon: '🏃' }
];

export const WEEKDAYS_SHORT = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
export const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
