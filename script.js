const API_URL = "http://localhost:5000/tasks";

// Fetch tasks from server
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
}

// Add a new task
async function addTask() {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        taskInput.value = "";
        fetchTasks();
    }
}

// Delete task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

// Toggle complete status
async function toggleTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
    fetchTasks();
}

// Render tasks
function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask('${task._id}')">${task.text}</span>
            <button onclick="deleteTask('${task._id}')">❌</button>
        `;
        taskList.appendChild(li);
    });
}

// Load tasks on startup
fetchTasks();
