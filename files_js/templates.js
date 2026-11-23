
/* ========================================
   1. Elements
======================================== */

const notificationBtn = document.getElementById("notificationBtn");
const notificationDropdown = document.getElementById("notificationDropdown");

const themeToggle = document.getElementById("themeToggle");

const templateSearch = document.getElementById("templateSearch");
const clearSearch = document.getElementById("clearSearch");

const templateCards = document.querySelectorAll(".template-card");
const noResults = document.getElementById("noResults");

const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "all";


/* ========================================
   2. Notifications
======================================== */

notificationBtn.addEventListener("click", function () {

    notificationDropdown.classList.toggle("show");

});

document.addEventListener("click", function (event) {

    if (!event.target.closest(".notification-wrapper")) {

        notificationDropdown.classList.remove("show");

    }

});


/* ========================================
   3. Dark Mode
======================================== */

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';

}

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


/* ========================================
   4. Search & Filter Templates
======================================== */

function searchTemplates() {

    const searchValue = templateSearch.value.toLowerCase().trim();

    let visibleCards = 0;

    templateCards.forEach(function (card) {

        const title = card.querySelector("h3").textContent.toLowerCase();

        const category = card.querySelector(".template-category").textContent.trim();

        const categoryLower = category.toLowerCase();


        // Search Condition

        const matchesSearch =
            title.includes(searchValue) ||
            categoryLower.includes(searchValue);


        // Filter Condition

        const matchesFilter =
            activeFilter === "all" ||
            category === activeFilter;


        // Display Cards

        if (matchesSearch && matchesFilter) {

            card.style.display = "flex";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    // No Results Message

    noResults.style.display = visibleCards === 0 ? "block" : "none";


    // Clear Search Button

    clearSearch.style.display = searchValue !== "" ? "flex" : "none";

}


// Search Event

templateSearch.addEventListener("input", searchTemplates);


/* ========================================
   5. Clear Search
======================================== */

clearSearch.addEventListener("click", function () {

    templateSearch.value = "";

    searchTemplates();

    templateSearch.focus();

});


/* ========================================
   6. Category Filters
======================================== */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {


        // Remove Active Class

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add Active Class

        button.classList.add("active");


        // Update Selected Filter

        activeFilter = button.dataset.filter;


        // Apply Search & Filter

        searchTemplates();

    });

});
