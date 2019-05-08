const hostList = document.querySelector('#hostList');
const hostForm = document.querySelector('#addHostForm');
const hostSelector = document.querySelector('#hostSelector');

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
  });
}

//saving data
hostForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('hosts').add({
    name: hostForm.name.value,
    email: hostForm.email.value
  });
  hostForm.name.value = '';
  hostForm.email.value = '';
});

// real-time listener
db.collection('hosts').orderBy('name').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  // console.log(changes);
  changes.forEach(change => {
    // console.log(change.doc.data());
    if(change.type == 'added'){
      renderHost(change.doc);
    } else if (change.type == 'removed'){
      let li = hostList.querySelector('[data-id=' + change.doc.id+ ']');
      hostList.removeChild(li);
    }
  });
});

//show hosts in selector
db.collection('hosts').get().then((querySnapshot) => {
  hostSelector.innerHTML = '';
  querySnapshot.forEach((doc) => {
    hostSelector.innerHTML += `
    <option value="${doc.data().email}">${doc.data().name}</option>
    `
  });
});
