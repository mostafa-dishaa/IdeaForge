
// ========================================
// 1. Notifications Elements
// ========================================

const notificationBtn = document.getElementById("notificationBtn");
const notificationDropdown = document.getElementById("notificationDropdown");


// ========================================
// 2. Toggle Notifications
// ========================================

notificationBtn.addEventListener("click", function () {
    notificationDropdown.classList.toggle("show");
});


// ========================================
// 3. Close Notifications When Clicking Outside
// ========================================

document.addEventListener("click", function (event) {

    if (!event.target.closest(".notification-wrapper")) {
        notificationDropdown.classList.remove("show");
    }

});


// ========================================
// 4. Theme Toggle
// ========================================

const themeToggle = document.getElementById("themeToggle");

// Load Saved Theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Toggle Theme
themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';

    }

});


// ========================================
// 5. Search & Filter Elements
// ========================================

const projectSearch = document.getElementById("projectSearch");
const clearSearchBtn = document.getElementById("clearSearch");

let projectCards = document.querySelectorAll(".project-card");

const filterButtons = document.querySelectorAll(".filter-btn");
const projectSort = document.getElementById("projectSort");

const projectsGrid = document.querySelector(".projects-grid");


// Save Original Order
const originalOrder = Array.from(projectCards);

// Current Filter
let currentFilter = "all";


// ========================================
// 6. No Results Message
// ========================================

const noResultsMessage = document.createElement("p");

noResultsMessage.className = "no-results";
noResultsMessage.textContent = "No projects found.";
noResultsMessage.style.display = "none";

projectsGrid.appendChild(noResultsMessage);


// ========================================
// 7. Sort Projects
// ========================================

function sortProjects() {

    const cardsArray = Array.from(projectCards);

    if (projectSort.value === "name") {

        cardsArray.sort(function (a, b) {

            const nameA = a.querySelector(".project-title").textContent.trim().toLowerCase();
            const nameB = b.querySelector(".project-title").textContent.trim().toLowerCase();

            return nameA.localeCompare(nameB);

        });

    }

    else if (projectSort.value === "progress") {

        cardsArray.sort(function (a, b) {

            const progressA = parseInt(a.querySelector(".progress-fill").style.width);
            const progressB = parseInt(b.querySelector(".progress-fill").style.width);

            return progressB - progressA;

        });

    }

    else {

        cardsArray.sort(function (a, b) {
            return originalOrder.indexOf(a) - originalOrder.indexOf(b);
        });

    }

    projectsGrid.append(...cardsArray);

}


// ========================================
// 8. Update Projects
// ========================================

function updateProjects() {

    const searchValue = projectSearch.value.toLowerCase().trim();

    let visibleProjects = 0;

    projectCards.forEach(function (card) {

        const projectName = card.querySelector(".project-title").textContent.toLowerCase();
        const projectCategory = card.querySelector(".project-category").textContent.toLowerCase();
        const projectStatus = card.querySelector(".project-status");

        // Search Match
        const matchesSearch =
            projectName.includes(searchValue) ||
            projectCategory.includes(searchValue);

        // Filter Match
        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "in-progress" && projectStatus.classList.contains("in-progress")) ||
            (currentFilter === "completed" && projectStatus.classList.contains("completed"));

        // Show or Hide Card
        if (matchesSearch && matchesFilter) {

            card.style.display = "";
            visibleProjects++;

        } else {

            card.style.display = "none";

        }

    });

    // No Results Message
    noResultsMessage.style.display = visibleProjects === 0 ? "block" : "none";

}


// ========================================
// 9. Search Projects
// ========================================

projectSearch.addEventListener("input", function () {

    updateProjects();

    clearSearchBtn.style.display =
        projectSearch.value.trim() !== "" ? "flex" : "none";

});


// ========================================
// 10. Clear Search
// ========================================

clearSearchBtn.addEventListener("click", function () {

    projectSearch.value = "";

    clearSearchBtn.style.display = "none";

    updateProjects();

    projectSearch.focus();

});


// ========================================
// 11. Filter Projects
// ========================================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;

        // Update Active Button
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Update Projects
        updateProjects();

    });

});


