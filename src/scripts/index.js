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

//Button to show clean visitor register
const homeBtn = () => {
  document.getElementById(".visitorRegistered").style.display = 'none';
  document.querySelector(".visitorSign").style.display = 'block';
  // document.querySelector(".visitorForm").reset();
};
document.getElementById("goHomeBtn").addEventListener('click', homeBtn);

//Button to get register info
const visitorSignBtn = () => {
  document.getElementById(".visitorRegistered").style.display = 'block';
  document.querySelector(".visitorSign").style.display = 'none';
  // document.querySelector(".visitorForm").reset();
};
document.getElementById("visitorSignBtn").addEventListener('click', visitorSignBtn);
