// INITIALIZE FIREBASE
const config = {
    apiKey: "AIzaSyCVMhEYlJiDWvqWH46S_aDDYnmDnfLMBSY",
    authDomain: "digital-entry.firebaseapp.com",
    databaseURL: "https://digital-entry.firebaseio.com",
    projectId: "digital-entry",
    storageBucket: "digital-entry.appspot.com",
    messagingSenderId: "852568429856"
  };
  firebase.initializeApp(config);


//SIGN UP TO FIREBASE FUNCTION
function signUpFirebase (e) {
  e.preventDefault(e);
    
  let emailSignUp = document.querySelector(".txtEmailSignUp").value; 
  let passwordSignUp = document.querySelector(".txtPasswordSignUp").value;
 
  firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
}
//SIGN UP BUTTON 
document.querySelector(".btnSignUp").addEventListener("click", signUpFirebase);

//LOG IN FIREBASE FUNCTION 
function logInFirebase (e) {
  e.preventDefault(e);

  let emailLogIn = document.querySelector(".txtEmailLogIn").value;
  let passwordLogIn = document.querySelector(".txtPasswordLogIn").value;

  firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
}
//LOG IN BUTTON 
document.querySelector(".btnLogIn").addEventListener("click", logInFirebase);


