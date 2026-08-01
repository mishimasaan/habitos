export function Navbar({ title = '', subtitle = '', action = '' } = {}) {
  return `<header class="page-header"><div><h1>${title}</h1>${subtitle ? `<p class="page-header__eyebrow">${subtitle}</p>` : ''}</div>${action}</header>`;
}
