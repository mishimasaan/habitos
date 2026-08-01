import { startRouter } from './router.js';
import { applyTheme } from './theme.js';
import { renderHome, mountHome } from './pages/home.js';
import { renderCalendar, mountCalendar } from './pages/calendar.js';
import { renderStatistics, mountStatistics } from './pages/statistics.js';
import { renderSettings, mountSettings } from './pages/settings.js';
import { renderDay, mountDay } from './pages/day.js';
import { renderAchievements, mountAchievements } from './pages/achievements.js';
import { renderBackup, mountBackup } from './pages/backup.js';

const app = document.querySelector('#app');
const pages = {
  home: [renderHome, mountHome], calendar: [renderCalendar, mountCalendar],
  statistics: [renderStatistics, mountStatistics], settings: [renderSettings, mountSettings],
  day: [renderDay, mountDay], achievements: [renderAchievements, mountAchievements], backup: [renderBackup, mountBackup]
};
let currentRoute;

function render(route = currentRoute || { name:'home', parts:[] }) {
  currentRoute = route;
  const [view, mount] = pages[route.name] || pages.home;
  app.innerHTML = view(route);
  mount?.(app, route);
  window.scrollTo({ top:0, behavior:'instant' });
}

applyTheme();
startRouter(render);
document.addEventListener('app:rerender', () => render());

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(error => console.warn('Service Worker indisponível:', error)));
}
