import { BackHeader } from '../components/header.js';
import { exportBackup, importBackupFile } from '../backup.js';
import { showToast } from '../components/toast.js';
export function renderBackup() {
  return `<main class="page no-nav">${BackHeader('Backup e restauração')}<section class="card card--pad stack-12"><h2>Exportar</h2><p class="muted">Crie um arquivo JSON com configurações, metas e registros.</p><button class="btn btn-primary btn-block" data-export-backup>Exportar agora</button></section><section class="backup-drop section"><h2>Restaurar backup</h2><p class="muted">Selecione um arquivo JSON exportado pelo aplicativo.</p><input type="file" accept="application/json" data-import-backup></section><section class="card backup-note section">A restauração substitui os dados locais atuais. Guarde uma cópia antes de importar outro arquivo.</section></main>`;
}
export function mountBackup(root) {
  root.querySelector('[data-export-backup]')?.addEventListener('click', exportBackup);
  root.querySelector('[data-import-backup]')?.addEventListener('change', async event => { try { await importBackupFile(event.target.files[0]); showToast('Backup restaurado'); document.dispatchEvent(new CustomEvent('app:rerender')); } catch(error) { showToast(error.message); } });
}
