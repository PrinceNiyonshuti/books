/** @format */
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
	query,
	where,
	orderBy,
	serverTimestamp,
    getDoc,
    updateDoc
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

// query selection
const q = query(colRef, orderBy("createdAt"));

// real time collection
onSnapshot(q, (snapshot) => {
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
		createdAt: serverTimestamp(),
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

// get single
const docRef = doc(db, "books", "HfFgARa719UNGEGWsjb6");
onSnapshot(docRef, (doc) => {
	console.log(doc.data(), doc.id);
});


// updating doc
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
	e.preventDefault();
	// get reference to deleted doc
    const docRef = doc(db, "books", updateForm.id.value);
    updateDoc(docRef, {
        title: 'updated title',
        
    }).then(() => {
        updateForm.reset()
    })
});