// ========================================
// 12. Sorting Change
// ========================================

projectSort.addEventListener("change", function () {

    sortProjects();

    updateProjects();

});


// ========================================
// 13. Project Card Dropdown
// ========================================

const cardMenuButtons = document.querySelectorAll(".card-menu-btn");

cardMenuButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.stopPropagation();

        const dropdown = button.nextElementSibling;

        // Close Other Dropdowns
        document.querySelectorAll(".card-dropdown").forEach(function (menu) {

            if (menu !== dropdown) {
                menu.classList.remove("show");
            }

        });

        // Toggle Current Dropdown
        dropdown.classList.toggle("show");

    });

});


// Close Dropdown When Clicking Outside

document.addEventListener("click", function () {

    document.querySelectorAll(".card-dropdown").forEach(function (menu) {
        menu.classList.remove("show");
    });

});


// ========================================
// 14. Edit Project Modal Elements
// ========================================

const editModal = document.getElementById("editModal");
const closeEditModal = document.getElementById("closeEditModal");
const cancelEdit = document.getElementById("cancelEdit");

const editProjectName = document.getElementById("editProjectName");
const editProjectDescription = document.getElementById("editProjectDescription");
const editProjectCategory = document.getElementById("editProjectCategory");

let currentEditingCard = null;


// ========================================
// 15. Open Edit Project Modal
// ========================================

document.querySelectorAll(".edit-project").forEach(function (button) {

    button.addEventListener("click", function () {

        currentEditingCard = button.closest(".project-card");

        // Get Current Project Data
        const projectName = currentEditingCard.querySelector(".project-title");
        const projectDescription = currentEditingCard.querySelector(".project-description");
        const projectCategory = currentEditingCard.querySelector(".project-category");

        // Fill Modal Inputs
        editProjectName.value = projectName.textContent.trim();
        editProjectDescription.value = projectDescription.textContent.trim();
        editProjectCategory.value = projectCategory.textContent.trim();

        // Close Dropdown
        button.closest(".card-dropdown").classList.remove("show");

        // Open Modal
        editModal.classList.add("show");

    });

});


// ========================================
// 16. Close Edit Project Modal
// ========================================

function closeEditProjectModal() {

    editModal.classList.remove("show");

    currentEditingCard = null;

}

closeEditModal.addEventListener("click", closeEditProjectModal);

cancelEdit.addEventListener("click", closeEditProjectModal);


// ========================================
// 17. Save Project Changes
// ========================================

const editProjectForm = document.getElementById("editProjectForm");

editProjectForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!currentEditingCard) return;

    currentEditingCard.querySelector(".project-title").textContent =
        editProjectName.value.trim();

    currentEditingCard.querySelector(".project-description").textContent =
        editProjectDescription.value.trim();

    currentEditingCard.querySelector(".project-category").textContent =
        editProjectCategory.value.trim();

    closeEditProjectModal();

    updateProjects();

});


// ========================================
// 18. Delete Project Modal Elements
// ========================================

const deleteModal = document.getElementById("deleteModal");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");

let currentDeletingCard = null;


// ========================================
// 19. Open Delete Confirmation
// ========================================

document.querySelectorAll(".delete-project").forEach(function (button) {

    button.addEventListener("click", function () {

        currentDeletingCard = button.closest(".project-card");

        // Close Dropdown
        button.closest(".card-dropdown").classList.remove("show");

        // Open Delete Modal
        deleteModal.classList.add("show");

    });

});


// ========================================
// 20. Close Delete Modal
// ========================================

function closeDeleteProjectModal() {

    deleteModal.classList.remove("show");

    currentDeletingCard = null;

}

cancelDelete.addEventListener("click", closeDeleteProjectModal);


// ========================================
// 21. Confirm Delete Project
// ========================================

confirmDelete.addEventListener("click", function () {

    if (!currentDeletingCard) return;

    // Remove Project Card
    currentDeletingCard.remove();

    // Refresh Project Cards
    projectCards = document.querySelectorAll(".project-card");

    // Close Delete Modal
    closeDeleteProjectModal();

    // Apply Search & Filter Again
    updateProjects();

});
