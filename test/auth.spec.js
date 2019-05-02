const MockFirebase = require('../_mocks_/firebase-mock.js');
global.firebase = MockFirebase();

const signUpFirebase = require('../src/auth.js'); //buscar en ../carpeta/archivo o ./archivo

describe ('signUpFirebase', () => {
  it('should be a function', () => {
    expect(typeof signUpFirebase).toBe('function');
  })
})

// describe('signUpFirebase', () => {
//   it('should recibe email and password to create a new user', () => {
//     return signUpFirebase('emailSignUp', 'passwordSignUp').then((data) => {
//       expect(data).toBe('createUserWithEmailAndPassword');
//     });
//   });
// });
