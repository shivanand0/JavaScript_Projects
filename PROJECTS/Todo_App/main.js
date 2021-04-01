let todoInput = document.querySelector('#todo_input');
let todoBtn = document.querySelector('#todo_btn');
let todoList = document.querySelector('#todo_list');

todoInput.onkeyup = () => {
    if ((todoInput.value).trim() != 0) { //if the user value isn't only spaces
        todoBtn.classList.add("active");
    } else {
        todoBtn.classList.remove("active"); //unactive the add button
    }
}

//call getTodos to get from localstorage after initial HTML document has completely loaded
document.addEventListener("DOMContentLoaded", getTodos);

todoBtn.addEventListener("click", addNote); //event listner to add todos

function addNote(event) {
    event.preventDefault(); //prevent from refsheing

    //div container- it'll contain our added notes
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("todo");

    //List items- actual added notes in the form of li
    const newNote = document.createElement("li");
    newNote.innerText = todoInput.value;
    newNote.classList.add("todo_items");
    noteDiv.appendChild(newNote);



    //delete-done buttons - to mark note as done or to delete a note
    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = '<i class="fas fa-check"></i>';
    doneBtn.classList.add("done_btn");
    noteDiv.appendChild(doneBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete_btn");
    noteDiv.appendChild(deleteBtn);

    //append div container to ul  i.e #todo_list
    todoList.classList.add("addedItem");
    todoList.appendChild(noteDiv);

    //Local storage
    //Add todo to localstorage
    saveLocalTodos(todoInput.value);

    //clear todoInput value
    todoInput.value = "";
}

//event listner for delete & check
todoList.addEventListener("click", deleteCheck);

function deleteCheck(e) {
    const deleteCheckItem = e.target;
    // console.log(deleteCheckItem);
    const todo = deleteCheckItem.parentElement;
    // console.log(todo);
    if (deleteCheckItem.classList[0] === "delete_btn") {

        todo.classList.add("dlt_anime")
        removeLocalTodos(todo);
        //when animation is completed then remove item
        todo.addEventListener("animationend", function() {
            todo.remove();
        });
    }

    if (deleteCheckItem.classList[0] === "done_btn") {

        todo.classList.toggle("completed_tasks");
    }

}

function removeLocalTodos(todo) { //todo = deleteCheckItem.parentElement, deleteCheckItem = e.target in deleteCheck() function
    //delete from localstorage
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //here we get todo string
    // console.log(todo.children[0].innerText);

    //now we get index of that string and remove it from localstorage array
    //The splice() method adds/removes items to/from an array, and returns the removed item(s).
    const todoIndex = todo.children[0].innerText;
    (todos.splice(todos.indexOf(todoIndex), 1));
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Localsotrage
function saveLocalTodos(todo) { //todo = todoInput.value
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//get todos from localstorage
function getTodos() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // console.log(todos);
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        //div container- it'll contain our added notes
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("todo");

        //List items- actual added notes in the form of li
        const newNote = document.createElement("li");
        newNote.innerText = todo;
        newNote.classList.add("todo_items");
        noteDiv.appendChild(newNote);



        //delete-done buttons - to mark note as done or to delete a note
        const doneBtn = document.createElement("button");
        doneBtn.innerHTML = '<i class="fas fa-check"></i>';
        doneBtn.classList.add("done_btn");
        noteDiv.appendChild(doneBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add("delete_btn");
        noteDiv.appendChild(deleteBtn);

        //append div container to ul  i.e #todo_list
        todoList.classList.add("addedItem");
        todoList.appendChild(noteDiv);

    }
}