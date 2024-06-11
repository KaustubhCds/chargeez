import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRleNh7T1e6eUCrdU-tYs7VppnDFcs6Mc",
  authDomain: "chargeeazy-fd0a9.firebaseapp.com",
  projectId: "chargeeazy-fd0a9",
  storageBucket: "chargeeazy-fd0a9.appspot.com",
  messagingSenderId: "967622271870",
  appId: "1:967622271870:web:e0d28bcdf323e6bbae492f",
  measurementId: "G-QT4VEBQSXJ"
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export { ref, uploadBytes, getDownloadURL };

