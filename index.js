const collection = document.getElementById("collection")
const toggle  = document.getElementById("toggle");
const content = document.getElementById("content");
const newTitle = document.getElementById("new-title");
const newAuthor = document.getElementById("new-author");
const newPages = document.getElementById("new-pages");
const newRead = document.getElementById("new-read");
const submitButton = document.getElementById("submit");

var config = {
    apiKey: "AIzaSyCALA0uHFAXYtudIfa3onw1MDyC0zzHzMw",
    authDomain: "library-ebc41.firebaseapp.com",
    databaseURL: "https://library-ebc41.firebaseio.com",
    projectId: "library-ebc41",
    storageBucket: "library-ebc41.appspot.com",
    messagingSenderId: "761388914779"
};
firebase.initializeApp(config);

const booksRef = firebase.database().ref('books');

booksRef.once("value",function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

    var key = childSnapshot.key;
    var childData = childSnapshot.val();
    var title_val = childSnapshot.val().title;
    var author_val = childSnapshot.val().author;
    var pages_val = childSnapshot.val().pages;
    var read_val = childSnapshot.val().read;

    let bookRow = document.createElement("tr")
    const bookprop = [title_val,author_val,pages_val,read_val]
    for (let i = 0; i < bookprop.length; i++) {
        let bookCell = document.createElement("td")
        bookCell.innerHTML = [bookprop[i]]
        bookRow.append(bookCell)
    }

    let readToggle = document.createElement("a")
    readToggle.classList.add("readtoggle")
    readToggle.innerHTML = "toggle status"

    function toggleRead() {
        read_val = (read_val == "unread" ? "read" : "unread")
        booksRef.child(key).update( {read: read_val})
    }

    readToggle.addEventListener("click", function() { toggleRead(read_val) })
    bookRow.append(readToggle)
    collection.append(bookRow)

    let removeButton = document.createElement("a")
    removeButton.classList.add("remove")
    removeButton.innerHTML = "remove"

    function removeFromLibrary() {
        booksRef.child(key).remove();
    }

    removeButton.addEventListener("click", function() { removeFromLibrary(key) })
    bookRow.append(removeButton)
    collection.append(bookRow)
    });
});

function saveBook(title, author, pages, read){
    const newBookRef = booksRef.push();
    newBookRef.set({
        title: title,
        author: author,
        pages: pages,
        read: read
    });
}

function addToLibrary() {
    saveBook(newTitle.value, newAuthor.value, newPages.value, newRead.checked ? "read" : "unread")
    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
    newRead.checked = false;
}

toggle.addEventListener("click", function() {content.classList.toggle("show");});
