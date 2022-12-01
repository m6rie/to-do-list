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




    // if the user tries to add an empty task the page throw an alert
    const userInpt = document.querySelector("#To-Do-Container__form--input")

    if(userInpt.value === ""){
      alert("Please enter a task")
    } else {
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

        // tells the browser to not proceed as normal if the event is not handled
        ev.preventDefault()
  }
  })
  displayToDos()
})

// READ
function displayToDos() {
  const completeList = document.querySelector(".To-Do-Container__list")
  completeList.innerHTML = ""

  const listTitle = document.createElement("h3")
  listTitle.classList.add("To-Do-Container__list--title")
  listTitle.innerHTML = `My List`
  completeList.appendChild(listTitle)

  // removing the title if the list is empty
  if(todos == "") {
    listTitle.classList.add("hidden")
  } else {
    listTitle.classList.remove("hidden")
  }


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
    editBtn.innerHTML = `<img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ_CRMxPAGEZjoE2qnd5Hc4dxxE1-mIJTuULJbQa3dN_PgoXK5z">`
    deleteBtn.innerHTML = `<img src="https://static.vecteezy.com/system/resources/previews/007/873/345/original/trash-can-icon-logo-illustration-suitable-for-web-design-logo-application-free-vector.jpg">`

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

      // generating a global variable 'item'
      item = itemDiv.querySelector("input")

      if(todo.done) {
        item.classList.add("done")
      } else {
        item.classList.remove("done")
      }
    })

    // UPDATE
    editBtn.addEventListener("click", function(e){
      item = itemDiv.querySelector("input")
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
      if(confirm("Are you sure you want to delete this task?")) {
        todos = todos.filter(td => td != todo)
        localStorage.setItem("todos", JSON.stringify(todos))
        displayToDos()
      }
    })
  })
}
