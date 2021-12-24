import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAk25gCyn598Uqd8SdbM_0IjvE4xPMyvls",
  authDomain: "wepull-55b41.firebaseapp.com",
  projectId: "wepull-55b41",
  storageBucket: "wepull-55b41.appspot.com",
  messagingSenderId: "124399886427",
  appId: "1:124399886427:web:5bee9a6f8a5cc53a589f7e",
  measurementId: "G-NGWRFHBV1G"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
const db = firebase.firestore();

export {
  auth,
  db,
  firebase
};