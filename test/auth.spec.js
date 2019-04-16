const signUpFirebase = require('../src/auth.js'); //buscar en ../carpeta/archivo o ./archivo

// import MockFirebase from '../_mocks_/firebase.mock.js';
// global.firebase = MockFirebase();

describe('signUpFirebase', () => {
  it('should recibe email and password to create a new user', () => {
    expect(signUpFirebase('emailSignUp', 'passwordSignUp')).toBe('createUserWithEmailAndPassword');
  });
});
