export function openBottomSheet(content) {
  document.querySelector('#active-sheet')?.remove();
  const wrapper = document.createElement('div');
  wrapper.className = 'modal-backdrop bottom-sheet-backdrop';
  wrapper.id = 'active-sheet';
  wrapper.innerHTML = `<section class="bottom-sheet"><div class="bottom-sheet__handle"></div>${content}</section>`;
  document.querySelector('#portal').append(wrapper);
  wrapper.addEventListener('click', event => { if (event.target === wrapper || event.target.closest('[data-close-sheet]')) wrapper.remove(); });
  return wrapper;
}
