// Create new storage for notes
let storage = new Storage()

// Get the fields
const modal = document.querySelector(".modal")
const bank = document.querySelector(".notes-bank")
const noteTitle = document.querySelector(".note-title")
const noteText = document.querySelector(".note-textarea")

// Get the buttons
const addBtn = document.getElementById("add-btn")
const closeBtn = document.getElementById("close-btn")
const saveBtn = document.getElementById("save-btn")

// Auxiliary variables
let currentId = null;

// When the user clicks the button, open the modal
addBtn.onclick = function() {
  modal.style.display = "block"
  clickOnAddBtn()
}

// When the user clicks on close button, close the modal
closeBtn.onclick = function() {
  modal.style.display = "none"
}

saveBtn.onclick = function () {
  saveNote()
  modal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

// Testing area
storage.add(['Welcome to G-keep!', 'Here you can keep your notes safe!'])
displayAllNotes()
