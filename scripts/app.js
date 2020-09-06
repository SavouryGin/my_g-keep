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

// Welcome message
storage.add(['Welcome to G-keep!', 'Here you can keep your notes safe!'])

// Set initial value of time and filter
const timeStamp = moment().valueOf()
const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

// Show start page
renderNotes(storage, filters);

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




// When the user enters text into the search bar
document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderNotes(storage, filters)
})

// When a user selects a filter
document.querySelector('#filter-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value
  renderNotes(storage, filters)
})

