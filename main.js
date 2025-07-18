let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let clearTasks = document.querySelector(".clear");
let time = document.querySelector(".time");
let tasksDiv = document.querySelector(".tasks");

// Empty array to store the tasks
let arrayOfTasks = [];

// check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// Trigger array to store the tasks
getDataFromLocalStorage();
// add tasks
submit.onclick = function () {
  if (input.value !== "") {
    addTasksToArray(input.value); //Add tasks to array
    input.value = ""; // Empty input value
  }
};

// Clear all tasks
clearTasks.onclick = function () {
  window.localStorage.clear();
  arrayOfTasks = [];
  tasksDiv.innerHTML = "";
};
// click on task element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove();
  }
  //   task element
  if (e.target.classList.contains("task")) {
    // toggle completed for the task
    toggleStateTaskWith(e.target.getAttribute("data-id"));
    // toggle done class
    e.target.classList.toggle("done");
  }
});

function addTasksToArray(TaskText) {
  // task data
  let now = new Date();
  const task = {
    id: Date.now(),
    title: TaskText,
    completed: false,
  };
  //   push tasks to array tasks
  arrayOfTasks.push(task);

  //   Add tasks to page
  addElementsToPageFrom(arrayOfTasks);
  // add data to local storage
  addTasksToLocalStorage(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty the tasks div
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    // check if task is done
    if (task.completed) {
      div.className = "tasks done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button to Main div
    div.appendChild(span);
    // Add tasks div to tasks container
    tasksDiv.appendChild(div);
  });
}

function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
}

function toggleStateTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}
