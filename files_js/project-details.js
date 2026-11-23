
// ========================================
// 1. Select Elements
// ========================================

const taskFilters = document.querySelectorAll(".task-filter");
const tasksList = document.querySelector(".tasks-list");

const addTaskBtn = document.querySelector(".add-task-btn");
const viewAllTasksBtn = document.querySelector(".view-all-tasks-btn");

const projectNotes = document.querySelector(".project-notes");
const saveNotesBtn = document.querySelector(".save-notes-btn");

const addResourceBtn = document.querySelector(".add-resource-btn");

const editProjectBtn = document.querySelector(".edit-project-btn");
const moreOptionsBtn = document.querySelector(".more-options-btn");


// ========================================
// 2. Task Filters
// ========================================

taskFilters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        taskFilters.forEach(function (btn) {
            btn.classList.remove("active");
        });

        filter.classList.add("active");

        const selectedFilter = filter.dataset.filter;

        const taskItems = document.querySelectorAll(".task-item");

        taskItems.forEach(function (task) {

            if (
                selectedFilter === "all" ||
                task.dataset.status === selectedFilter
            ) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }

        });

    });

});


// ========================================
// 3. Update Task Statistics
// ========================================

function updateTaskStatistics() {

    const taskItems = document.querySelectorAll(".task-item");

    const totalTasks = taskItems.length;

    const completedTasks = document.querySelectorAll(
        '.task-item[data-status="completed"]'
    ).length;

    const progressTasks = document.querySelectorAll(
        '.task-item[data-status="in-progress"]'
    ).length;

    const pendingTasks = document.querySelectorAll(
        '.task-item[data-status="pending"]'
    ).length;

    const remainingTasks = totalTasks - completedTasks;

    const percentage = totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);


    // Update Statistics Cards

    const statNumbers = document.querySelectorAll(".stat-info h2");

    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = percentage + "%";
        statNumbers[1].textContent = totalTasks;
        statNumbers[2].textContent = completedTasks;
    }


    // Update Progress Bar

    const progressBar = document.querySelector(".progress-bar");
    const progressPercentage = document.querySelector(".progress-percentage");

    if (progressBar) {
        progressBar.style.width = percentage + "%";
    }

    if (progressPercentage) {
        progressPercentage.textContent = percentage + "% Completed";
    }


    // Update Progress Footer

    const progressFooter = document.querySelectorAll(".progress-footer span");

    if (progressFooter.length >= 2) {
        progressFooter[0].textContent =
            completedTasks + " of " + totalTasks + " tasks completed";

        progressFooter[1].textContent =
            remainingTasks + " tasks remaining";
    }


    // Update Filter Numbers

    const filterCounts = {
        all: totalTasks,
        completed: completedTasks,
        "in-progress": progressTasks,
        pending: pendingTasks
    };

    taskFilters.forEach(function (filter) {

        const count = filter.querySelector("span");

        if (count) {
            count.textContent = filterCounts[filter.dataset.filter];
        }

    });

}


// ========================================
// 4. Change Task Status
// ========================================

function updateTaskStatus(task) {

    const currentStatus = task.dataset.status;

    const nextStatus = currentStatus === "completed"
        ? "pending"
        : "completed";

    task.dataset.status = nextStatus;

    task.classList.remove("completed", "in-progress", "pending");
    task.classList.add(nextStatus);


    const checkbox = task.querySelector(".task-checkbox");
    const status = task.querySelector(".task-status");

    if (nextStatus === "completed") {

        checkbox.innerHTML = '<i class="fa-solid fa-check"></i>';

        status.textContent = "Completed";
        status.className = "task-status completed-status";

    } else {

        checkbox.innerHTML = '<i class="fa-regular fa-circle"></i>';

        status.textContent = "Pending";
        status.className = "task-status pending-status";

    }

    updateTaskStatistics();

}


// ========================================
// 5. Task Click Events
// ========================================

