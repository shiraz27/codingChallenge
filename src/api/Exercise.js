import {db} from '../../firebase/config';
import 'firebase/compat/firestore';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

export async function getExercise() {
  const q = query(collection(db, 'exercise'));
  const querySnapshot = await getDocs(q);
  let res = [];
  querySnapshot.forEach(doc => {
    res.push(doc.data());
  });
  return res;
}
