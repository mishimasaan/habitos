import { getState } from '../storage.js';
import { BottomNavigation } from '../components/bottomNavigation.js';
import { ChartCard } from '../components/chartCard.js';
import { StatCard } from '../components/statCard.js';
import { sparkline } from '../lib/charts.js';
import { average, formatNumber, sum } from '../utils.js';
import { getAchievementContext } from '../achievements.js';

export function renderStatistics() {
  const state = getState();
  const days = Object.entries(state.days).sort().slice(-14).map(([, day]) => day);
  const context = getAchievementContext();

  const water = days.map(day => day.water || 0);
  const protein = days.map(day => day.protein || 0);
  const fibras = days.map(day => day.fibras || 0);
  const calories = days.map(day => day.calories || 0);
  const study = days.map(day => day.study || 0);

  const cards = [
    { title: 'Água', meta: `Média: ${(average(water) / 1000).toFixed(2)} L`, values: water, color: '#3f8efc' },
    { title: 'Proteína', meta: `Média: ${formatNumber(average(protein))} g`, values: protein, color: '#35b76f' },
    { title: 'Fibras', meta: `Média: ${formatNumber(average(fibras))} g`, values: fibras, color: '#d9a62e' },
    { title: 'Calorias', meta: `Média: ${formatNumber(average(calories))} kcal`, values: calories, color: '#fb7a28' },
    { title: 'Estudo', meta: `Total: ${Math.floor(sum(study) / 60)}h ${sum(study) % 60}min`, values: study, color: '#d946ef' }
  ];

  return `
    <main class="page">
      <header class="page-header">
        <h1>Estatísticas</h1>
        <a href="#/achievements" class="btn btn-ghost">Conquistas</a>
      </header>
      ${cards.map(card => ChartCard({
        title: card.title,
        meta: card.meta,
        chart: sparkline(card.values),
        accent: card.color
      })).join('')}
      <div class="stat-grid">
        ${StatCard('Treinos', context.trainingCount)}
        ${StatCard('Cardios', Object.values(state.days).filter(day => day.cardio).length)}
        ${StatCard('Dias registrados', context.registeredDays)}
        ${StatCard('Sequência atual', `🔥 ${context.currentStreak} dias`)}
      </div>
      ${BottomNavigation('statistics')}
    </main>
  `;
}

export function mountStatistics() {}
