const ctx = document.getElementById('myChart');

async function init() {
  const response = await fetch('/api/expenses', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
    if (response.ok) {
      const { expenses } = await response.json();

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            label: expenses.map(e => e.source_of_expense),
            data: expenses.map(e => e.dollar_amount_of_expense),
          }]
        },
      });


    } else {
      alert(response.statusText);
    }
  
}

init();