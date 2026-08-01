import { getState, getDay } from '../storage.js';
import { buildMonthMatrix } from '../lib/calendar.js';
import { MONTHS, WEEKDAYS_SHORT } from '../constants.js';
import { CalendarCell } from '../components/calendarCell.js';
import { BottomNavigation } from '../components/bottomNavigation.js';
import { formatMinutes, toDateKey } from '../utils.js';

let cursor = new Date(); let selected = toDateKey();
function statusFor(day, goals) {
  const values = [day.water >= goals.water, day.protein >= goals.protein, day.calories >= goals.calories, day.training];
  const completed = values.filter(Boolean).length;
  return completed >= 3 ? 'success' : completed > 0 ? 'warning' : 'danger';
}
function preview(key, day, goals) {
  const rows = [
    ['💧','Água',`${day.water.toLocaleString('pt-BR')} ml / ${goals.water.toLocaleString('pt-BR')} ml`, day.water >= goals.water],
    ['🥩','Proteína',`${day.protein} g / ${goals.protein} g`, day.protein >= goals.protein],
    ['🔥','Calorias',`${day.calories.toLocaleString('pt-BR')} kcal / ${goals.calories.toLocaleString('pt-BR')} kcal`, day.calories >= goals.calories],
    ['🏋️','Treino',day.training ? 'Sim' : 'Não',day.training], ['🏃','Cardio',day.cardio ? 'Sim' : 'Não',day.cardio], ['📚','Estudo',formatMinutes(day.study),day.study >= goals.study]
  ];
  const date = new Date(`${key}T12:00:00`);
  return `<section class="card list-card day-preview"><a class="list-row" href="#/day/${key}"><h2>${String(date.getDate()).padStart(2,'0')} de ${MONTHS[date.getMonth()]}</h2><span>›</span></a>${rows.map(([icon,label,value,ok]) => `<div class="list-row"><div class="list-row__left"><span>${icon}</span><strong>${label}</strong></div><span class="list-row__value">${value} <span class="text-${ok ? 'success' : 'danger'}">${ok ? '●' : '×'}</span></span></div>`).join('')}</section>`;
}
export function renderCalendar() {
  const state = getState(); const goals = state.settings.goals; const matrix = buildMonthMatrix(cursor.getFullYear(), cursor.getMonth()); const day = getDay(selected);
  return `<main class="page"><header class="page-header"><h1>Calendário</h1></header><section class="card calendar-card"><div class="calendar-toolbar"><button class="icon-button" data-month="-1">‹</button><h2>${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}</h2><button class="icon-button" data-month="1">›</button></div><div class="calendar-week">${WEEKDAYS_SHORT.map(day => `<span>${day}</span>`).join('')}</div><div class="calendar-grid">${matrix.map(cell => CalendarCell({ ...cell, dateKey: cell.key, selected: cell.key === selected, status: state.days[cell.key] ? statusFor(getDay(cell.key), goals) : '' })).join('')}</div><div class="calendar-legend"><span><i class="status-dot status-dot--success"></i>Completo</span><span><i class="status-dot status-dot--warning"></i>Parcial</span><span><i class="status-dot status-dot--danger"></i>Não registrado</span></div></section>${preview(selected, day, goals)}${BottomNavigation('calendar')}</main>`;
}
export function mountCalendar(root) {
  root.querySelectorAll('[data-month]').forEach(button => button.addEventListener('click', () => { cursor = new Date(cursor.getFullYear(), cursor.getMonth() + Number(button.dataset.month), 1); selected = toDateKey(new Date(cursor.getFullYear(), cursor.getMonth(), 1)); document.dispatchEvent(new CustomEvent('app:rerender')); }));
  root.querySelectorAll('[data-date]').forEach(button => button.addEventListener('click', () => { selected = button.dataset.date; const date = new Date(`${selected}T12:00:00`); cursor = new Date(date.getFullYear(), date.getMonth(), 1); document.dispatchEvent(new CustomEvent('app:rerender')); }));
}
