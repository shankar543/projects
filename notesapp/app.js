
const addNotesBtn =document.querySelector(".addNote")
let notes=[];


function checkId(id){
  let noteids = notes.map(x=>x.id)
  id=noteids.indexOf(id)!=-1?1+noteids.sort().pop():id;
  return id;
}
addNotesBtn.addEventListener("click",createNote)
function createNote(notetext="",id=document.querySelectorAll('.notes').length+1){
    
    let text=typeof notetext=='string'?notetext:"";
    let note = document.createElement("div");
    note.setAttribute("id",id);
    note.classList.add("notes")
    note.innerHTML=`<div class="tools">
    <button class="edit"><i class="fa-light fa-pencil"></i>edit</button>
    <button class="remove"><i class="fa-light fa-pencil"></i>remove</button>
  </div>
  <div class="main"></div>
  <textarea name="" id=""></textarea>`;
document.body.appendChild(note);
const edit=note.querySelector('.edit');
const remove = note.querySelector(".remove");
const textareaEl =note.querySelector("textarea")
const mainEl = note.querySelector(".main");

if(text)
{
textareaEl.classList.add('hidden');
mainEl.innerHTML=marked.parse(text);
textareaEl.innerHTML=text;
}
    else{
    mainEl.classList.add('hidden');
}
textareaEl.addEventListener("input",(e)=>{
    mainEl.innerHTML = marked.parse(e.target.value);
    });
edit.addEventListener("click",()=>{
        textareaEl.classList.toggle("hidden")
        mainEl.classList.toggle("hidden")
        savenotes(note);
    });
    remove.addEventListener("click",function(){
removeNote(note);
        
    })
}
function removeNote(note){
            note.remove();
        let nodes=[]
        document.querySelectorAll(".notes").forEach((note,i)=>{
            note.setAttribute('id',i+1);
            console.log('new ids:'+note.getAttribute('id'));
            nodes.push({id:i+1,text:note.querySelector('textarea').value});
        })
        if(nodes.length){
            localStorage.setItem('notes',JSON.stringify([...nodes]));
        }else{
            localStorage.removeItem("notes");
        }
        
}



function addAllNotes(){
notes=JSON.parse(localStorage.getItem("notes"));
if(notes){
        notes.forEach((note,i)=>{
        createNote(note.text,i+1);
        })
        }
}

function savenotes(currentnote){
    let textelm=currentnote.querySelector('textarea');
    if(!textelm.classList.contains('hidden'))
    return;
    let notes=JSON.parse(localStorage.getItem("notes"));
    let note={id:currentnote.getAttribute('id'),text:textelm.value}
    if(notes && notes.length && Array.isArray(notes)){
    notes=notes.filter(elm=>elm.id!=parseInt(currentnote.id));
    localStorage.setItem("notes",JSON.stringify([...notes,note]));
}else{
    localStorage.setItem("notes",JSON.stringify([note]));
}
}
addAllNotes();