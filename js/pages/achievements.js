import { getAchievements, getAchievementContext } from '../achievements.js';
import { BackHeader } from '../components/header.js';
import { CircularProgress } from '../components/circularProgress.js';
import { AchievementCard } from '../components/achievementCard.js';
export function renderAchievements() {
  const context = getAchievementContext(); const achievements = getAchievements();
  return `<main class="page no-nav">${BackHeader('Conquistas')}<section class="card achievement-hero"><h2>Sequência atual</h2>${CircularProgress(context.currentStreak, Math.max(context.bestStreak, 7), 'dias')}<p class="muted">Melhor sequência: <strong>${context.bestStreak} dias</strong></p></section><section class="section stack-12"><h2>Conquistas</h2>${achievements.map(AchievementCard).join('')}</section></main>`;
}
export function mountAchievements() {}
