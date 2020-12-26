// Tüm elementleri seçme

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListers();

function eventListers() { // Tüm event listenerlar
  
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if (confirm("Tüm taskları silmek isteğinize emin misiniz?")){
        // Arayüzden todoları silmek
        todoList.innerHTML = "";
    }

    localStorage.removeItem("todos");

}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue) === -1){
            // Bulamadı demektir
            listItem.setAttribute("style","display : none !important"); // Boostrap özelliğini bastırır
        }
        else {
            listItem.setAttribute("style","display: block");
        }
    })
}


function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("warning","Todo başarıyla silindi");
    }

}


function deleteTodoFromStorage(deletetodo){

let todos = getTodosFromStorage();

todos.forEach(function(todo,index){
    if (todo === deletetodo) {
        todos.splice(index,1); // Aray değeri silinir
    }
})

localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim();

    if (newTodo === ""){
      /*<div class="alert alert-danger" role="alert">
                        A simple danger alert—check it out!
                      </div> */
                      showAlert("danger","Lütfen bir todo giriniz");
    }
    
    else{
         addTodoToUI(newTodo);
         addTodoToStorage(newTodo);
         showAlert("success","Todo eklendi")
    }
  
    e.preventDefault();
}

function getTodosFromStorage(){
     let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo){
   let todos = getTodosFromStorage();

   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));
}



function showAlert(type,message){
    const alert = document.createElement("div");
    
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    firstCardBody.appendChild(alert);
    
    setTimeout(function(){  // setTimeout kullanarak 2 saniye ekranda alert yazısını bastırmış olduk
        alert.remove();
    },2000);
}


function addTodoToUI(newTodo) { // Aldığı string değerini list-item olarak UI' ya ekler

/*<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */

 //list item oluşturma

const listItem = document.createElement("li");

// link oluşturma
const link = document.createElement("a");
link.href = "#"
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>"

listItem.className = "list-group-item d-flex justify-content-between";

// Text Node ekleme

listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);
todoList.appendChild(listItem);

todoInput.value = "";
}


