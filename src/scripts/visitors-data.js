// Initialize Cloud Firestore through Firebase
// var db = firebase.firestore();


//función para guardar los datos del usuario visitante
function guardar() {

    var firstName = document.getElementById("name").value; //variable para guardar el nombre
    var email = document.getElementById("email").value; // variable para guardar la dirección de correo electronico
    var date = document.getElementById("date").value; // variable para guardar la fecha de entrada
    var hostSelector = document.getElementById("hostSelector").value; // variable para guardar el motivo de visita
    var time = document.getElementById("time").value;
    var foto = document.getElementById("foto()");


    // los datos se guardan en la colección de visitors con la compilacion de datos ordenada
    db.collection("visitors").add({
            firstName: firstName,
            entrada: date,
            email: email,
            hostSelector: hostSelector,
            time: time,
            foto: foto

        })
        .then(function(docRef) { //si todo sale bien el then da una referencia y la valida correctamente
            console.log("Document written with ID: ", docRef.id);
            var firstName = document.getElementById("firstName").value = ''; //se agregó un string vacio para reiniciar los campos cuando los datos se guarden//
            var email = document.getElementById("email").value = '';
            var date = document.getElementById("date").value = '';
            var host = document.getElementById("hostSelector").value = '';
            var time = document.getElementById("time").value = '';
            var foto = document.getElementById("foto").value = '';

        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

}



function aparece(user) {
    var user = user;
    var contenido = document.getElementById("contenido");
    if (user.emailVerified) {
        contenido.innerHTML = `
      <p>Bienvenidx ${user.email}
      <div id="contenido">

      <button onclick = "cerrar()" >Cerrar sesión</button>
      </div>
      `;
    }
  }

//usamos forEach para crear un ciclo
//=+ hacemos que se agregue un nuevo dato
//Leer datos en la tableBody
//pasa los datos de mi coleccion visitors y los acomoda en cada espacio declarado en mis doc
var tableBody = document.getElementById("tableBody");
db.collection("visitors").onSnapshot((querySnapshot) => {
    tableBody.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data())
        tableBody.innerHTML += `

        <tr>
      <th scope="row"> ${doc.id} </th>
        <td>${doc.data().firstName}</td>
        <td>${doc.data().entrada}</td>
        <td> ${doc.data().email}</td>
        <td> ${doc.data().hostSelector}</td>
        <td> ${doc.data().time}</td>
        <td> ${doc.data().foto}</td>


       <td><button onclick="eliminar('${doc.id}')" title="Boton Eliminar">x</button></td>

      </tr>

      `;
    });
});


// se cambio db.collection("visitors").get (.onSnapshot(querySnapshot) => {
// por db.collection("visitors").onSnapshot((querySnapshot) => {
//para que agregue cambios en time real sin tener que actualizar la pag
//En boton eliminar cambiamos los parametros y le pasamos el id correspondiente a la fila

//borrar datos
function eliminar(id) {
    db.collection("visitors").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}



//funcion para seleccionar el motivo de la visita declarando la variable x como laboratoria
//declarando la variable i como plaza S, regresando la opcion en demo
function myFunction() {
    var x = document.getElementById("hostSelector");
    var i = x.selectedIndex;
    document.getElementById("demo").innerHTML = x.options[i].text;
}

function convertTimestamp(timestamp){
return dateFns.format(timestamp, 'MM/DD/YYYY')
}
var unixNow = (new Date()) ;
document.write(convertTimestamp(unixNow));
