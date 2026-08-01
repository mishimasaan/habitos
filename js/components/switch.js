export function Switch({ name, checked = false, label = '' }) {
  return `<button class="switch ${checked ? 'is-on' : ''}" role="switch" aria-checked="${checked}" aria-label="${label}" data-switch="${name}"></button>`;
}
