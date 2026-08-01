export function AchievementCard(item) {
  return `<article class="card achievement-card ${item.unlocked ? '' : 'is-locked'}"><div class="achievement-card__icon">${item.unlocked ? item.icon : '🔒'}</div><div><h3>${item.title}</h3><p class="muted" style="font-size:.8rem;margin-top:3px">${item.description}</p></div></article>`;
}
