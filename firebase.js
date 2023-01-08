const firebaseConfig = {
  apiKey: "AIzaSyAN7VUBgCwZLDxKY_C6ZrfQvaqkV6_U3XQ",
  authDomain: "healingminds-52967.firebaseapp.com",
  projectId: "healingminds-52967",
  storageBucket: "healingminds-52967.appspot.com",
  messagingSenderId: "525409045518",
  appId: "1:525409045518:web:aeb25f7cac2cab2969005f",
  measurementId: "G-PP0TPK8Q7D",
  // databaseURL: "https://healingminds-52967-default-rtdb.firebaseio.com/",
  
};

import firebase from "firebase/app";
import "firebase/database";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
var database = firebase.database();
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase conceptualist login
function c_login() {
  const cli_email = document.getElementById("client-email").value;
  const cli_pass = document.getElementById("client-pass").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(cli_email, cli_pass)
    .then((userCredential) => {
      // Signed in
      window.location.href = "client.html";
    })
    .catch((error) => {
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function con_signup() {
  var full_name = document.getElementById("client-name").value;
  var client_gender = document.getElementById("client-gender").value;
  var client_email = document.getElementById("client-email").value;
  var client_phn = document.getElementById("client-ph").value;
  var client_pass = document.getElementById("client-pass").value;
  var client_cnfpass = document.getElementById("client-cnfpass").value;
  var form = document.getElementById("client_form");

  if (full_name.trim() == null || full_name.trim() == "") {
    alert("Please enter Full name!!");
  } else if (client_gender.trim() == null || client_gender.trim() == "") {
    alert("Please enter Gender!!");
  } else if (client_phn.trim() == null || client_phn.trim() == "") {
    alert("Please enter valid phone number!");
  } else if (isNaN(client_phn)) {
    alert("Please enter valid phone number!");
  } else if (client_pass.trim() != client_cnfpass.trim()) {
    alert("Password and Confirm passsword doesn't match");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(client_email, client_cnfpass)
      .then(function (userCredential) {
        // Signed in
        var user_id = userCredential.user.uid;
        saveCon(full_name, client_gender, client_email, client_phn, user_id);
        form.reset();
      })
      .catch((error) => {
        var errorMessage = error.message;
         alert(errorMessage);
      });
  }
}
// function saveCon(full_name, client_gender, client_email, client_phn, user_id) {
//   const db = firebase.firestore();
//   db.collection("users")
//     .doc(user_id)
//     .set({
//       fName: full_name,
//       gender: client_gender,
//       cliEmail: client_email,
//       cliPhn: client_phn,
//     })
//     .then(() => {
//       alert("Document successfully written!");
//     })
//    .catch((error) => {
//     alert("Document successfully written!");
//     //  alert("Error writing document: ", error.message);
//     });
// }

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
      alert("Logged out successfully");
    })
    .catch((error) => {
      // An error happened.
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function saveCon(full_name, client_gender, client_email, client_phn, user_id) {
  firebase.database().ref('users/').set({
          fName: full_name,
          gender: client_gender,
          cliEmail: client_email,
          cliPhn: client_phn,
  }, (error)=>{
    if(error){
    alert("Error writing document: ");
    } else {
        alert("Values stored successfully written!");
    }
  });
}