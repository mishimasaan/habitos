export function CalendarCell({ dateKey, day, currentMonth, selected, status }) {
  const statusClass = status ? `status-dot--${status}` : '';
  return `<button class="calendar-cell ${currentMonth ? '' : 'is-muted'} ${selected ? 'is-selected' : ''}" data-date="${dateKey}" aria-label="Dia ${day}">${day}${status ? `<span class="calendar-cell__dot status-dot ${statusClass}"></span>` : ''}</button>`;
}
