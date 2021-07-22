import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCnlgTK7_2DyPyeAubyD-uxMlKleaSJ5Gs",
  authDomain: "beerbook2-da255.firebaseapp.com",
  projectId: "beerbook2-da255",
  storageBucket: "beerbook2-da255.appspot.com",
  messagingSenderId: "687871039584",
  appId: "1:687871039584:web:55f923926cbb2002618b05",
  measurementId: "G-RX9W09W11H",
});

const db = getFirestore();
