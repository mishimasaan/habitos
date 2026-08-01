export function ChartCard({ title, meta, chart, accent = 'var(--primary)' }) {
  return `<section class="card chart-card"><div class="chart-card__header"><div><h3>${title}</h3><p class="chart-card__meta">${meta}</p></div></div>${chart.replace('currentColor', accent)}</section>`;
}
