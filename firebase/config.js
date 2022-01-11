import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDBX4SPBD-_4_UX-DWQyk1y6LSTO7JFdAs',
  authDomain: 'codingchallenge-aa72e.firebaseapp.com',
  databaseURL: 'https://codingchallenge-aa72e.firebaseio.com',
  projectId: 'codingchallenge-aa72e',
  storageBucket: 'gs://codingchallenge-aa72e.appspot.com',
  messagingSenderId: '12345-insert-yourse',
  appId: '1:356503386234:ios:e57ad06b29c31f0f8823c3',
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, user => {
  // Check for user status
});
export const db = getFirestore(firebaseApp);
