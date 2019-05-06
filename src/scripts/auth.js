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

  // listen for auth status changes
  auth.onAuthStateChanged(user => {
    // console.log(user.uid);

    if (user) {
      alert(`Bienvenido administrador: ${user.email}`);
      // console.log('user logged in', user);

      // get data
      db.collection('visitors').get().then(snapshot => {

      // realtime listener (just subtitute .get().then whit .onSnapshot)
      db.collection('hosts').onSnapshot(snapshot => {
        // console.log(snapshot.docs);
        setupUI(user);
        renderHost(snapshot.docs);
        // newVisitor(snapshot.docs);
        showVisitors(snapshot.docs);
      // }).catch(err => {
      //   console.log(err.message)
      });
    });
    } else {
      setupUI();
      renderHost([]);
      // newVisitor([]);
      showVisitors([]);

    }
  });

//SIGN UP TO FIREBASE FUNCTION
function signUpFirebase (e) {
  e.preventDefault(e);
  let signUpForm = document.querySelector("#signUpForm");
  let userName = document.querySelector(".userName").value;
  let emailSignUp = document.querySelector(".txtEmailSignUp").value;
  let passwordSignUp = document.querySelector(".txtPasswordSignUp").value;

  firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp).then(auth => {
    db.collection("admin").add({
      displayName: userName,
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
  auth.signInWithEmailAndPassword(email, password).then(function () {
    console.log("User logged in");
    logInForm.reset();
  }).catch(function (error) {
        console.log(error.code);
        console.log(error.message);
    });
});

//log out user
const loggingOut = document.querySelector('#logOutBtn');
loggingOut.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(function () {
    console.log("User logged out");
  });
});

//add visitor
const visitorForm = document.querySelector('.visitorForm');
visitorForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('visitors').add({
    name: newVisitor['name'].value, //you also can use yourFormName.title.value if the id is a single word whit no hyfen
    host: newVisitor['host'].value,
    email: newVisitor['email'].value,
    photo: newVisitor['photo'].value,
    date: newVisitor['date'].value
  }).then(() => {
    //reset form
    visitorForm.reset();
    }).catch(err => {
        console.log(err.message)
  });
});


//logout button
document.querySelector("#logOutBtn").addEventListener("click", loggingOut);

//exports to test
module.exports = signUpFirebase;
