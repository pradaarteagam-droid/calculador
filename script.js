const display = document.querySelector('#display');
let expression = '';
function render(){ display.textContent = expression || '0'; }
document.querySelector('.keys').addEventListener('click', (event) => {
  const button = event.target.closest('button'); if (!button) return;
  const { action, value } = button.dataset;
  if (action === 'clear') expression = '';
  else if (action === 'delete') expression = expression.slice(0, -1);
  else if (action === 'equals') {
    if (!expression || !/^[\d+*/.()\s-]+$/.test(expression)) return;
    try { const result = Function(`"use strict"; return (${expression})`)(); expression = Number.isFinite(result) ? String(Number(result.toFixed(8))) : 'Error'; }
    catch { expression = 'Error'; }
  } else if (value) {
    if (expression === 'Error') expression = '';
    expression += value;
  }
  render();
});
