const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerText = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        li.append(deleteButton);
        taskList.appendChild(li);
        taskInput.value = "";

    }
}

function deleteTask(event) {
    if (event.target.tagName === "BUTTON") {
        const listItem = event.target.parentElement;
        taskList.removeChild(listItem);
    }
}