/** @format */
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
} from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyBVxdliMe15NOjWKqc4tJ2i17hVyqaf6bc",
	authDomain: "books-app-1e89d.firebaseapp.com",
	projectId: "books-app-1e89d",
	storageBucket: "books-app-1e89d.appspot.com",
	messagingSenderId: "675296533910",
	appId: "1:675296533910:web:4a8a0b687ffef5abf711b7",
};

// init to firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection reference
const colRef = collection(db, "books");

// real time collection
onSnapshot(colRef, (snapshot) => {
	let books = [];
	snapshot.docs.forEach((doc) => {
		books.push({ ...doc.data(), id: doc.id });
	});
	console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
	e.preventDefault();
	addDoc(colRef, {
		title: addBookForm.title.value,
		author: addBookForm.author.value,
		category: addBookForm.category.value,
	}).then(() => {
		addBookForm.reset();
	});
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// get reference to deleted doc
	const docRef = doc(db, "books", deleteBookForm.id.value);
	deleteDoc(docRef).then(() => {
		deleteBookForm.reset();
	});
});
