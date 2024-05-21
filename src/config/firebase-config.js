import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACA_c0Zcrj58m0CL44a7NwXLIt8UAPflM",
  authDomain: "ol-academy-react-final-project.firebaseapp.com",
  projectId: "ol-academy-react-final-project",
  storageBucket: "ol-academy-react-final-project.appspot.com",
  messagingSenderId: "663929369203",
  appId: "1:663929369203:web:9e23a459893cd33f47b006",
  measurementId: "G-50GP7SJPMY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// const analytics = getAnalytics(app);
