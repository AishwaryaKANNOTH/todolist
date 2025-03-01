document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const filterBtns = document.querySelectorAll(".filter-btn");

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", modifyTask);
filterBtns.forEach(btn => btn.addEventListener("click", filterTasks));

const quotes = [
    "A little progress each day adds up to big results.",
    "Your future is created by what you do today, not tomorrow.",
    "Dream big, start small, act now."
];

// Select the quote element and update it with a random quote
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
});
// Dark Mode Toggle
const toggleBtn = document.getElementById("theme-toggle");

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");

    // Save mode in localStorage
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");

    // Update button text
    updateDarkModeButton();
}

// Function to update button text based on dark mode state
function updateDarkModeButton() {
    if (document.body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "☀ Light Mode";
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
    }
}

// Load user's theme preference
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    updateDarkModeButton();
});

// Event Listener for Toggle Button
toggleBtn.addEventListener("click", toggleDarkMode);


// Load user preference
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});


// Load tasks from Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    
    addTaskToDOM(taskText, false);
    saveTask(taskText, false);
    
    taskInput.value = "";
}

// Add task to DOM
function addTaskToDOM(text, completed) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="${completed ? 'completed' : ''}">${text}</span>
        <div>
            <button class="complete-btn">✔️</button>
            <button class="delete-btn">❌</button>
        </div>
    `;
    if (completed) li.classList.add("completed");
    taskList.appendChild(li);
}

// Modify task (mark as completed or delete)
function modifyTask(e) {
    const taskItem = e.target.closest("li");
    if (!taskItem) return;

    const taskText = taskItem.querySelector("span").innerText;

    if (e.target.classList.contains("complete-btn")) {
        taskItem.classList.toggle("completed");
        taskItem.querySelector("span").classList.toggle("completed");
        updateTaskStatus(taskText);
    } 
    else if (e.target.classList.contains("delete-btn")) {
        taskItem.remove();
        removeTask(taskText);
    }
}

// Save task to Local Storage
function saveTask(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task status in Local Storage
function updateTaskStatus(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.map(task => task.text === text ? { ...task, completed: !task.completed } : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from Local Storage
function removeTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter tasks
function filterTasks(e) {
    const filter = e.target.getAttribute("data-filter");
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    document.querySelectorAll("li").forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "pending":
                task.style.display = !task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}
