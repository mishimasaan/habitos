let timer;
export function showToast(message, duration = 2200) {
  clearTimeout(timer); document.querySelector('.toast')?.remove();
  const toast = document.createElement('div'); toast.className = 'toast'; toast.textContent = message;
  document.querySelector('#portal').append(toast);
  timer = setTimeout(() => toast.remove(), duration);
}
