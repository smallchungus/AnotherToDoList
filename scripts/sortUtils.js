export function sortTasks(order, taskList) {
    let tasks = Array.from(taskList.children);

    tasks.sort(function(a, b) {
        let dateA = new Date(a.dataset.deadline);
        let dateB = new Date(b.dataset.deadline);

        if (isNaN(dateA) || isNaN(dateB)) {
            console.log("Invalid date detected.");
            return 0;
        }

        if (order === "asc") {
            return dateA - dateB; // ascending
        } else {
            return dateB - dateA; // descending
        }
    });

    while (taskList.firstChild) {
        taskList.firstChild.remove();
    }

    for (let task of tasks) {
        taskList.appendChild(task);
    }
}

export function sortTasksByName(order, taskList) {
    let tasks = Array.from(taskList.children);

    tasks.sort(function(a, b) {
        let taskNameA = a.querySelector("span").innerText.toLowerCase();
        let taskNameB = b.querySelector("span").innerText.toLowerCase();

        if (order === "asc") {
            if (taskNameA < taskNameB) {
                return -1;
            } else if (taskNameA > taskNameB) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (taskNameA < taskNameB) {
                return 1;
            } else if (taskNameA > taskNameB) {
                return -1;
            } else {
                return 0;
            }
        }
    });

    while (taskList.firstChild) {
        taskList.firstChild.remove();
    }

    for (let task of tasks) {
        taskList.appendChild(task);
    }
}