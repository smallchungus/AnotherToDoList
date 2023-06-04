import { isValidDate } from '/scripts/datesUtils.js';
// get references to the HTML elements
const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput")
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// add event listeners to the HTML elements
addButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);

// function to add task to the list
function addTask() {
    // get the task text and the deadline text
    const taskText = taskInput.value.trim();
    const deadlineText = deadlineInput.value.trim();

    // check if the task text is not empty
    if (taskText !== "" && isValidDate(deadlineText)) {
        // create a new list item
        const li = document.createElement("li");

        // create a new label for the new task list item
        const taskLabel = document.createElement("span");
        taskLabel.innerText = taskText;

        // create a new span element for the deadline
        const deadlineLabel = document.createElement("span");
        deadlineLabel.innerText = "Deadline: " + deadlineText;

        // create a delete button for the new task list item
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        li.dataset.deadline = deadlineText;

        // append the task label, deadline label, and the delete button to the new list item.
        li.appendChild(taskLabel);
        li.appendChild(deadlineLabel);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        // reset the input fields to empty
        taskInput.value = "";
        deadlineInput.value = "";

        deleteButton.addEventListener("click", deleteTask);
    }
}

// function to delete a task from the list
function deleteTask(event) {
    // check if the clicked element is a button
    if (event.target.tagName === "BUTTON") {
        // get the parent element (the list parent) of the clicked button
        const listItem = event.target.parentElement;
        // remove the list item from the list
        taskList.removeChild(listItem);
    }
}
