export function EmptyState({ title = 'Nada por aqui', text = 'Os dados aparecerão quando você começar a registrar.', image = './assets/images/empty/empty-calendar.svg' } = {}) {
  return `<div class="card card--pad" style="text-align:center"><img src="${image}" alt="" style="width:170px;margin:0 auto 12px"><h2>${title}</h2><p class="muted" style="margin-top:6px">${text}</p></div>`;
}
