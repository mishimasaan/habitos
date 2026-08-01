import { fromDateKey, toDateKey } from '../utils.js';
export function hasEntry(day = {}) { return Object.values(day).some(value => value !== false && value !== 0 && value !== ''); }
export function calculateCurrentStreak(days) {
  let streak = 0; const cursor = new Date();
  while (hasEntry(days[toDateKey(cursor)])) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}
export function calculateBestStreak(days) {
  const keys = Object.keys(days).sort(); let best = 0, current = 0, previous = null;
  for (const key of keys) {
    if (!hasEntry(days[key])) { current = 0; previous = null; continue; }
    const date = fromDateKey(key);
    if (previous) {
      const diff = Math.round((date - previous) / 86400000);
      current = diff === 1 ? current + 1 : 1;
    } else current = 1;
    best = Math.max(best, current); previous = date;
  }
  return best;
}
export function monthRange(year, month) {
  return { start: new Date(year, month, 1), end: new Date(year, month + 1, 0) };
}
