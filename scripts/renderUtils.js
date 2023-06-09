function renderTasks(taskList, tasks) {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => toggleTask(index));

        const text = document.createElement('span');
        text.innerText = task.text;
        text.style.textDecoration = task.done ? 'line-through' : 'none';

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => removeTask(index));

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

// Export the function
export { renderTasks };
