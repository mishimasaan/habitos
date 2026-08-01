import { getState, getDay, patchDay } from '../storage.js';
import { toDateKey, escapeHTML } from '../utils.js';
import { HomeHeader } from '../components/header.js';
import { BottomNavigation } from '../components/bottomNavigation.js';
import { WaterCard, EditableMetricRow } from '../components/habitCard.js';
import { showToast } from '../components/toast.js';

const metrics = [
  ['protein', '🥩', 'Proteína', 'g'],
  ['fibras', '🍚', 'Fibras', 'g'],
  ['fats', '🥑', 'Gorduras', 'g'],
  ['calories', '🔥', 'Calorias', 'kcal'],
  ['study', '📚', 'Estudo', 'min']
];

export function renderHome() {
  const state = getState();
  const key = toDateKey();
  const day = getDay(key);
  const goals = state.settings.goals;

  return `
    <main class="page home-page">
      ${HomeHeader(key)}

      <form data-home-form>
        ${WaterCard(day.water, goals.water)}

        <section class="card list-card habits-group">
          ${metrics.map(([name, icon, label, unit]) => EditableMetricRow({
            name,
            icon,
            label,
            value: day[name],
            goal: goals[name],
            unit
          })).join('')}
        </section>

        <section class="card list-card habits-group">
          ${['training', 'cardio'].map(name => `
            <div class="list-row">
              <div class="list-row__left">
                <span class="list-row__icon">${name === 'training' ? '🏋️' : '🏃'}</span>
                <strong>${name === 'training' ? 'Treino' : 'Cardio'}</strong>
              </div>
              <div class="binary-control">
                <button type="button" data-binary="${name}:false" class="${!day[name] ? 'is-active' : ''}">Não</button>
                <button type="button" data-binary="${name}:true" class="${day[name] ? 'is-active' : ''}">Sim</button>
              </div>
            </div>
          `).join('')}
        </section>

        <label class="card habits-group home-notes">
          <span class="home-notes__title">📝 <strong>Observações</strong></span>
          <textarea class="input" name="notes" placeholder="Adicionar observações">${escapeHTML(day.notes)}</textarea>
        </label>

        <button class="btn btn-primary btn-block home-save" type="submit">
          ▣ Salvar diário
        </button>
      </form>

      ${BottomNavigation('home')}
    </main>
  `;
}

function updateMetricSummary(input) {
  const summary = document.querySelector(`[data-metric-summary="${input.dataset.homeNumber}"]`);
  if (!summary) return;
  summary.textContent = `${Number(input.value) || 0} / ${input.dataset.goal} ${input.dataset.unit}`;
}

function updateWaterPreview(input) {
  const value = Math.max(0, Number(input.value) || 0);
  const goal = Number(input.dataset.goal) || 0;
  const percent = goal > 0 ? Math.max(0, Math.round((value / goal) * 100)) : 0;
  const amount = document.querySelector('[data-water-value]');
  const percentLabel = document.querySelector('[data-water-percent]');
  const progress = document.querySelector('[data-water-progress] .progress__bar');

  if (amount) amount.textContent = value.toLocaleString('pt-BR');
  if (percentLabel) percentLabel.textContent = `${percent}%`;
  if (progress) progress.style.width = `${Math.min(percent, 100)}%`;
}

export function mountHome(root) {
  const key = toDateKey();
  const initialDay = getDay(key);
  const toggles = {
    training: initialDay.training,
    cardio: initialDay.cardio
  };

  root.querySelector('[data-water-input]')?.addEventListener('input', event => {
    updateWaterPreview(event.currentTarget);
  });

  root.querySelectorAll('[data-home-number]').forEach(input => {
    input.addEventListener('input', () => updateMetricSummary(input));
  });

  root.querySelectorAll('[data-binary]').forEach(button => {
    button.addEventListener('click', () => {
      const [name, raw] = button.dataset.binary.split(':');
      toggles[name] = raw === 'true';

      root.querySelectorAll(`[data-binary^="${name}:"]`).forEach(item => {
        item.classList.toggle('is-active', item === button);
      });
    });
  });

  root.querySelector('[data-home-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    patchDay(key, {
      water: Number(form.get('water')) || 0,
      protein: Number(form.get('protein')) || 0,
      fibras: Number(form.get('fibras')) || 0,
      fats: Number(form.get('fats')) || 0,
      calories: Number(form.get('calories')) || 0,
      study: Number(form.get('study')) || 0,
      training: toggles.training,
      cardio: toggles.cardio,
      notes: form.get('notes') || ''
    });

    showToast('Diário salvo com sucesso');
  });
}
