export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
export const sum = values => values.reduce((total, value) => total + Number(value || 0), 0);
export const average = values => values.length ? sum(values) / values.length : 0;
export const pad = value => String(value).padStart(2, '0');

export function toDateKey(date = new Date()) {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromDateKey(key) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateLong(key) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long' }).format(fromDateKey(key));
}

export function formatWeekday(key) {
  const text = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(fromDateKey(key));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatNumber(value, digits = 0) {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(Number(value || 0));
}

export function formatMinutes(minutes = 0) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}h ${pad(rest)}min`;
}

export function uid(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[char]));
}

export function downloadFile(filename, content, type = 'application/json') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function debounce(callback, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}
