const setupUI = (user) => {
  if (user) {
    //show account info
    const html = `
      <div>Logged in as ${user.email}</div>
    `;
    accountDetails.innerHTML = html;

    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    //hide account info
    accountDetails.innerHTML = '';
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  };
};

// alert(`Bienvenido ${user.uid}`);
