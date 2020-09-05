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
  
    // return newContainer
  }
  
  const displayAllNotes = () => {
    let notes = storage.getAll()
  
    for (let i = 0; i < notes.length; i++) {
      displayNote(i, notes[i][0], notes[i][1])
    }
  }
  
  const deleteNote = (event) => {
    event.stopImmediatePropagation();
  
    if (confirm('Delete this note?')) {
        storage.deleteById(event.target.id);
        removeNoteContainer(document.getElementById(event.target.id))
    }
  }
  
  const removeNoteContainer = (containerId) => {
    bank.removeChild(containerId);
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
    // saveBtn.textContent = 'Save'
    // modal.classList.add('updated-container')
    modal.style.display = "block"
  }
  
  const clickOnAddBtn = () => {
    noteTitle.value = ''
    noteText.value = ''
    // modal.classList.add('updated-container')
    // saveBtn.textContent = 'Create'
  }