  function redirectToLogin()
  {
  
    window.location.href = "/login";
  
  }
  
    document
    .querySelector('.login-nav')
    .addEventListener('click', redirectToLogin);
  
    document
    .querySelector('.register-nav')
    .addEventListener('click', redirectToLogin);
  