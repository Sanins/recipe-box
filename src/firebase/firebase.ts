import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyB1znVn_4CtKjubFMbARXKvpQHlbhEGNaI",
  appId: "1:994308490877:web:58a33a64a127c5f8",
  authDomain: "recipe-e09dd.firebaseapp.com",
  databaseURL: "https://recipe-e09dd.firebaseio.com",
  messagingSenderId: "994308490877",
  projectId: "recipe-e09dd",
  storageBucket: "recipe-e09dd.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
