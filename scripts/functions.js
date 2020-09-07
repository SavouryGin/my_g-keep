// Adds a container with a note to the page
const displayNote = (note, place) => {

  let newContainer = document.createElement('div')
  newContainer.className = 'note-container'
  newContainer.id = note.id
  newContainer.setAttribute('onclick', 'clickOnNote(this.id)')

  let noteTitle = document.createElement('h2')
  noteTitle.className = 'note-title__container'
  noteTitle.id = `${note.id}-title`
  noteTitle.appendChild(document.createTextNode(note.title))

  let noteContent = document.createElement('p')
  noteContent.className = 'note-textarea__container'
  noteContent.id = `${note.id}-content`
  noteContent.innerHTML = note.content.replace(/\n/g, '<br>')

  let noteTime = document.createElement('p')
  noteTime.className = 'note-time__container'
  noteTime.textContent = generateLastEdited(note.updatedAt)

  let delBtn = document.createElement('div')
  delBtn.className = 'del-button'
  delBtn.id = note.id
  delBtn.setAttribute('onclick', 'deleteNote(event)')

  newContainer.appendChild(noteTitle)
  newContainer.appendChild(noteContent)
  newContainer.appendChild(noteTime)
  newContainer.appendChild(delBtn)

  // The place where the container with the note will be displayed
  place.appendChild(newContainer) 

  return newContainer
}

// Asks for confirmation to delete a note when clicking the button
const deleteNote = (event) => {
  event.stopImmediatePropagation()

  if (confirm('Delete this note?')) {
    storage.deleteById(event.target.id)
    bank.removeChild(document.getElementById(event.target.id))
  }
}

// Refreshes the note in the store
const saveNote = (noteTitle, noteText, place) => {
  const newTimeStamp = moment().valueOf();
  if (currentId != null) {    
    storage.updateById(currentId, {
      id: currentId,
      title: noteTitle.value, 
      content: noteText.value,
      updatedAt: newTimeStamp
    })

    let currentNoteTitle = document.getElementById(`${currentId}-title`)
    let currentNoteContent = document.getElementById(`${currentId}-content`)

    currentNoteTitle.textContent = noteTitle.value
    currentNoteContent.innerHTML = noteText.value.replace(/\n/g, '<br>')
    currentId = null

  } else {
    const id = uuidv4();
    storage.add(id, {
      id: id,
      title: noteTitle.value, 
      content: noteText.value,
      createdAt: newTimeStamp,
      updatedAt: newTimeStamp
    })
    displayNote(storage.getById(id), place)
  }
}

// Opens a modal window for editing a note
const clickOnNote = (id) => {
  currentId = id
  const currentNote = storage.getById(id)
  noteTitle.value = currentNote.title
  noteText.value = currentNote.content
  modal.style.display = "block"
}

// Render all notes according to the filter
const renderNotes = (storage, filters, place) => {
  let notes = sortNotes(storage.getAll(), filters.sortBy)

  const filteredNotes = notes.filter((note) => {
    const title = note.title.toLowerCase()
    const content = note.content.toLowerCase()
    const filter = filters.searchText.toLowerCase()
    return title.includes(filter) || content.includes(filter);
    })

    place.innerHTML = '';

  if (filteredNotes.length > 0){
    filteredNotes.forEach((note) => {
    const id = note.id
    const p = displayNote(storage.getById(id), place)
    place.appendChild(p)
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No notes to show'
    emptyMessage.classList.add('empty-message')
    place.appendChild(emptyMessage)
  }
}

// Sorts notes by filters
const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited'){
    return notes.sort( (a, b) => {
        if (a.updatedAt > b.updatedAt){
          return -1
        } else if (a.updatedAt < b.updatedAt){
        return 1
        } else {
        return 0
      }
    })
  } else if (sortBy === 'byCreated') {
    return notes.sort( (a, b) => {
      if (a.createdAt > b.createdAt){
        return -1
      } else if (a.createdAt < b.createdAt){
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'alphabetical'){
    return notes.sort( (a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()){
        return -1
      } else if (a.title.toLowerCase() > b.title.toLowerCase()){
        return 1
      } else {
        return 0
      }
      })
  } else {
    return notes
  }
}

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`