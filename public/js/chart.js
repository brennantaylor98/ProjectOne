const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        label: 'Expense',
        data: [12, 19, 3, 5, 2, 3],
      }]
    },
  });