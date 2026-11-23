
// ========================================
// 1. Elements
// ========================================

const ideaInput = document.getElementById("ideaInput");
const characterCount = document.getElementById("characterCount");

const templateButtons = document.querySelectorAll(".template-btn");
const exploreBtn = document.querySelector(".explore-btn");

const projectResult = document.getElementById("projectResult");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const resultGoals = document.getElementById("resultGoals");


// ========================================
// 2. Variables
// ========================================

let selectedCategory = "";
let selectedTemplate = null;


// ========================================
// 3. Character Counter
// ========================================

ideaInput.addEventListener("input", function () {

    const currentLength = ideaInput.value.length;

    characterCount.textContent = `${currentLength}/2500 Characters`;

    // Default Color
    characterCount.style.color = "#64748b";

    // Warning Color
    if (currentLength >= 2000 && currentLength < 2400) {
        characterCount.style.color = "#f59e0b";
    }

    // Danger Color
    if (currentLength >= 2400) {
        characterCount.style.color = "#ef4444";
    }

});


// ========================================
// 4. Template Selection
// ========================================

templateButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove Active Class
        templateButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Add Active Class
        button.classList.add("active");

        // Save Selected Category
        selectedCategory = button.dataset.category;

        // Get Template Data
        selectedTemplate = templatesData[selectedCategory];

        console.log(selectedTemplate);
        console.log(selectedTemplate.title);

    });

});


// ========================================
// 5. Input Validation
// ========================================

exploreBtn.addEventListener("click", function () {

    // Check Idea Input
    if (ideaInput.value.trim() === "") {
        alert("Please write your idea first!");
        return;
    }

    // Check Template Selection
    if (selectedCategory === "") {
        alert("Please select a template!");
        return;
    }


    // ========================================
// Generate Project Name
// ========================================

const cleanedIdea = ideaInput.value
    .trim()
    .replace(/[.,!?;:]/g, "")
    .replace(/^(I want to create|I need to build|I want to|I need to|I want|I need|Build me|Create me)\s+/i, "");

const stopWords = [
    "a", "an", "the", "for", "to", "and", "in", "with",
    "my", "your", "our", "me", "please", "website", "web",
    "app", "application", "platform", "system"
];

const filteredWords = cleanedIdea
    .split(/\s+/)
    .filter(function (word) {
        return !stopWords.includes(word.toLowerCase());
    });

const projectName = filteredWords
    .slice(0, 5)
    .join(" ")
    .replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
    });

console.log("Cleaned Idea:", cleanedIdea);
console.log("Project Name:", projectName);

    // ========================================
    // 7. Show Project Result
    // ========================================

    // Show Result Section
    projectResult.style.display = "block";

    // Display Project Name
    resultTitle.textContent = projectName;

    // Display Project Description
    resultDescription.textContent = selectedTemplate.description;


    // ========================================
    // 8. Display Project Goals
    // ========================================

    // Clear Previous Goals
    resultGoals.innerHTML = "";

    // Loop Through Goals
    selectedTemplate.goals.forEach(function (goal) {

        const goalItem = document.createElement("li");

        goalItem.textContent = goal;

        resultGoals.appendChild(goalItem);

    });


    // ========================================
    // 9. Console Output
    // ========================================

    console.log("Project Title:", projectName);
    console.log("Project Description:", selectedTemplate.description);
    console.log("Project Goals:", selectedTemplate.goals);

});


// ========================================
// 10. Template Data
// ========================================

const templatesData = {

    // 1. Store
    store: {
        title: "Online Store",

        description: "Create an online store to sell products to customers.",

        goals: [
            "Build a user-friendly online store",
            "Display products clearly",
            "Provide a smooth shopping experience"
        ]
    },


    // 2. Education
    education: {
        title: "Online Learning Platform",

        description: "Create an educational platform that provides courses and learning resources.",

        goals: [
            "Provide online educational courses",
            "Allow students to track their progress",
            "Create an easy learning experience"
        ]
    },


    // 3. Health
    health: {
        title: "Health & Fitness Platform",

        description: "Create a platform that helps users manage their health and fitness activities.",

        goals: [
            "Provide health and fitness information",
            "Help users track their daily activities",
            "Create personalized fitness plans"
        ]
    },


    // 4. Restaurant
    restaurant: {
        title: "Restaurant Website",

        description: "Create a restaurant website where customers can explore menus and discover food options.",

        goals: [
            "Display the restaurant menu",
            "Show restaurant information and location",
            "Provide an easy reservation experience"
        ]
    },


    // 5. Technology
    technology: {
        title: "Technology Platform",

        description: "Create a technology platform that provides digital tools and technical solutions.",

        goals: [
            "Develop useful digital features",
            "Provide a simple user interface",
            "Improve the overall user experience"
        ]
    },


    // 6. Other
    other: {
        title: "Custom Project",

        description: "Create a custom project based on the user's unique idea and requirements.",

        goals: [
            "Understand the project requirements",
            "Define the main project objectives",
            "Create a clear development plan"
        ]
    }

};
