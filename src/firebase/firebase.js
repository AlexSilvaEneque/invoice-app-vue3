import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBoVQUBGf0acc26cXqeL7kAelqVcWxd3wE",
  authDomain: "invoiceappvuex.firebaseapp.com",
  projectId: "invoiceappvuex",
  storageBucket: "invoiceappvuex.appspot.com",
  messagingSenderId: "504845130562",
  appId: "1:504845130562:web:cae2cbcc29778067fc06db"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db