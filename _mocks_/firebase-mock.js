const firestore = () => {
  return {
    collection: (nameCollection) => {
      return {
        add: (odjData) => {
          return new Promise((resolve) => {
            resolve('createUserWithEmailAndPassword')
          })
        }
      }
    }
  }
}

const firebase = {
  firestore: firestore
}

module.exports = jest.fn(() => {
  return firebase;
})

// const firebase = {
//   firestore:() => {},
// }
