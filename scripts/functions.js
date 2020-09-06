const displayNote = (id, title, text) => {

  // Note container
  let newContainer = document.createElement('div')
  newContainer.className = 'note-container'
  newContainer.id = id
  newContainer.setAttribute('onclick', 'clickOnNote(this.id)');

  // Note title
  let noteTitle = document.createElement('h2')
  noteTitle.className = 'note-title__container'
  noteTitle.id = `${id}-title`
  noteTitle.appendChild(document.createTextNode(title))

  // Note content
  let noteContent = document.createElement('p')
  noteContent.className = 'note-textarea__container'
  noteContent.id = `${id}-content`
  noteContent.innerHTML = text.replace(/\n/g, '<br>');

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

  return newContainer
}
  
  // const displayAllNotes = () => {
  //   let notes = storage.getAll()
  
  //   for (let i = 0; i < notes.length; i++) {
  //     displayNote(i, notes[i][0], notes[i][1])
  //   }
  // }
  
const deleteNote = (event) => {
  event.stopImmediatePropagation()

  if (confirm('Delete this note?')) {
    storage.deleteById(event.target.id)
    removeNoteContainer(document.getElementById(event.target.id))
  }
}
  
const removeNoteContainer = (containerId) => {
  bank.removeChild(containerId)
}
  
const saveNote = () => {
  if (currentId != null){
    storage.updateById(currentId, [noteTitle.value, noteText.value])
    let currentNoteTitle = document.getElementById(`${currentId}-title`)
    let currentNoteContent = document.getElementById(`${currentId}-content`)
    currentNoteTitle.textContent = noteTitle.value
    currentNoteContent.innerHTML = noteText.value.replace(/\n/g, '<br>')
    currentId = null
  } else { 
    let id = storage.add([noteTitle.value, noteText.value])
    displayNote(id, noteTitle.value, noteText.value)
  }
}
  
const clickOnNote = (id) => {
  currentId = id
  let currentNote = storage.getById(id);
  noteTitle.value = currentNote[0]
  noteText.value = currentNote[1]
  modal.style.display = "block"
}
  
const clickOnAddBtn = () => {
  noteTitle.value = ''
  noteText.value = ''
}

// Render application notes
const renderNotes = (storage, filters) => { 
  const notesBank = document.querySelector('.notes-bank') 
  let notes = sortNotes(storage.getAll(), filters.sortBy)

  const filteredNotes = notes.filter( (note) => {
    const title = note[0].toLowerCase()
    const filter = filters.searchText.toLowerCase()
    return title.includes(filter)
  })

  notesBank.innerHTML = '';

  if (filteredNotes.length > 0){
    filteredNotes.forEach( (note) => {
    const id = getId(storage.store, note)
    const p = displayNote(id, note[0], note[1])
    notesBank.appendChild(p)
  })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'Заметок пока нет'
    emptyMessage.classList.add('empty-message')
    notesBank.appendChild(emptyMessage)
  }
}

const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited'){
    return notes.sort((a,b) => {
      if (a.updatedAt > b.updatedAt){
        return -1;
    } else if (a.updatedAt < b.updatedAt){
      return 1;
    } else {
      return 0;
    }
    })
  } else if (sortBy === 'byCreated') {
    return notes.sort( (a,b) => {
     if (a.createdAt > b.createdAt){
      return -1;
    } else if (a.createdAt < b.createdAt){
      return 1;
    } else {
      return 0;
    }
  })
  } else if (sortBy === 'alphabetical'){
  return notes.sort( (a,b) => {
  if (a[0].toLowerCase() < b[0].toLowerCase()){
  return -1;
  } else if (a[0].toLowerCase() > b[0].toLowerCase()){
  return 1;
  } else {
  return 0;
  }
  })
  } else {
  return notes;
  }
}

const getId = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}