tasksList.addEventListener("click", function (event) {

    const checkbox = event.target.closest(".task-checkbox");

    if (checkbox) {

        const task = checkbox.closest(".task-item");

        updateTaskStatus(task);

    }


    // Delete Task

    const moreBtn = event.target.closest(".task-more-btn");

    if (moreBtn) {

        const task = moreBtn.closest(".task-item");

        const confirmDelete = confirm(
            "Are you sure you want to delete this task?"
        );

        if (confirmDelete) {
            task.remove();
            updateTaskStatistics();
        }

    }

});


// ========================================
// 6. Add New Task
// ========================================

addTaskBtn.addEventListener("click", function () {

    const taskName = prompt("Enter Task Name:");

    if (!taskName || taskName.trim() === "") {
        return;
    }

    const taskDescription = prompt("Enter Task Description:") || "";

    const newTask = document.createElement("div");

    newTask.className = "task-item pending";
    newTask.dataset.status = "pending";

    newTask.innerHTML = `
        <div class="task-checkbox">
            <i class="fa-regular fa-circle"></i>
        </div>

        <div class="task-info">
            <h3>${escapeHTML(taskName.trim())}</h3>
            <p>${escapeHTML(taskDescription.trim())}</p>
        </div>

        <span class="task-status pending-status">Pending</span>

        <button class="task-more-btn" type="button">
            <i class="fa-solid fa-ellipsis"></i>
        </button>
    `;

    tasksList.appendChild(newTask);

    updateTaskStatistics();

});


// ========================================
// 7. Escape HTML
// ========================================

function escapeHTML(value) {

    const element = document.createElement("div");

    element.textContent = value;

    return element.innerHTML;

}


// ========================================
// 8. View All Tasks
// ========================================

viewAllTasksBtn.addEventListener("click", function () {

    taskFilters.forEach(function (filter) {

        filter.classList.remove("active");

        if (filter.dataset.filter === "all") {
            filter.classList.add("active");
        }

    });

    document.querySelectorAll(".task-item").forEach(function (task) {
        task.style.display = "flex";
    });

});


// ========================================
// 9. Save Project Notes
// ========================================

const savedNotes = localStorage.getItem("projectDetailsNotes");

if (savedNotes !== null) {
    projectNotes.value = savedNotes;
}

saveNotesBtn.addEventListener("click", function () {

    localStorage.setItem(
        "projectDetailsNotes",
        projectNotes.value
    );

    alert("Your notes have been saved successfully!");

});


// ========================================
// 10. Add New Resource
// ========================================

addResourceBtn.addEventListener("click", function () {

    const resourceName = prompt("Enter Resource Name:");

    if (!resourceName || resourceName.trim() === "") {
        return;
    }

    const resourceDescription = prompt("Enter Resource Description:") || "";

    const resourcesGrid = document.querySelector(".resources-grid");

    const resourceCard = document.createElement("div");

    resourceCard.className = "resource-card";

    resourceCard.innerHTML = `
        <div class="resource-icon">
            <i class="fa-solid fa-link"></i>
        </div>

        <div class="resource-info">
            <h3>${escapeHTML(resourceName.trim())}</h3>
            <p>${escapeHTML(resourceDescription.trim())}</p>
        </div>

        <i class="fa-solid fa-arrow-up-right-from-square resource-link"></i>
    `;

    resourcesGrid.appendChild(resourceCard);

});


// ========================================
// 11. Edit Project
// ========================================

editProjectBtn.addEventListener("click", function () {

    const projectTitle = document.querySelector(".project-hero h1");
    const projectDescription = document.querySelector(".project-hero-content p");

    const newTitle = prompt("Edit Project Name:", projectTitle.textContent);

    if (newTitle && newTitle.trim() !== "") {
        projectTitle.textContent = newTitle.trim();
    }

    const newDescription = prompt(
        "Edit Project Description:",
        projectDescription.textContent
    );

    if (newDescription !== null && newDescription.trim() !== "") {
        projectDescription.textContent = newDescription.trim();
    }

});


// ========================================
// 12. More Options
// ========================================

moreOptionsBtn.addEventListener("click", function () {

    alert("More project options will be available soon.");

});


// ========================================
// 13. Initial Update
// ========================================

updateTaskStatistics();
