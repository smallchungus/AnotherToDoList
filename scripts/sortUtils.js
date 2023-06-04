//this file contains functions that are used to sort the tasks
export function sortTasks (order, taskList)
{
    let tasks = Array.from(taskList.children);

    tasks.sort(function(a, b) {
        let dateA = new Date(a.dataset.deadline);
        let dateB = new Date(b.dataset.deadline);

        console.log(`dateA: ${dateA}, dateB: ${dateB}`);

        if (isNaN(dateA) || isNaN(dateB)) {
            console.log("Invalid date detected.");
            return 0;
        }

        if (order === "asc") {
            return dateA - dateB; // ascending
        } else {
            return dateB - dateA; //descending
        }
    });
    console.log(tasks);
    while (taskList.firstChild){
        taskList.firstChild.remove();
    }

    for (let task of tasks) {
        taskList.appendChild(task);
    }
}