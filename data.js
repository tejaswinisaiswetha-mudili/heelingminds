  const firebaseConfig = {
    apiKey: "AIzaSyAN7VUBgCwZLDxKY_C6ZrfQvaqkV6_U3XQ",
    authDomain: "healingminds-52967.firebaseapp.com",
    projectId: "healingminds-52967",
    storageBucket: "healingminds-52967.appspot.com",
    messagingSenderId: "525409045518",
    appId: "1:525409045518:web:aeb25f7cac2cab2969005f",
  };
  firebase.initializeApp(firebaseConfig);

  function insert_data() {
    var full_name = document.getElementById("uname").value;
    var gender = document.getElementById("gender").value;
    var phone = document.getElementById("phone").value;
    var user_email= firebase.auth().currentUser.email;
    var DOB=document.getElementById("birthday").value;
    var therapy= document.getElementById("therapy").value;
    const db = firebase.firestore();
    
    if (full_name.trim() == "" || full_name.trim() == null) {
         alert("Username cannot be null");
    } else if (gender.trim() == "" || gender.trim() == null) {
         alert(" gender cannot be left empty");
    } else if(phone.trim()=="" || phone.trim()==null ){
         alert("phone number cannot be empty");
    } else {
      db.collection("clients/")
        .doc()
        .set({
          name:  full_name,
          gender: gender,
          phone_no: phone,
          email: user_email,
          dateof_birth: DOB,
          previous_therapist: therapy,
        })
        .then(() => {
          full_name = "";
          gender = "";
          phone = "";
          user_email = "";
          DOB ="";
          therapy = "";
          alert("Document successfully written!");
        })
        .catch((error) => {
          alert("Error writing document: ", error);
        });
    }
    // window.location.href='pay.html';
  }
  
  