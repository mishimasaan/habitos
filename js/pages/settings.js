import { getState, patchSettings, resetState } from '../storage.js';
import { BottomNavigation } from '../components/bottomNavigation.js';
import { setTheme } from '../theme.js';
import { exportBackup, importBackupFile } from '../backup.js';
import { confirmDialog } from '../components/dialog.js';
import { showToast } from '../components/toast.js';

const goalRows = [
  ['water', '💧', 'Meta de água', 'ml'],
  ['protein', '🥩', 'Meta de proteína', 'g'],
  ['fibras', '🍚', 'Meta de fibras', 'g'],
  ['fats', '🥑', 'Meta de gorduras', 'g'],
  ['calories', '🔥', 'Meta de calorias', 'kcal'],
  ['study', '📚', 'Meta de estudo', 'min']
];

export function renderSettings() {
  const state = getState();
  const { goals } = state.settings;

  return `
    <main class="page">
      <header class="page-header"><h1>Configurações</h1></header>

      <h2 class="settings-section-title">Metas diárias</h2>
      <section class="card list-card">
        ${goalRows.map(([key, icon, label, unit]) => `
          <label class="list-row">
            <div class="list-row__left"><span>${icon}</span><strong>${label}</strong></div>
            <span><input class="settings-input" data-goal="${key}" type="number" min="0" value="${goals[key]}"> ${unit}</span>
          </label>
        `).join('')}
      </section>

      <h2 class="settings-section-title">Preferências</h2>
      <section class="card list-card">
        <label class="list-row">
          <strong>Tema</strong>
          <select class="settings-input" data-setting="theme">
            <option value="light" ${state.settings.theme === 'light' ? 'selected' : ''}>Claro</option>
            <option value="dark" ${state.settings.theme === 'dark' ? 'selected' : ''}>Escuro</option>
            <option value="system" ${state.settings.theme === 'system' ? 'selected' : ''}>Sistema</option>
          </select>
        </label>
      </section>

      <h2 class="settings-section-title">Backup</h2>
      <div class="backup-actions">
        <button class="btn btn-soft btn-block" data-export>▣ Exportar backup</button>
        <label class="btn btn-soft btn-block">▱ Importar backup<input class="sr-only" type="file" accept="application/json" data-import></label>
      </div>

      <h2 class="settings-section-title">Dados</h2>
      <button class="btn btn-danger btn-block" data-reset>Apagar todos os dados</button>

      ${BottomNavigation('settings')}
    </main>
  `;
}

export function mountSettings(root) {
  root.querySelectorAll('[data-goal]').forEach(input => {
    input.addEventListener('change', () => {
      const state = getState();
      patchSettings({
        goals: {
          ...state.settings.goals,
          [input.dataset.goal]: Number(input.value) || 0
        }
      });
      showToast('Meta atualizada');
    });
  });

  root.querySelector('[data-setting="theme"]')?.addEventListener('change', event => {
    patchSettings({ theme: event.target.value });
    setTheme(event.target.value);
    showToast('Preferência atualizada');
  });

  root.querySelector('[data-export]')?.addEventListener('click', exportBackup);

  root.querySelector('[data-import]')?.addEventListener('change', async event => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      await importBackupFile(file);
      showToast('Backup importado');
      document.dispatchEvent(new CustomEvent('app:rerender'));
    } catch (error) {
      showToast(error.message);
    } finally {
      event.target.value = '';
    }
  });

  root.querySelector('[data-reset]')?.addEventListener('click', async () => {
    const confirmed = await confirmDialog({
      title: 'Apagar todos os dados',
      message: 'Todos os registros salvos serão apagados. Essa ação não pode ser desfeita.',
      confirmText: 'Apagar',
      danger: true
    });

    if (!confirmed) return;
    resetState();
    showToast('Todos os dados foram apagados');
    document.dispatchEvent(new CustomEvent('app:rerender'));
  });
}
