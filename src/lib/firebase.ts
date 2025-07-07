import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAADR6v_dYVFL-VblN32s1osYXja0_0h2Q",
  authDomain: "shopa-df735.firebaseapp.com",
  projectId: "shopa-df735",
  storageBucket: "shopa-df735.firebasestorage.app",
  messagingSenderId: "201107226911",
  appId: "1:201107226911:web:de50417f28e742b13af02a",
  measurementId: "G-R86499H8TZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app);

export default app;