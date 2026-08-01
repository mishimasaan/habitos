export function FloatingButton({ label = '+', action = 'add' } = {}) { return `<button class="floating-button" data-action="${action}" aria-label="${action}">${label}</button>`; }
