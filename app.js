// DARK MODE
const darkModeButton = document.querySelector(".Header__switch__slider")

darkModeButton.addEventListener("click", darkMode)

function darkMode() {
  const element = document.body;
  element.classList.toggle("dark-mode");
}

// GET TODAY'S DATE
const headerDate = document.querySelector(".Header__date")
const today = new Date()
const now = new Date
headerDate.innerHTML = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(today);


window.addEventListener("load", function(ev) {
  todos = JSON.parse(this.localStorage.getItem("todos")) || [] // will return an empty array if JSON.parse doesn't find the data
  const toDoForm = document.querySelector("#To-Do-Container__form")

  // CREATE
  toDoForm.addEventListener("submit", function(ev){
    // tells the browser to not proceed as normal if the event is not handled
    ev.preventDefault()

    // my task object (task, its status, and date it was created)
    const todo = {
      forminput: ev.target.elements.forminput.value,
      done: false,
      createdAt: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(today)
    }

    todos.push(todo);

    // add the todos array with the lastest element to localStorage
    localStorage.setItem("todos", JSON.stringify(todos))

    // empty input field
    ev.target.reset()

    displayToDos()
  })
  displayToDos()
})

// READ
function displayToDos() {
  const completeList = document.querySelector(".To-Do-Container__list")
  completeList.innerHTML = ""

  todos.forEach(todo => {
    // updating the DOM by adding elements and styling when a new task is created
    const listItem = document.createElement("div")
    listItem.classList.add("To-Do-Container__list--list-item")

    const checkboxLabel = document.createElement("label")
    const checkboxItem = document.createElement("input")
    const itemDiv = document.createElement("div")
    const actionsDiv = document.createElement("div")
    const editBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")

    checkboxItem.type = "checkbox"
    checkboxItem.checked = todo.done

    checkboxItem.classList.add("To-Do-Container__list--list-item--checkbox")
    itemDiv.classList.add("To-Do-Container__list--list-item--item")
    actionsDiv.classList.add("To-Do-Container__list--list-item--actions")
    editBtn.classList.add("To-Do-Container__list--list-item--actions--edit")
    deleteBtn.classList.add("To-Do-Container__list--list-item--actions--delete")

    itemDiv.innerHTML = `<input type="text" value="${todo.forminput}" readonly>`
    editBtn.innerHTML = "Edit"
    deleteBtn.innerHTML = "Delete"

    checkboxLabel.appendChild(checkboxItem)
    actionsDiv.appendChild(editBtn)
    actionsDiv.appendChild(deleteBtn)

    listItem.appendChild(checkboxLabel)
    listItem.appendChild(itemDiv)
    listItem.appendChild(actionsDiv)

    completeList.appendChild(listItem)

    // Changing the status of finished tasks and adding a CSS class to the div
    checkboxItem.addEventListener("change", function(e){
      todo.done = e.target.checked
      localStorage.setItem("todos", JSON.stringify(todos))

      if(todo.done) {
        itemDiv.classList.add("done")
      } else {
        itemDiv.classList.remove("done")
      }
    })

    // UPDATE
    editBtn.addEventListener("click", function(e){
      const item = itemDiv.querySelector("input")
      item.removeAttribute("readonly")
      item.focus()

      item.addEventListener("blur", function (ev) {
        item.setAttribute("readonly", true)
        todo.forminput = ev.target.value
        localStorage.setItem("todos", JSON.stringify(todos))
        displayToDos()
      })
    })

    // DELETE
    deleteBtn.addEventListener("click", function(e){
      todos = todos.filter(td => td != todo)
      localStorage.setItem("todos", JSON.stringify(todos))
      displayToDos()
    })
  })
}
