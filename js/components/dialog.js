import { openModal, closeModal } from './modal.js';
export function confirmDialog({ title = 'Confirmar', message = '', confirmText = 'Confirmar', danger = false } = {}) {
  return new Promise(resolve => {
    const modal = openModal({ title, content: `<p class="muted">${message}</p><div class="row" style="gap:8px;margin-top:18px"><button class="btn btn-ghost" data-dialog="cancel" style="flex:1">Cancelar</button><button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-dialog="confirm" style="flex:1">${confirmText}</button></div>` });
    modal.addEventListener('click', event => {
      const action = event.target.closest('[data-dialog]')?.dataset.dialog;
      if (!action) return;
      closeModal(); resolve(action === 'confirm');
    });
  });
}
