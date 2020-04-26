//Elementleri Seçmek

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoFilter = document.querySelector("#todo-filter");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const todoList = document.querySelector(".list-group")

//
eventListeners();

function eventListeners() {
    todoForm.addEventListener("submit", addTodo);
    window.addEventListener("DOMContentLoaded", loadItemsFromStorage);


}

function addTodo(e) {
    const todo = todoInput.value.trim();

    if (todo === "") {
        showAlert("danger", "Lütfen geçerli bir Todo giriniz!");
    } else {
        if(!control(todo)){

            addTodoToUI(todo);
            addTodoToStorage(todo);
            showAlert("success", "Todo Başarıyla Eklendi!");
        }else{
            showAlert("info", "Ekleyeceğiniz Todo Zaten Eklenmiş!");
        }
        
        

    }

    e.preventDefault();
}

function control(newTodo) {
    let todos = getTodosFromStorage();
    isHave = false;
    todos.forEach(function (todo) {
        if (todo === newTodo) {
            isHave = true;
        }
    });
    return isHave;

}
function addTodoToStorage(todo) {
    if (todo != "") {
        let todos = getTodosFromStorage();
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
       
        
    }
}

function loadItemsFromStorage() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        
        addTodoToUI(todo);
    })
}
function showAlert(type, message) {
    //Creating alert div
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    //Adding alert to firstCardBody


    firstCardBody.appendChild(alert);

    setTimeout(function () {
        alert.remove();
    }, 1500);
}

function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    return todos;
}
function addTodoToUI(newTodo) {


    //     <li class="list-group-item d-flex justify-content-between">Todo1
    //     <a href="#" class="delete-item"><i class="fa fa-remove"></i></a>
    // </li>
    //Creating listItem
    
        let listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between";
        //Adding Text
        listItem.appendChild(document.createTextNode(newTodo));

        //Creating listLink
        let listLink = document.createElement("a");
        listLink.href = "#";
        listLink.className = "delete-item";
        listLink.innerHTML = "<i class='fa fa-remove'></i>";

        //Adding link to item
        listItem.appendChild(listLink);
        //Adding item to list
        todoList.insertBefore(listItem, todoList.firstChild);
    
   


}
