const items = [
  ['home', 'home.svg', 'Hoje'],
  ['calendar', 'calendar.svg', 'Calendário'],
  ['statistics', 'stats.svg', 'Estatísticas'],
  ['settings', 'config.svg', 'Configurações']
];

export function BottomNavigation(active) {
  return `
    <nav class="bottom-nav">
      ${items.map(([route, icon, label]) => `
        <a
          href="#/${route}"
          class="bottom-nav__item ${active === route ? 'is-active' : ''}"
        >
          <img
            src="assets/icons/${icon}"
            class="bottom-nav__icon"
            alt=""
            aria-hidden="true"
          >

          <span>${label}</span>
        </a>
      `).join('')}
    </nav>
  `;
}