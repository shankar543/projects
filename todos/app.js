const form = document.querySelector("#form")
const inputEL = document.querySelector("form>input")
const todoList = document.querySelector(".todolist")
form.addEventListener("submit",()=>{
addTodo()
})
function addTodo(todo=""){
let todoEl = document.createElement("li");
todoEl.innerText = todo&&todo.text || inputEL.value;
if(todo&&todo.completed){
    todoEl.classList.add("completed")
}
todoList.appendChild(todoEl);
//tooglecompleted class on left click on todoEL
todoEl.addEventListener("click",()=>{
    todoEl.classList.toggle("completed")
    storeTodos();
});
//remove todoEL on rihght click
todoEl.addEventListener("contextmenu",function(e){
e.preventDefault()
    todoEl.remove();
    storeTodos();
});
storeTodos()
inputEL.value="";
}
//store all todos in localstorage
function storeTodos(){
    let todos=[]
    todosList=document.querySelectorAll("li")
    todosList.forEach(todo => {
        let node = {}
        node.text=todo.innerText;
        node.completed = todo.classList.contains("completed")?true:false
        todos.push(node)
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadTodosFromLocal(){
    let todos = JSON.parse(localStorage.getItem("todos"))
    todos.forEach(todo=>{
addTodo(todo);
    })
}
window.addEventListener("load",function(){
    loadTodosFromLocal()    
});
