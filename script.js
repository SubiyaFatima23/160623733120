
const themeButton = document.getElementById("themeButton");

function changeTheme() {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        themeButton.textContent = "Dark mode";
        themeButton.setAttribute("aria-pressed", "false");
    } else {
        document.body.classList.add("dark-mode");
        themeButton.textContent = "Light mode";
        themeButton.setAttribute("aria-pressed", "true");
    }
}

themeButton.addEventListener("click", changeTheme);



const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
}

function changeMenu() {
    if (navLinks.classList.contains("open")) {
        closeMenu();
    } else {
        navLinks.classList.add("open");
        menuButton.setAttribute("aria-expanded", "true");
    }
}

menuButton.addEventListener("click", changeMenu);

const navigationLinks = navLinks.querySelectorAll("a");

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", closeMenu);
}


const skills = [
    "HTML5", "CSS3", "Bootstrap", "Python",
    "Java", "C", "SQL", "MySQL",
    "TensorFlow", "scikit-learn", "OpenCV",
    "NumPy", "Pandas", "Matplotlib", "Seaborn",
    "Git and GitHub", "VS Code", "Jupyter Notebook"
];

const skillsList = document.getElementById("skillsList");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("span");

    skill.className = "skill-item";
    skill.textContent = skills[i];

    skillsList.appendChild(skill);
}


const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-column");
const projectCount = document.getElementById("projectCount");

function filterProjects(event) {
    const selectedButton = event.currentTarget;
    const category = selectedButton.dataset.filter;
    let count = 0;

    for (let i = 0; i < projectCards.length; i++) {
        const card = projectCards[i];

        if (category === "All" || card.dataset.category === category) {
            card.hidden = false;
            count++;
        } else {
            card.hidden = true;
        }
    }

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].classList.remove("active");
        filterButtons[i].setAttribute("aria-pressed", "false");
    }

    selectedButton.classList.add("active");
    selectedButton.setAttribute("aria-pressed", "true");

    if (count === 1) {
        projectCount.textContent = "Showing 1 project";
    } else {
        projectCount.textContent = "Showing " + count + " projects";
    }
}

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", filterProjects);
}

const today = new Date();

document.getElementById("year").textContent = today.getFullYear();


// 6. Contact form
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("sendButton");
const formStatus = document.getElementById("formStatus");

function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;

    if (message === "") {
        input.setAttribute("aria-invalid", "false");
    } else {
        input.setAttribute("aria-invalid", "true");
    }
}

function resetButton() {
    sendButton.disabled = false;
    sendButton.textContent = "Send message";
}

function submitForm(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();


    showError(nameInput, "nameError", "");
    showError(emailInput, "emailError", "");
    showError(messageInput, "messageError", "");
    formStatus.textContent = "";

    if (name.length < 2) {
        showError(nameInput, "nameError", "Enter at least 2 characters.");
        nameInput.focus();
        return;
    }

    if (email === "" || !emailInput.validity.valid) {
        showError(emailInput, "emailError", "Enter a valid email address.");
        emailInput.focus();
        return;
    }

    if (message.length < 10) {
        showError(
            messageInput,
            "messageError",
            "Enter a message with at least 10 characters."
        );
        messageInput.focus();
        return;
    }

    const formData = {
        name: name,
        email: email,
        message: message,
        _subject: "New portfolio message"
    };

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";
    formStatus.textContent = "Sending your message...";
    fetch("https://formsubmit.co/ajax/subiyafatima7789@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Submission failed");
        }

        return response.json();
    })
    .then(function (result) {
        if (result.success === true || result.success === "true") {
            formStatus.textContent =
                "Your message was accepted by the form service. Thank you!";

            contactForm.reset();
        } else {
            formStatus.textContent =
                "Submission failed. Please try again or email me directly.";
        }

        resetButton();
    })
    .catch(function () {
        formStatus.textContent =
            "Unable to submit. Please try again or email me directly.";

        resetButton();
    });
}

contactForm.addEventListener("submit", submitForm);