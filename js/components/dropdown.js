export function Dropdown(buttonHTML, items = []) {
  return `<div class="dropdown"><button class="btn btn-ghost" data-dropdown-toggle>${buttonHTML}</button><div class="dropdown-menu hidden" data-dropdown-menu>${items.map(item => `<button data-value="${item.value}">${item.label}</button>`).join('')}</div></div>`;
}
export function bindDropdown(root, onSelect) {
  root.querySelectorAll('[data-dropdown-toggle]').forEach(button => button.addEventListener('click', () => button.parentElement.querySelector('[data-dropdown-menu]').classList.toggle('hidden')));
  root.querySelectorAll('[data-dropdown-menu] button').forEach(button => button.addEventListener('click', () => { onSelect?.(button.dataset.value); button.closest('[data-dropdown-menu]').classList.add('hidden'); }));
}
