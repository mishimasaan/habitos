import { ProgressBar } from './progressBar.js';

function safePercent(value, goal) {
  if (!goal || goal <= 0) return 0;
  return Math.max(0, Math.round((value / goal) * 100));
}

export function EditableMetricRow({ name, icon, label, value, goal, unit }) {
  return `
    <label class="list-row metric-edit-row">
      <div class="list-row__left">
        <span class="list-row__icon">${icon}</span>
        <div class="list-row__content">
          <div class="list-row__title">${label}</div>
          <div class="list-row__subtitle" data-metric-summary="${name}">${value} / ${goal} ${unit}</div>
        </div>
      </div>
      <span class="home-number-wrap">
        <input
          class="home-number-input"
          type="number"
          name="${name}"
          value="${value}"
          min="0"
          step="1"
          inputmode="decimal"
          data-home-number="${name}"
          data-goal="${goal}"
          data-unit="${unit}"
          aria-label="${label}"
        >
        <small>${unit}</small>
      </span>
    </label>
  `;
}

export function WaterCard(value, goal) {
  const percent = safePercent(value, goal);

  return `
    <section class="card home-water">
      <div class="home-water__top">
        <div>
          <h2>💧 Água</h2>
          <div class="home-water__amount">
            <strong data-water-value>${value.toLocaleString('pt-BR')}</strong>
            / ${goal.toLocaleString('pt-BR')} ml
          </div>
        </div>
        <strong data-water-percent>${percent}%</strong>
      </div>
      <div data-water-progress>${ProgressBar(value, goal)}</div>
      <label class="water-input-wrap">
        <span>Quantidade consumida</span>
        <div>
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            name="water"
            value="${value}"
            data-water-input
            data-goal="${goal}"
            aria-label="Água consumida em mililitros"
          >
          <small>ml</small>
        </div>
      </label>
    </section>
  `;
}
