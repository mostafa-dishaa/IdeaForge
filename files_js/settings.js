// ========================================
// 1. Profile Elements
// ========================================

const fullName = document.getElementById("fullName");
const emailAddress = document.getElementById("emailAddress");
const userBio = document.getElementById("userBio");

const saveProfileBtn = document.querySelector(".save-profile-btn");

const avatarInput = document.getElementById("avatarInput");
const profileAvatar = document.querySelector(".profile-avatar");


// ========================================
// 2. Save Profile Data
// ========================================

saveProfileBtn.addEventListener("click", function () {

    const profileData = {
        name: fullName.value,
        email: emailAddress.value,
        bio: userBio.value
    };

    localStorage.setItem("profileData", JSON.stringify(profileData));

    alert("Profile saved successfully!");

});


// ========================================
// 3. Load Profile Data
// ========================================

const savedProfile = localStorage.getItem("profileData");

if (savedProfile) {

    const profileData = JSON.parse(savedProfile);

    fullName.value = profileData.name;
    emailAddress.value = profileData.email;
    userBio.value = profileData.bio;

}


// ========================================
// 4. Upload Profile Picture
// ========================================

avatarInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function () {

            profileAvatar.innerHTML = `
                <img src="${reader.result}" alt="Profile Picture">
            `;

            localStorage.setItem("profileAvatar", reader.result);

        };

        reader.readAsDataURL(file);

    }

});


// ========================================
// 5. Load Profile Picture
// ========================================

const savedAvatar = localStorage.getItem("profileAvatar");

if (savedAvatar) {

    profileAvatar.innerHTML = `
        <img src="${savedAvatar}" alt="Profile Picture">
    `;

}

// ========================================
// 9. Notifications Settings
// ========================================

const notificationOptions = document.querySelectorAll(
    '.settings-section#notifications input[type="checkbox"]'
);


// Load Saved Notifications

const savedNotifications = localStorage.getItem("notificationSettings");

if (savedNotifications) {

    const notificationData = JSON.parse(savedNotifications);

    notificationOptions.forEach(function (option) {

        if (notificationData[option.id] !== undefined) {
            option.checked = notificationData[option.id];
        }

    });

}


// Save Notifications

notificationOptions.forEach(function (option) {

    option.addEventListener("change", function () {

        const notificationData = {};

        notificationOptions.forEach(function (item) {
            notificationData[item.id] = item.checked;
        });

        localStorage.setItem(
            "notificationSettings",
            JSON.stringify(notificationData)
        );

    });

});

// ========================================
// 10. Show / Hide Password
// ========================================

const passwordToggleButtons = document.querySelectorAll(".toggle-password");

passwordToggleButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const targetId = this.dataset.target;
        const passwordInput = document.getElementById(targetId);

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            passwordInput.type = "password";
            this.innerHTML = '<i class="fa-solid fa-eye"></i>';

        }

    });

});

// ========================================
// 11. Change Password Validation
// ========================================

const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

const changePasswordBtn = document.querySelector(".change-password-btn");

changePasswordBtn.addEventListener("click", function () {

    if (
        currentPassword.value === "" ||
        newPassword.value === "" ||
        confirmPassword.value === ""
    ) {
        alert("Please fill in all password fields.");
        return;
    }

    if (newPassword.value.length < 8) {
        alert("New password must be at least 8 characters.");
        return;
    }

    if (newPassword.value !== confirmPassword.value) {
        alert("New passwords do not match.");
        return;
    }

    if (currentPassword.value === newPassword.value) {
        alert("New password must be different from current password.");
        return;
    }

    alert("Password updated successfully!");

    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";

});

// ========================================
// 12. Appearance Settings
// ========================================

const themeOptions = document.querySelectorAll('input[name="theme"]');

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

    } else if (theme === "light") {

        document.body.classList.remove("dark-mode");

    } else {

        const systemDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        document.body.classList.toggle("dark-mode", systemDark);

    }

    localStorage.setItem("selectedTheme", theme);

}


// Change Theme

themeOptions.forEach(function (option) {

    option.addEventListener("change", function () {

        if (this.checked) {
            applyTheme(this.value);
        }

    });

});


// Load Saved Theme

const savedTheme = localStorage.getItem("selectedTheme") || "light";

const selectedTheme = document.querySelector(
    `input[name="theme"][value="${savedTheme}"]`
);

if (selectedTheme) {
    selectedTheme.checked = true;
}

applyTheme(savedTheme);


// Follow System Theme Changes

window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {

        if (localStorage.getItem("selectedTheme") === "system") {
            applyTheme("system");
        }

    });