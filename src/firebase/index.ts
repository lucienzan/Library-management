import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // to connect with firebase

const firebaseConfig = {
  // paste your firebase config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}