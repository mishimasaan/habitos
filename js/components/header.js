import { formatDateLong, formatWeekday, toDateKey } from '../utils.js';
export function HomeHeader(dateKey = toDateKey()) {
  return `<header class="page-header"><div><h1>Hoje</h1><p class="page-header__eyebrow">${formatWeekday(dateKey)}, ${formatDateLong(dateKey)}</p></div><a href="#/calendar" class="page-header__action" aria-label="Abrir calendário">▣</a></header>`;
}
export function BackHeader(title, subtitle = '') {
  return `<header class="page-header"><a href="javascript:history.back()" class="page-header__action" aria-label="Voltar">‹</a><div class="day-title"><h2>${title}</h2>${subtitle ? `<small>${subtitle}</small>` : ''}</div><span style="width:38px"></span></header>`;
}
