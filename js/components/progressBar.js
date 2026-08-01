import { clamp } from '../utils.js';
export function ProgressBar(value, max, className = '') {
  const percent = max ? clamp((Number(value) / Number(max)) * 100, 0, 100) : 0;
  return `<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${value}"><div class="progress__bar ${className}" style="width:${percent}%"></div></div>`;
}
