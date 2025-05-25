function calculateLoan() {
  const p = parseFloat(document.getElementById('principal').value);
  const r = parseFloat(document.getElementById('rate').value) / 100 / 12;
  const n = parseFloat(document.getElementById('years').value) * 12;
  const monthly = (p * r) / (1 - Math.pow(1 + r, -n));
  document.getElementById('result').textContent = 
    isFinite(monthly) ? `Monthly Payment: $${monthly.toFixed(2)}` : 'Please enter valid numbers';
}
