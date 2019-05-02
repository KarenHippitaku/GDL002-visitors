const hostList = document.querySelector("#hostList");
const form = document.querySelector("#addHostForm");
const visitorList = document.querySelector(".visitorList")

//create a host and render it
function renderHost(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let email = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  email.textContent = doc.data().email;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(cross);

  hostList.appendChild(li);

  // deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('hosts').doc(id).delete();
  })
}

//saving data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('hosts').add({
    name: form.name.value,
    email: form.email.value
  });
  form.name.value = '';
  form. email. value = '';
})

// real-time listener
db.collection('hosts').orderBy('name').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  // console.log(changes);
  changes.forEach(change => {
    // console.log(change.doc.data());
    if(change.type == 'added'){
      renderHost(change.doc)
    } else if (change.type == 'removed'){
      let li = hostList.querySelector('[data-id=' + change.doc.id+ ']');
      hostList.removeChild(li);
    }
  });
});

//create new visitor
const newVisitor = document.querySelector('.visitorForm');
newVisitor.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('visitors').add({
    name: newVisitor['name'].value, //you also can use newVisitor.title.value if the id is a single word whit no hyfen
    host: newVisitor['host'].value,
    email: newVisitor['email'].value,
    photo: newVisitor['photo'].value,
    date: newVisitor['date'].value
  });
});


//Show the visitors list
const showVisitors = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      // const user = firebase.auth().currentUser.uid;
      const visitor = doc.data();
      // console.log(visitor);
      const tableBody = `
      <tr>
        <th scope="row"> ${doc.id} </th>
          <td>${doc.data().name}</td>
          <td>${doc.data().date}</td>
          <td> ${doc.data().email}</td>
          <td> ${doc.data().host}</td>
          <td> ${doc.data().photo}</td>


          <td><button onclick="eliminar('${doc.id}')" title="Boton Eliminar">x</button></td>

      </tr>

      `;
        html += tableBody
      });
      visitorList.innerHTML = html;
    }else {
      visitorList.innerHTML = ''
    };
};
