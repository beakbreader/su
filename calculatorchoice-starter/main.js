function loadCalculator(calcId) {
  const container = document.getElementById('calculator-container');
  container.innerHTML = 'Loading...';

  fetch(`templates/${calcId}.html`)
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      const script = document.createElement('script');
      script.src = `calculator-scripts/${calcId}.js`;
      script.defer = true;
      document.body.appendChild(script);
    })
    .catch(err => {
      container.innerHTML = 'Calculator not found.';
    });
}

function getCalcFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('calc');
}

window.addEventListener('DOMContentLoaded', () => {
  const calc = getCalcFromQuery();
  if (calc) loadCalculator(calc);
});
