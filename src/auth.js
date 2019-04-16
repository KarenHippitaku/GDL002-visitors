// INITIALIZE FIREBASE
const config = {
    // apiKey: "AIzaSyCVMhEYlJiDWvqWH46S_aDDYnmDnfLMBSY", //Lucie
    // authDomain: "digital-entry.firebaseapp.com",
    // databaseURL: "https://digital-entry.firebaseio.com",
    // projectId: "digital-entry",
    // storageBucket: "digital-entry.appspot.com",
    // messagingSenderId: "852568429856"
    apiKey: "AIzaSyAMZtfgAF-_esRipxlqX10WWnqrSxlVhkw", //Karen
    authDomain: "registro-de-visitantes-b3572.firebaseapp.com",
    databaseURL: "https://registro-de-visitantes-b3572.firebaseio.com",
    projectId: "registro-de-visitantes-b3572",
    storageBucket: "registro-de-visitantes-b3572.appspot.com",
    messagingSenderId: "670645937918"
  };
  firebase.initializeApp(config);
  const auth = firebase.auth();
  const db = firebase.firestore();


//SIGN UP TO FIREBASE FUNCTION
function signUpFirebase (e) {
  e.preventDefault(e);
  let signUpForm = document.querySelector("#signUpForm");
  let userName = document.querySelector(".userName").value;
  let emailSignUp = document.querySelector(".txtEmailSignUp").value;
  let passwordSignUp = document.querySelector(".txtPasswordSignUp").value;

  firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp).then(auth => {
    db.collection("admin").add({
      name: userName,
      email: emailSignUp,
      password: passwordSignUp
    }).then(function () {
        console.log("Usuario creado");
        signUpForm.reset();
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  });
}
//SIGN UP BUTTON
document.querySelector(".signUpBtn").addEventListener("click", signUpFirebase);

//log in user
const logInForm = document.querySelector("#logInForm");
logInForm.addEventListener("click", (e) => {
  e.preventDefault();
  const email = logInForm["email"].value;
  const password = logInForm["password"].value;
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    logInForm.reset();
  });
});

//log out user
const logOut = document.querySelector("#logOutBtn");
logOut.addEventListener("click", (e) {
  e.preventDefault();
  auth.signOut().then(function () {
    console.log("User logged Out");
  });
};

//logout button
document.querySelector("#logOutBtn").addEventListener("click", logOut);

//Para exportar a test
module.exports = signUpFirebase;
