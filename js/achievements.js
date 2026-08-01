import { getState } from './storage.js';
import { calculateCurrentStreak, calculateBestStreak } from './lib/date.js';

const definitions = [
  { id: 'streak-7', icon: '🔥', title: '7 dias seguidos', description: 'Registre pelo menos um hábito por 7 dias.', test: ctx => ctx.bestStreak >= 7 },
  { id: 'training-10', icon: '🏋️', title: '10 treinos', description: 'Complete dez sessões de treino.', test: ctx => ctx.trainingCount >= 10 },
  { id: 'registered-30', icon: '💧', title: '30 dias registrados', description: 'Mantenha trinta dias no diário.', test: ctx => ctx.registeredDays >= 30 },
  { id: 'water-18', icon: '🌊', title: 'Hidratação em dia', description: 'Bata a meta de água em 18 dias.', test: ctx => ctx.waterGoalDays >= 18 },
  { id: 'study-20h', icon: '📚', title: '20 horas de estudo', description: 'Acumule vinte horas de estudo.', test: ctx => ctx.studyMinutes >= 1200 }
];

export function getAchievementContext() {
  const state = getState();
  const entries = Object.entries(state.days);
  return {
    currentStreak: calculateCurrentStreak(state.days),
    bestStreak: calculateBestStreak(state.days),
    registeredDays: entries.filter(([, day]) => Object.values(day).some(Boolean)).length,
    trainingCount: entries.filter(([, day]) => day.training).length,
    waterGoalDays: entries.filter(([, day]) => Number(day.water) >= state.settings.goals.water).length,
    studyMinutes: entries.reduce((total, [, day]) => total + Number(day.study || 0), 0)
  };
}

export function getAchievements() {
  const context = getAchievementContext();
  return definitions.map(item => ({ ...item, unlocked: Boolean(item.test(context)) }));
}
