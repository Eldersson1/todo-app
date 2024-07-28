document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.textContent = `${task.title} - ${task.category} - ${task.priority}`;
                if (task.completed) {
                    li.style.textDecoration = 'line-through';
                }
                li.onclick = () => toggleCompleted(index);
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const category = document.getElementById('task-category').value;
    const priority = document.getElementById('task-priority').value;

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, category, priority, completed: false })
    })
    .then(response => response.json())
    .then(task => {
        loadTasks();
        hideTaskModal();
    });
}

function toggleCompleted(taskId) {
    fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: true }) // Toggling to completed
    })
    .then(response => response.json())
    .then(task => {
        loadTasks();
    });
}

function filterTasks(category) {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.filter(task => category === 'all' || task.category === category)
                 .forEach((task, index) => {
                    const li = document.createElement('li');
                    li.textContent = `${task.title} - ${task.category} - ${task.priority}`;
                    if (task.completed) {
                        li.style.textDecoration = 'line-through';
                    }
                    li.onclick = () => toggleCompleted(index);
                    taskList.appendChild(li);
                });
        });
}

function showTaskModal() {
    document.getElementById('task-modal').style.display = 'flex';
}

function hideTaskModal() {
    document.getElementById('task-modal').style.display = 'none';
}
