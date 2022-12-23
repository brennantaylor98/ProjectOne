const newFormHandler = async (event) => {
  event.preventDefault();

  const current_savings = document.querySelector('#wallet-savings').value.trim();
  const total_monthly_spending = document.querySelector('#project-funding').value.trim();
  const goal = document.querySelector('#project-desc').value.trim();

  if (savings && total_monthly_expenses && goal) {
    const response = await fetch(`/api/dashboard`, {
      method: 'POST',
      body: JSON.stringify({ savings, total_monthly_expenses, goal }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create wallet');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/dashboard/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete wallet');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
