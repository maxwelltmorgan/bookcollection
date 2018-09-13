const collection = document.getElementById("collection")
const toggle  = document.getElementById("toggle");
const content = document.getElementById("content");
const newTitle = document.getElementById("new-title");
const newAuthor = document.getElementById("new-author");
const newPages = document.getElementById("new-pages");
const newRead = document.getElementById("new-read");
const submitButton = document.getElementById("submit-button");


let myLibrary = []
const bookProperties = ["title", "author", "pages", "read"]

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addToLibrary() {
    let newBook = new Book(newTitle.value, newAuthor.value, newPages.value, newRead.checked ? "read" : "unread")
    myLibrary.push(newBook)
    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
    newRead.checked = false;
    render()
}

function removeFromLibrary(index) {
  myLibrary.splice(index, 1)
  render()
}

function toggleRead(index) {
  myLibrary[index].read = (myLibrary[index].read == "unread" ? "read" : "unread")
  render()
}

function render() {
    collection.innerHTML = ""

        myLibrary.forEach(function(book, index) {

            let bookRow = document.createElement("tr")

                for (let i = 0; i < bookProperties.length; i++) {

                let bookCell = document.createElement("td")

                bookCell.innerHTML = book[bookProperties[i]]
                bookRow.append(bookCell)
                }

                let readToggle =document.createElement("a")
                readToggle.classList.add("readtoggle")

                readToggle.innerHTML = "update status"
                readToggle.addEventListener("click", function() { toggleRead(index) })
                bookRow.append(readToggle)
                collection.append(bookRow)

                let removeButton = document.createElement("a")
                removeButton.classList.add("remove")

                removeButton.innerHTML = "remove"
                removeButton.addEventListener("click", function() { removeFromLibrary(index) })
                bookRow.append(removeButton)
                collection.append(bookRow)
        });
}

render()

toggle.addEventListener("click", function() {content.classList.toggle("show");});
