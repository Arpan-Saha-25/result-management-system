// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    themeToggle.textContent = '🌞';
} else {
    themeToggle.textContent = '🌙';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    themeToggle.textContent = isDark ? '🌞' : '🌙';
});

// Password Strength Text Indicator
const passwordInput = document.getElementById('password');
const strengthText = document.getElementById('strengthText');
const passwordStrengthText = document.getElementById('passwordStrengthText');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;

    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    // Update text and color
    if (password.length === 0) {
        strengthText.textContent = "None";
        strengthText.className = "";
        passwordStrengthText.style.display = "none";
    } else {
        passwordStrengthText.style.display = "block";

        if (strength < 50) {
            strengthText.textContent = "Weak";
            strengthText.className = "strength-weak";
        } else if (strength < 75) {
            strengthText.textContent = "Medium";
            strengthText.className = "strength-medium";
        } else {
            strengthText.textContent = "Strong";
            strengthText.className = "strength-strong";
        }
    }
});

// Form Validation and Submission
const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    let isValid = true;

    // Validate First Name
    const firstName = document.getElementById('firstName');
    if (firstName.value.trim() === '') {
        document.getElementById('firstNameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('firstNameError').style.display = 'none';
    }

    // Validate Last Name
    const lastName = document.getElementById('lastName');
    if (lastName.value.trim() === '') {
        document.getElementById('lastNameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('lastNameError').style.display = 'none';
    }

    // Validate Student ID
    const studentId = document.getElementById('studentId');
    if (studentId.value.trim() === '') {
        document.getElementById('studentIdError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('studentIdError').style.display = 'none';
    }

    // Validate Email
    const email = document.getElementById('emailId');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Validate Password
    const password = document.getElementById('password');
    if (password.value.length < 8) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    // Validate Confirm Password
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword.value !== password.value) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').style.display = 'none';
    }

    // Validate Terms Checkbox
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('You must agree to the terms and conditions');
        isValid = false;
    }

    if (!isValid) {
        return; // Stop submission if validation fails
    }

    // Submit the form data via Fetch API
    const formData = new FormData(registrationForm);
    const formObject = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        if (response.ok) {
            // Redirect to the home page on successful registration
            window.location.href = '/';
        } else {
            // Handle errors and display error messages
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error submitting the form:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});