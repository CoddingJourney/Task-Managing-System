const tasks = [];
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", addTasks);
document.getElementById("searchInput").addEventListener("input", searchTasks);

//function to take input and store in an object
function addTasks(e) {
  e.preventDefault(); //to prevent form from submitting as default

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;
  const category = document.getElementById("category").value;
  const task = {
    title,
    description,
    deadline,
    priority,
    category,
    completed: false,
  };
  // console.log(task)

  tasks.push(task);
  displayTask(task);
  taskForm.reset();
  alert(title);
}

//function to display task
function displayTask(task) {
  const taskRow = document.createElement("tr"); //create an element tr
  taskRow.innerHTML = `
  <td>${task.title}</td>
  <td>${task.description}</td>
  <td>${task.deadline}</td>
  <td>${task.priority}</td>
  <td>${task.category}</td>
  <td>
  <button class="btn btn-success" onclick="markAsCompleted(this)">
  <i class="fa-solid fa-circle-check"></i>
  </button>
  </td>
  <td> <button class="btn btn-primary" onclick="editTask(this)">Edit</button> </td>
  <td>  <button class="btn btn-danger" onclick="deleteTask(this)">Delete</button> </td>
  `;
  taskList.append(taskRow);
}

//function to mark task as completed
function markAsCompleted(button) {
  const taskRow = button.parentElement.parentElement;
  taskRow.classList.toggle("completed");
  if (taskRow.classList == "completed") {
    button.style.color = "green";
    button.style.borderColor = "green";
  } else {
    button.style.color = "blue";
    button.style.borderColor = "blue";
  }
}

//function to edit task
function editTask(button) {
  const taskRow = button.parentElement.parentElement;
  const cells = taskRow.querySelectorAll("td");

  document.getElementById("title").value = cells[0].innerText;
  document.getElementById("description").value = cells[1].innerText;
  document.getElementById("deadline").value = cells[2].innerText;
  document.getElementById("priority").value = cells[3].innerText;
  document.getElementById("category").value = cells[4].innerText;

  taskList.removeChild(taskRow);
  alert("Are You Ready To Edit");
}

//function to delete task
function deleteTask(button) {
  const taskRow = button.parentElement.parentElement;
  taskList.removeChild(taskRow);
  alert("Are You Sure To Delete Task ");
}

//function to search task
function searchTasks() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const tasks = taskList.querySelectorAll("tr");

  tasks.forEach((task) => {
    const title = task.querySelector("td:nth-child(1)").innerText.toLowerCase();
    const description = task
      .querySelector("td:nth-child(2)")
      .innerText.toLowerCase();
    const deadline = task
      .querySelector("td:nth-child(3)")
      .innerText.toLowerCase();
    const priority = task
      .querySelector("td:nth-child(4)")
      .innerText.toLowerCase();
    const category = task
      .querySelector("td:nth-child(5)")
      .innerText.toLowerCase();

    if (
      title.includes(searchInput) ||
      description.includes(searchInput) ||
      deadline.includes(searchInput) ||
      priority.includes(searchInput) ||
      category.includes(searchInput)
    ) {
      task.style.display = "";
    } else {
      task.style.display = "none";
    }
  });
}
