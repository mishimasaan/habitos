import { clamp } from '../utils.js';
export function CircularProgress(value, max, label = '') {
  const percent = max ? clamp(value / max * 100, 0, 100) : 0;
  return `<div class="achievement-ring" style="--progress:${percent}%"><div class="achievement-ring__content"><div class="achievement-ring__number">${value}</div><div class="muted">${label}</div></div></div>`;
}
