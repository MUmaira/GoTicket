import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyCdzDwEi9sEa90EWcbkCYOQ_AL-ASnL9qw",
  authDomain: "goticket-d73bb.firebaseapp.com",
  projectId: "goticket-d73bb",
  storageBucket: "goticket-d73bb.appspot.com",
  messagingSenderId: "753202050140",
  appId: "1:753202050140:web:6fee00b3384a88050de299"
};

// Initializing Firebase for authentication
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();
const database = fire.database();

export { auth , database };
