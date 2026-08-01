export function openModal({ title = '', content = '', actions = '' } = {}) {
  closeModal();
  const wrapper = document.createElement('div');
  wrapper.className = 'modal-backdrop';
  wrapper.id = 'active-modal';
  wrapper.innerHTML = `<section class="modal" role="dialog" aria-modal="true"><header class="modal__header"><h2>${title}</h2><button class="icon-button" data-close-modal aria-label="Fechar">✕</button></header><div class="modal__body">${content}${actions}</div></section>`;
  document.querySelector('#portal').append(wrapper);
  document.body.classList.add('is-modal-open');
  wrapper.addEventListener('click', event => { if (event.target === wrapper || event.target.closest('[data-close-modal]')) closeModal(); });
  return wrapper;
}
export function closeModal() { document.querySelector('#active-modal')?.remove(); document.body.classList.remove('is-modal-open'); }
