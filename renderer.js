const content = document.getElementById('content')
const copy = document.getElementById('copy')
const next = document.getElementById('next-note')
const previous = document.getElementById('previous-note')


function onCopyClickHandler(){
  navigator.clipboard.writeText(content.innerText)
}
copy.addEventListener('click',onCopyClickHandler)
window.electronAPI.onFirstNoteLoaded((value)=>
content.innerHTML = value.toString())

async function onNextClickHandler(){
  const nextNote = await window.electronAPI.nextNote()
  if(nextNote === null){
    return
  }
  content.innerHTML = nextNote.toString()
}
next.addEventListener('click', onNextClickHandler)


async function onPreviousClickHandler(){
  const previousNote = await window.electronAPI.previousNote()
  if(previousNote === null){
    return
  }
  content.innerHTML = previousNote.toString()
}
previous.addEventListener('click', onPreviousClickHandler)