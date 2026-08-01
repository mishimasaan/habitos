import { getDay, patchDay } from '../storage.js';
import { BackHeader } from '../components/header.js';
import { formatDateLong, formatWeekday, escapeHTML, toDateKey } from '../utils.js';
import { showToast } from '../components/toast.js';

const numeric = [
  ['water', '💧', 'Água', 'ml', 1],
  ['protein', '🥩', 'Proteína', 'g', 1],
  ['fibras', '🍚', 'Fibras', 'g', 1],
  ['fats', '🥑', 'Gorduras', 'g', 1],
  ['calories', '🔥', 'Calorias', 'kcal', 1],
  ['study', '📚', 'Estudo', 'min', 1]
];

export function renderDay(route) {
  const key = route.parts[0] || toDateKey();
  const day = getDay(key);

  return `
    <main class="page no-nav day-page">
      ${BackHeader(formatDateLong(key), formatWeekday(key))}

      <form class="card list-card" data-day-form>
        ${numeric.map(([name, icon, label, unit, step]) => `
          <label class="list-row">
            <div class="list-row__left">
              <span>${icon}</span>
              <strong>${label}</strong>
            </div>
            <span class="day-edit-grid">
              <input class="day-number" type="number" name="${name}" value="${day[name]}" min="0" step="${step}">
              <small class="muted">${unit}</small>
            </span>
          </label>
        `).join('')}

        ${['training', 'cardio'].map(name => `
          <div class="list-row">
            <div class="list-row__left">
              <span>${name === 'training' ? '🏋️' : '🏃'}</span>
              <strong>${name === 'training' ? 'Treino' : 'Cardio'}</strong>
            </div>
            <div class="binary-control">
              <button type="button" data-toggle="${name}:false" class="${!day[name] ? 'is-active' : ''}">Não</button>
              <button type="button" data-toggle="${name}:true" class="${day[name] ? 'is-active' : ''}">Sim</button>
            </div>
          </div>
        `).join('')}

        <label class="list-row" style="display:block">
          <div class="list-row__left" style="margin-bottom:8px">
            <span>📝</span><strong>Observações</strong>
          </div>
          <textarea class="input" name="notes">${escapeHTML(day.notes)}</textarea>
        </label>
      </form>

      <button class="btn btn-primary btn-block" style="margin-top:14px" data-save-day>Salvar alterações</button>
    </main>
  `;
}

export function mountDay(root, route) {
  const key = route.parts[0] || toDateKey();
  const current = getDay(key);
  const toggles = { training: current.training, cardio: current.cardio };

  root.querySelectorAll('[data-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const [name, raw] = button.dataset.toggle.split(':');
      toggles[name] = raw === 'true';
      root.querySelectorAll(`[data-toggle^="${name}:"]`).forEach(item => {
        item.classList.toggle('is-active', item === button);
      });
    });
  });

  root.querySelector('[data-save-day]')?.addEventListener('click', () => {
    const form = new FormData(root.querySelector('[data-day-form]'));
    const patch = Object.fromEntries(
      numeric.map(([name]) => [name, Number(form.get(name)) || 0])
    );

    patch.notes = form.get('notes') || '';
    patch.training = toggles.training;
    patch.cardio = toggles.cardio;
    patchDay(key, patch);
    showToast('Dia atualizado');
    setTimeout(() => history.back(), 250);
  });
}
