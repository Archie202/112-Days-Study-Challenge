// JavaScript code to handle marking tasks as completed
document.addEventListener("DOMContentLoaded", function () {
    // Check and apply previously saved tasks from local storage
    applySavedTasks();
});

function filterTasks() {
    const selectedRange = document.getElementById("date-range").value;
    const tasks = document.querySelectorAll("li"); // Assuming all tasks are <li> elements

    tasks.forEach(task => {
        const taskDate = task.querySelector(".date").textContent; // Get the date from the task
        const isVisible = isTaskInRange(taskDate, selectedRange);
        task.style.display = isVisible ? "list-item" : "none";
    });
}

function showTasks() {
    // Hide all month sections
    const months = document.querySelectorAll('.month');
    months.forEach(month => {
        month.style.display = 'none';
    });

    // Get the selected value
    const selectedRange = document.getElementById('date-range').value;

    // Show the corresponding tasks based on selection
    if (selectedRange) {
        const selectedMonth = document.getElementById(selectedRange);
        selectedMonth.style.display = 'block';

        // Also show the task display section
        document.getElementById('task-display').style.display = 'block';
    } else {
        document.getElementById('task-display').style.display = 'none';
    }
}

    function markTaskCompleted(taskId) {
        const task = document.getElementById(taskId);

        // Check if the task is already marked as completed
        if (task.classList.contains('completed')) return;

        // Add a completed class to the task
        task.classList.add('completed');

        // Hide the buttons for "Completed" and "Failed"
        const button = task.querySelector('button');
        button.style.display = 'none';

        // Optionally, store the completion in localStorage to keep it after reload
        localStorage.setItem(taskId, 'completed');
    }

    // Check the tasks' completion status on page load
    document.addEventListener('DOMContentLoaded', function() {
        const taskItems = document.querySelectorAll('li[id^="task-"]');
        taskItems.forEach(task => {
            const taskId = task.id;
            const isCompleted = localStorage.getItem(taskId) === 'completed';
            if (isCompleted) {
                task.classList.add('completed');
                const button = task.querySelector('button');
                button.style.display = 'none';
            }
        });
    });

// Save task status to localStorage
function saveTaskStatus(taskId, isCompleted) {
    localStorage.setItem(taskId, isCompleted ? 'completed' : 'incomplete');
}

// Apply saved tasks (check localStorage for task status)
function applySavedTasks() {
    const allTasks = document.querySelectorAll('li');
    allTasks.forEach(task => {
        const taskId = task.id;
        const savedStatus = localStorage.getItem(taskId);
        if (savedStatus === 'completed') {
            task.classList.add('completed');
        }
    });
}
