let formName = document.querySelector('#fullname');
let ownerName = document.querySelector('#ownerName');
let nameButton = document.querySelector('#nameButton');
let landingPage = document.querySelector('#landing_page');
let welcomePage = document.querySelector('#welcome-section');
let todosInput = document.querySelector('#todoInput');
let addTodo = document.querySelector('#add-todo');
let todoUl = document.querySelector('ul');
let category = document.querySelector('#category')
let nextButton = document.querySelector('#next-todos');

// Event Listeners 
nameButton.addEventListener("click", welcomeName);
// addTodo.addEventListener('click', addTodoList);
// document.addEventListener('DOMContentLoaded', getTodos);
window.onload = () => getTodos();
// todoUl.addEventListener('click', deleteTodoList);
nextButton.addEventListener('click', nextTodos)

// functions
// Getting your name
function welcomeName(e){
  e.preventDefault();
  let error = document.querySelector('.error-message');
  if(formName.value === ""){
    error.innerHTML = 'Please provide at least your name'
    setTimeout(() => {
      error.remove()
    }, 1000);
  }else{
    landingPage.classList.add('d-none');
    welcomePage.classList.remove('d-none');
    ownerName.innerHTML = formName.value.toUpperCase()
  }
}
// creating the todo div
const formSubmit = document.querySelector('#formSubmit');
formSubmit.onsubmit = function(x){
  x.preventDefault();
  welcomePage.classList.add('d-none');
  category.style.display = "block";
  if(todosInput.value === ""){
    alert('Please Enter a todo')
  }else{
    let todos = document.createElement('li');
    todos.classList.add('background-white');
  
    // ccreating todo span
    let todoSpan = document.createElement('span');
    todoSpan.innerHTML = todosInput.value;
    todos.appendChild(todoSpan);
    
    // Adding todo to local storage
    savetoLocalStorage(todosInput.value)
    // clearing input after submitting
    todosInput.value = "";
    
    // creating edit buttons
    let todoEdit = document.createElement('button');
    todoEdit.classList.add('btn-default')
    todoEdit.innerHTML = '<i class="fa fa-check"></i>'
    todos.appendChild(todoEdit);
    //creating delete
    let todoDelete= document.createElement('button');
    todoDelete.classList.add('btn-default');
    const getRandomId = () => Math.random() + "" + Date.now()
    const randomId  = getRandomId();
    todoDelete.innerHTML = `<i id="${randomId}" class="remove fa fa-trash"></i>`;
    const _trashEl = document.querySelector(`#${randomId}`);
    _trahEl.addEventListener('clicl', deleteTodoList);
    todos.appendChild(todoDelete);
    todoUl.appendChild(todos);
  }
}

// Deleting Todo
function deleteTodoList(e){
  let todostore = void 0;
  if(localStorage.getItem('todos') === null){
    todostore = [];
  }else{
    todostore = JSON.parse(localStorage.getItem('todos'));
  }
 let item = e.target;
 const parentEl = item.parentElement.parentElement;
 const textContent = parentEl.textContent
 const index = todostore.findIndex(todo => todo === textContent);
 todostore.splice(index, 1);
 localStorage.setItem("todos", JSON.stringify(todostore));
 parentEl.remove()
//  console.log(item);
 // if(item.classList[0] === 'remove'){
   // item.parentElement.parentElement.remove()
   // removeLocalStorage(todo);
 // }
}

function savetoLocalStorage(todo){
  let todostore;
  if(localStorage.getItem('todos') === null){
    todostore = [];
  }else{
    todostore = JSON.parse(localStorage.getItem('todos'));
  }
todostore.push(todo);
localStorage.setItem('todos', JSON.stringify(todostore));
}


function getTodos(){
  let todostore;
    if(localStorage.getItem('todos') === null){
      todostore = [];
    }else{
      todostore = JSON.parse(localStorage.getItem('todos'));
    }
    todostore.forEach((todo) => {
      let todos = document.createElement('li');
      todos.classList.add('background-white');
    
      // ccreating todo span
      let todoSpan = document.createElement('span');
      todoSpan.innerHTML = todo;
      todos.appendChild(todoSpan);
      
      // clearing input after submitting
      todosInput.value = "";
      
      // creating edit buttons
      let todoEdit = document.createElement('button');
      todoEdit.classList.add('btn-default')
      todoEdit.innerHTML = '<i class="fa fa-check"></i>'
      todos.appendChild(todoEdit);
      //creating delete
      let todoDelete= document.createElement('button');
      todoDelete.classList.add('btn-default')
      todoDelete.innerHTML = '<i class="remove fa fa-trash"></i>'
      todos.appendChild(todoDelete);
      todoUl.appendChild(todos);
  });
}

//removing todo from localstorage
// function removeLocalStorage(todo){
//   let todos;
//   if(localStorage.getItem('todos') === null){
//     todos = [];
//   }else{
//     todos = JSON.parse(localStorage.getItem('todos'));
//   }
  
// }


//adding the next button
function nextTodos(e){
  console.log(e);
  let todostore = void 0;
  if(localStorage.getItem('todos') === null){
    todostore = [];
  }else{
    todostore = JSON.parse(localStorage.getItem('todos'));
  }
  if(localStorage.todos && localStorage.todos.length && JSON.parse(localStorage.todos.length))  {
    welcomePage.classList.add('d-none');
    category.style.display = "block";
  }
  else alert('Please add a todo');
}