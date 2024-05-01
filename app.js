const todoAddinput = document.querySelector("#todoAddİnput")
const todoSearchİnput = document.querySelector("#todoSearchİnput")
const todosUI = document.querySelector(".todos")
let todos = [];
todoAddinput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        if (todoAddinput.value != "") {
            let value = todoAddinput.value
            todoAddUI(value)
            todoAddStorage(value)
        } else {
            alert("Boş Todo Ekleyemezsiniz")
        }
        todoAddinput.value = ""
    }
})
todoSearchİnput.addEventListener("keyup", () => {
    let todos = document.querySelectorAll(".todo")
    todos.forEach((todo) => {
        if (todo.textContent.toLowerCase().includes(document.querySelector("#todoSearchİnput").value.toLowerCase())) {
            todo.setAttribute("style", "display : block ")
        } else {
            todo.setAttribute("style", "display : none ")
        }
    })
})
todosUI.addEventListener("click", (e) => {
    if (e.target.className == "fa-solid fa-circle-xmark") {
        let todo = e.target.parentElement
        todo.remove()
        storageDeleteTodo(todo)
    }
})
function storageDeleteTodo(text) {
    storageCheck()
    let indeks = todos.indexOf(text.textContent)
    todos.splice(indeks, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}
document.addEventListener("DOMContentLoaded", () => {
    storageCheck()
    if (todos != null) {
        todos.forEach((todo) => {
            todoAddUI(todo)
        })
    }
})
function storageCheck() {
    if (JSON.parse(localStorage.getItem("todos")) != null) {
        todos = JSON.parse(localStorage.getItem("todos"))
    } else {
        todos = []
    }
}
function todoAddStorage(value) {
    storageCheck()
    todos.push(value)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function todoAddUI(value) {
    let i = document.createElement("i")
    let p = document.createElement("p")
    let div = document.createElement("div")

    i.classList = "fa-solid fa-circle-xmark"
    p.classList = "todoP"
    div.classList = "todo"
    p.textContent = value
    div.appendChild(i)
    div.appendChild(p)
    todosUI.appendChild(div)
}