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
let currentId = null
const timeStamp = moment().valueOf()
const filters = {
    searchText: '',
    sortBy: 'byEdited'
}
const startId = uuidv4();

// Welcome message
storage.add(startId, {
  id: startId,
  title: 'Welcome to G-keep!', 
  content: 'Here you can keep your notes safe!',
  createdAt: timeStamp,
  updatedAt: timeStamp,
})

// Render the start page
renderNotes(storage, filters, bank);

// When the user clicks the button, open the modal
addBtn.onclick = () => {
  modal.style.display = "block"
  noteTitle.value = ''
  noteText.value = ''
}

// When the user clicks on close button, close the modal
closeBtn.onclick = () => {
  modal.style.display = "none"
}

saveBtn.onclick = () => {
  saveNote(noteTitle, noteText, bank)
  modal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

// When the user enters text into the search bar
document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderNotes(storage, filters, bank)
})

// When a user selects a filter
document.querySelector('#filter-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value
  renderNotes(storage, filters, bank)
})

