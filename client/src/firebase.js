// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-auroraacres.firebaseapp.com',
  projectId: 'mern-auroraacres',
  storageBucket: 'mern-auroraacres.appspot.com',
  messagingSenderId: '343524406604',
  appId: '1:343524406604:web:ae5ca5c33738e1bd864be9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
