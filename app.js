// get references to the HTML elements
const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput")
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

//add event listeners to the HTML elements
addButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);

//funciton to add task to the list
function addTask() {
    // get the task text and the deadline text
    const taskText = taskInput.value.trim();
    const deadlineText = deadlineInput.value.trim();

    // check if the task text is not empty
    if (taskText !== "") {
        //create a new list item
        const li = document.createElement("li");

        //create a new label for the new task list item
        const taskLabel = document.createElement("span");
        taskLabel.innerText = taskText;

        //create a new span element for the deadline
        const deadlineLabel = document.createElement("span");
        deadlineLabel.innerText = "Deadline: " + deadlineText;

        // create a delete button for the new task list item
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        // append the task label, deadline label, and the delete button to the new list item.
        li.appendChild(taskLabel);
        li.appendChild(deadlineInput);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        // reset the input fields to empty
        taskInput.value = "";
        deadlineInput.value = "";
    }
}

function deleteTask(event) {
    if (event.target.tagName === "BUTTON") {
        const listItem = event.target.parentElement;
        taskList.removeChild(listItem);
    }
}

function formatDate ( dateString ) {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}