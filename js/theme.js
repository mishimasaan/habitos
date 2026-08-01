import { getState, patchSettings } from './storage.js';

export function applyTheme(theme = getState().settings.theme) {
  const resolved = theme === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  document.documentElement.dataset.theme = resolved;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'dark' ? '#0f1419' : '#7c3aed');
}

export function setTheme(theme) {
  patchSettings({ theme });
  applyTheme(theme);
}

export function cycleTheme() {
  const current = getState().settings.theme;
  setTheme(current === 'light' ? 'dark' : 'light');
}
