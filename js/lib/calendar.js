import { toDateKey } from '../utils.js';
export function buildMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const mondayOffset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - mondayOffset);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start); date.setDate(start.getDate() + index);
    return { date, key: toDateKey(date), day: date.getDate(), currentMonth: date.getMonth() === month };
  });
}
