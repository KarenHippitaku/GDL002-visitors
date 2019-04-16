const loggedIn = document.querySelectorAll(".loggedIn");
const loggedOut = document.querySelectorAll(".loggedOut");


const setupUI = (user) => {
  if (user) {
    //show account info
    // const html = `
    //   <div>Logged in as ${user.email}</div>
    // `;
    // visitorSign.innerHTML = html;

    //toggle UI elements
    loggedIn.forEach(item => item.style.display = 'block');
    loggedOut.forEach(item => item.style.display = 'none');
  } else {
    //hide account info
    // visitorSign.innerHTML = '';
    //toggle UI elements
    loggedIn.forEach(item => item.style.display = 'none');
    loggedOut.forEach(item => item.style.display = 'block');
  };
};

// alert(`Bienvenido ${user.uid}`);
