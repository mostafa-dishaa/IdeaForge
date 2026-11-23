
// ================================
// 1. DOM Elements
// ================================

let searchInput = document.getElementById("project-search");

let notificationBtn = document.getElementById("notification-btn");
let notificationDropdown = document.getElementById("notification-dropdown");
let notificationCount = document.querySelector(".notification-count");

let totalProjectsCount = document.querySelector(".total-projects");
let inProgressCount = document.querySelector(".in-progress-count");
let completedCount = document.querySelector(".completed-count");

let projectsList = document.getElementById("projects-list");


// ================================
// 2. Notifications
// ================================

notificationCount.textContent = document.querySelectorAll(".notification-item").length;

notificationBtn.addEventListener("click", function () {
    notificationDropdown.classList.toggle("active");
});

document.addEventListener("click", function (event) {
    if (!event.target.closest(".notification-wrapper")) {
        notificationDropdown.classList.remove("active");
    }
});


// ================================
// 3. Projects Data
// ================================

let projects = [
    {
        name: "Online Store",
        category: "Business & E-commerce",
        status: "in-progress",
        createdAt: "2026-10-28"
    },
    {
        name: "Mobile Application",
        category: "Technology & Apps",
        status: "completed",
        createdAt: "2026-10-25"
    },
    {
        name: "Online Learning Platform",
        category: "Education",
        status: "in-progress",
        createdAt: "2026-10-22"
    }
];


// ================================
// 4. Display Projects
// ================================

function displayProjects(projectsToDisplay) {

    projectsList.innerHTML = "";

    projectsToDisplay.forEach(function (project) {

        let projectItem = document.createElement("div");

        projectItem.className = "project-item";

        let projectDate = new Date(project.createdAt + "T00:00:00");

        let formattedDate = projectDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

        projectItem.innerHTML = `
            <div class="project-info">
                <div class="project-icon blue">
                    <i class="fa-solid fa-folder"></i>
                </div>

                <div>
                    <h3>${project.name}</h3>
                    <p>${project.category}</p>
                </div>
            </div>

            <span class="project-status ${project.status}">
                ${project.status === "completed" ? "Completed" : "In Progress"}
            </span>

            <span class="project-date">${formattedDate}</span>
        `;

        projectsList.appendChild(projectItem);

    });

}


// ================================
// 5. Search Projects
// ================================

searchInput.addEventListener("input", function () {

    let searchValue = searchInput.value.toLowerCase().trim();

    let filteredProjects = projects.filter(function (project) {

        let projectName = project.name.toLowerCase();
        let projectCategory = project.category.toLowerCase();

        return projectName.includes(searchValue) ||
               projectCategory.includes(searchValue);

    });

    displayProjects(filteredProjects);

});


// ================================
// 6. Update Statistics
// ================================

function updateStatistics() {

    totalProjectsCount.textContent = projects.length;

    inProgressCount.textContent = projects.filter(function (project) {
        return project.status === "in-progress";
    }).length;

    completedCount.textContent = projects.filter(function (project) {
        return project.status === "completed";
    }).length;

}


// ================================
// 7. Initialize Dashboard
// ================================

projects.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
});

displayProjects(projects);

updateStatistics();
