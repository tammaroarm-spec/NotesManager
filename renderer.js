const content = document.getElementById('content')
const copy = document.getElementById('copy')
const next = document.getElementById('next-note')
const previous = document.getElementById('previous-note')
const title = document.getElementById('title')

function onCopyClickHandler(){
  navigator.clipboard.writeText(content.innerText)
}
copy.addEventListener('click',onCopyClickHandler)
window.electronAPI.onFirstNoteLoaded((value)=>{
content.innerHTML = value.note.toString();
title.innerHTML = value.title.toString()})

async function onNextClickHandler(){
  const result = await window.electronAPI.nextNote()
  if(result === null){
    return
  }
  content.innerHTML = result.note.toString()
  title.innerHTML = result.title.toString()
}
next.addEventListener('click', onNextClickHandler)


async function onPreviousClickHandler(){
  const result = await window.electronAPI.previousNote()
  if(result === null){
    return
  }
  content.innerHTML = result.note.toString()
  title.innerHTML = result.title.toString()
}
previous.addEventListener('click', onPreviousClickHandler)