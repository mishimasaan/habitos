import { clamp } from '../utils.js';
export function sparkline(values, { width = 360, height = 70 } = {}) {
  const nums = values.map(Number); const min = Math.min(...nums); const max = Math.max(...nums); const range = max - min || 1;
  const points = nums.map((value, index) => {
    const x = nums.length === 1 ? width / 2 : index / (nums.length - 1) * width;
    const y = height - ((value - min) / range * (height - 14) + 7);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true"><polyline points="${points}" stroke="currentColor" fill="none" stroke-width="2.2" vector-effect="non-scaling-stroke"/></svg>`;
}
export function barChart(values, goal, { width = 360, height = 180 } = {}) {
  const max = Math.max(goal, ...values, 1); const gap = 4; const barWidth = width / values.length - gap;
  const bars = values.map((value, index) => {
    const barHeight = clamp(value / max * (height - 25), 2, height - 25);
    return `<rect x="${(index * (barWidth + gap)).toFixed(1)}" y="${(height - barHeight).toFixed(1)}" width="${barWidth.toFixed(1)}" height="${barHeight.toFixed(1)}" rx="2" fill="currentColor" opacity=".9"/>`;
  }).join('');
  const goalY = height - (goal / max * (height - 25));
  return `<svg viewBox="0 0 ${width} ${height}" class="sparkline" style="height:200px;color:var(--blue)" preserveAspectRatio="none"><line x1="0" x2="${width}" y1="${goalY}" y2="${goalY}" stroke="var(--text-muted)" stroke-dasharray="5 4" opacity=".6"/>${bars}</svg>`;
}
