let tasks = [];

document.addEventListener("DOMContentLoaded", loadTasks);

// ADD TASK
function addTask() {
    let text = document.getElementById("taskInput").value.trim();
    let date = document.getElementById("dueDate").value;

    if (text === "") return;

    let task = {
        text: text,
        due: date,
        completed: false
    };

    tasks.push(task);
    updateStorage();
    renderTasks(tasks);

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
}

// RENDER
function renderTasks(taskArray) {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    taskArray.forEach(task => {
        let li = document.createElement("li");

        let row = document.createElement("div");
        row.className = "task-row";

        let text = document.createElement("span");
        text.textContent = task.text;

        if (task.completed) {
            text.style.textDecoration = "line-through";
            text.style.color = "gray";
        }

        text.onclick = () => {
            task.completed = !task.completed;
            updateStorage();
            renderTasks(tasks);
        };

        let del = document.createElement("button");
        del.textContent = "❌";
        del.onclick = () => {
            tasks = tasks.filter(t => t !== task);
            updateStorage();
            renderTasks(tasks);
        };

        row.appendChild(text);
        row.appendChild(del);

        let date = document.createElement("small");
        date.textContent = task.due ? "Due: " + task.due : "";

        li.appendChild(row);
        li.appendChild(date);
        list.appendChild(li);
    });

    updateCounter();
}

// STORAGE
function updateStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(tasks);
}

// FILTER
function filterTasks(type) {
    if (type === "completed") {
        renderTasks(tasks.filter(t => t.completed));
    } else if (type === "pending") {
        renderTasks(tasks.filter(t => !t.completed));
    } else {
        renderTasks(tasks);
    }
}

// SEARCH
function searchTasks() {
    let query = document.getElementById("search").value.toLowerCase();
    let filtered = tasks.filter(t => t.text.toLowerCase().includes(query));
    renderTasks(filtered);
}

// COUNTER
function updateCounter() {
    let total = tasks.length;
    let completed = tasks.filter(t => t.completed).length;

    document.getElementById("counter").textContent =
        `Total: ${total} | Completed: ${completed}`;
}

// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}