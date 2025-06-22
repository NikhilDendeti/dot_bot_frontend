import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBneT2Wv11Y088CWcpB_BPIWz9FcBHFVjg",
  authDomain: "dotbot-34790.firebaseapp.com",
  projectId: "dotbot-34790",
  storageBucket: "dotbot-34790.appspot.com",
  messagingSenderId: "461701677145",
  appId: "1:461701677145:web:31e3bb3ccdaf758a16f148",
  measurementId: "G-KTXRRD428Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, getAuth, onAuthStateChanged };
