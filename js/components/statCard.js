export function StatCard(label, value, hint = '') {
  return `<article class="card stat-card"><div class="stat-card__label">${label}</div><div class="stat-card__value">${value}</div>${hint ? `<small class="muted">${hint}</small>` : ''}</article>`;
}
