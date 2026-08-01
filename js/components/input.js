export function Input({ label, name, value = '', type = 'text', min = '', max = '', step = '' }) {
  return `<div class="field"><label for="${name}">${label}</label><input class="input" id="${name}" name="${name}" value="${value}" type="${type}" ${min !== '' ? `min="${min}"` : ''} ${max !== '' ? `max="${max}"` : ''} ${step !== '' ? `step="${step}"` : ''}></div>`;
}
