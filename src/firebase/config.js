import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD0Qh_T2S2e1GBG0yUJ5n-rFIgdm5ezZAo',
  authDomain: 'journal-app-f3721.firebaseapp.com',
  projectId: 'journal-app-f3721',
  storageBucket: 'journal-app-f3721.appspot.com',
  messagingSenderId: '969658238478',
  appId: '1:969658238478:web:eb14ec99618367e1c29e5f',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
