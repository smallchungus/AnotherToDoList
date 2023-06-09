import { isValidDate } from '/scripts/datesUtils.js';
import { sortTasks, sortTasksByName} from '/scripts/sortUtils.js';

// get references to the HTML elements
const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput")
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const sortButton = document.getElementById("sortButton");
const sortByNameButton = document.getElementById("sortByNameButton");
const toggleCompletedButton = document.getElementById("toggleCompletedButton");
const filterDate = document.getElementById("filterDate");
const filterButton = document.getElementById("filterButton");


// set the initial sort order to asc order
let sortOrder = "asc"; //ascending order
let sortByNameOrder = "asc";

// add event listeners to the HTML elements
sortButton.addEventListener("click", function() {
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
    sortButton.innerText = sortOrder === "ascending" ? "Sort by Date: Descending" : "Sort by Date: Ascending";
    console.log(taskList);
    sortTasks(sortOrder, taskList);
});

sortByNameButton.addEventListener("click", function() {
    sortByNameOrder = sortByNameOrder === "asc" ? "desc" : "asc";
    sortByNameButton.innerText = sortByNameOrder === "ascending" ? "Sort by Name: Descending" : "Sort by Name: Ascending";
    console.log(taskList);
    sortTasksByName(sortByNameOrder, taskList);
});

// add an event listener to the new button
toggleCompletedButton.addEventListener("click", function() {
    // change the button text based on the current visibility of completed tasks
    if (toggleCompletedButton.textContent === "Hide Completed Tasks") {
        toggleCompletedButton.textContent = "Show Completed Tasks";
    } else {
        toggleCompletedButton.textContent = "Hide Completed Tasks";
    }

    // toggle the visibility of completed tasks
    const completedTasks = document.querySelectorAll(".completed");
    for (let i = 0; i < completedTasks.length; i++) {
        if (completedTasks[i].style.display === "none") {
            completedTasks[i].style.display = "block";
        } else {
            completedTasks[i].style.display = "none";
        }
    }
});


let isFiltered = false; // this variable will track the current state

// add an event listener to the new button
filterButton.addEventListener("click", function() {
    if(filterDate.value === '') {
        alert('Please select a date to filter by.');
        return;
    }
    if(isFiltered) {
        // if it's currently filtered, we just want to show all tasks again
        const taskItems = taskList.getElementsByTagName('li');
        for(let i = 0; i < taskItems.length; i++) {
            taskItems[i].style.display = "block";
        }
        filterButton.textContent = "Filter Tasks";
        isFiltered = false; // reset the state
    } else {
        // if it's not currently filtered, we want to apply the filter
        const selectedDate = new Date(filterDate.value);
        const taskItems = taskList.getElementsByTagName('li');

        for(let i = 0; i < taskItems.length; i++) {
            const taskDeadline = new Date(taskItems[i].dataset.deadline);

            // use setHours to ignore the time part of the dates
            if(selectedDate.setHours(0,0,0,0) === taskDeadline.setHours(0,0,0,0)) {
                taskItems[i].style.display = "block";
            } else {
                taskItems[i].style.display = "none";
            }
        }
        filterButton.textContent = "Show All Tasks";
        isFiltered = true; // update the state
    }
});

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

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
            li.classList.toggle("completed");

        });


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

        li.insertBefore(checkbox, li.firstChild); //insert the checkbox before the first child of the list item

        // append the task label, deadline label, and the delete button to the new list item.
        li.appendChild(taskLabel);
        li.appendChild(deadlineLabel);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        // reset the input fields to empty
        taskInput.value = "";
        deadlineInput.value = "";
        sortTasks(sortOrder, taskList);
        sortTasksByName(sortByNameOrder, taskList);
        deleteButton.addEventListener("click", deleteTask);

    }
}

// function to delete a task from the list
function deleteTask(event) {
    // stop event propagation
    event.stopPropagation();
    // check if the clicked element is a button
    if (event.target.tagName === "BUTTON") {
        // get the parent element (the list parent) of the clicked button
        const listItem = event.target.parentElement;
        // remove the list item from the list
        taskList.removeChild(listItem);
    }
}
