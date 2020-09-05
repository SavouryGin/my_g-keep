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
let currentNote = null;

// When the user clicks the button, open the modal
addBtn.onclick = function() {
  modal.style.display = "block"
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


// Functions

function displayNote(id, title, text) {

  // Форма заметки:
  let newContainer = document.createElement('div')
  newContainer.className = 'note-container'
  newContainer.id = id
  // newContainer.setAttribute('onclick', 'NoteClick(this.id)');

  // Note title
  let noteTitle = document.createElement('h2')
  noteTitle.className = 'note-title__container'
  noteTitle.id = `${id}-title`
  noteTitle.appendChild(document.createTextNode(title))

  // Note text
  let noteContent = document.createElement('p')
  noteContent.className = 'note-textarea__container'
  noteContent.id = `${id}-content`
  noteContent.innerHTML = text


  // Delete button
  let delBtn = document.createElement('div')
  delBtn.className = 'buttons'
  delBtn.id = id
  delBtn.setAttribute('onclick', 'deleteNote(event)')

  // Delete icon
  let delBtnImg = document.createElement('img')
  delBtnImg.src = "./icons/delete.png"
  delBtnImg.alt = "delete icon"
  delBtnImg.id = id
  delBtnImg.className = "buttons-icons"

  // Set up all elements
  delBtn.appendChild(delBtnImg)
  newContainer.appendChild(noteTitle)
  newContainer.appendChild(noteContent)
  newContainer.appendChild(delBtn)

  bank.appendChild(newContainer)

  // return newContainer
}

function displayAllNotes() {
  let notes = storage.getAll()

  for (let i = 0; i < notes.length; i++) {
    console.log(i, notes[i])
    displayNote(i, notes[i][0], notes[i][1])
  }
}

function deleteNote(event) {
  event.stopImmediatePropagation();

  if (confirm('Delete this note?')) {
      storage.deleteById(event.target.id);
      removeNoteContainer(document.getElementById(event.target.id))
  }
}

function removeNoteContainer(containerId) {
  bank.removeChild(containerId);
}

function saveNote() {
  let id = storage.add([noteTitle.value, noteText.value])
  console.log(id, noteTitle.value, noteText.value)
  displayNote(id, noteTitle.value, noteText.value)
}

// Testing area
storage.add(['Welcome to G-keep!', 'Here you can keep your notes safe!'])
displayAllNotes()