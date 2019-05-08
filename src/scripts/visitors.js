const visitorList = document.querySelector('.visitorList');
const visitorForm = document.querySelector('.visitorForm');
const visitorSign = document.querySelector('#visitorSignBtn');
let table = document.querySelector('#tableBody');

//add visitor data
visitorSign.addEventListener('submit', (e) => {
  e.preventDefault(e);
  let name = document.querySelector('#visitorsName').value;
  let host = document.querySelector('#host').value;
  let time = newDate();
  let email = document.querySelector('#visitorsEmail').value;

  console.log(name, host, time, email);
  db.collection('visitors').add({
    visitor: name,
    reason: host,
    arrival: time,
    moreInfo: email,
    photo: photoUrl
  }).then(function(docRef) {
    Email.send({
      SecureToken : "bfcd0384-8e4b-4639-9ad6-22a9c5fcfba9",
      To : host,
      From : "hippitaku@gmail.com",
      Subject : "Digital-Entry",
      Body : `Hola, ya llegó tu cita. ${name}, te espera en la recpeción.
      Si necesitas reagendar, envíale un mensaje a ${email}`,
    }).then(message => alert(message)
      );
  }).catch(error => {
    console.error("Error adding document: ", error);
  });
});

//read visitors data
db.collection('visitors').onSnapshot((querySnapshot) => {
  table.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    table.innerHTML += `
    <tr>
      <th scope="col">${doc.data().name}</th>
      <td>${doc.data().host}</td>
      <td>${doc.data().time}</td>
      <td>${doc.data().photo}</td>
      <td>${doc.data().email}</td>
    </tr>
    `
  });
});

//add visitor
// visitorForm.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //
  //   db.collection('visitors').add({
    //     name: visitorForm.name.value, //you also can use yourFormName.title.value if the id is a single word whit no hyfen
    //     host: visitorForm.host.value,
    //     email: visitorForm.email.value,
    //     photo: visitorForm.photo.value
    //   }).then(() => {
      //     //reset form
      //     visitorForm.reset();
      //   }).catch(err => {
        //     console.log(err.message);
        //   });
        // });

//Show the visitors list
// const showVisitors = (data) => {
  //
  //   if (data.length) {
    //     let html = '';
    //     data.forEach(doc => {
      //       // const user = firebase.auth().currentUser.uid;
      //       const visitor = doc.data();
      //       // console.log(visitor);
      //       const tableBody = `
      //       <tr>
      //         <th scope="row"> ${doc.id} </th>
      //           <td>${doc.data().name}</td>
      //           <td>${doc.data().date}</td>
      //           <td>${doc.data().email}</td>
      //           <td>${doc.data().host}</td>
      //           <td>${doc.data().photo}</td>
      //
      //
      //           <td><button onclick="delete('${doc.id}')" title="delete btn">x</button></td>
      //
      //       </tr>
      //
      //       `;
      //         html += tableBody;
      //       });
      //       visitorList.innerHTML = html;
      //     }else {
        //       visitorList.innerHTML = '';
        //     };
        // };
