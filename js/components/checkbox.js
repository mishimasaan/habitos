export function Checkbox({ name, checked = false, label = '' }) {
  return `<label class="row" style="gap:8px"><input type="checkbox" name="${name}" ${checked ? 'checked' : ''}><span>${label}</span></label>`;
}
