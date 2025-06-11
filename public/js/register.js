// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    themeToggle.textContent = '🌞';
} else {
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '🌞' : '🌙';
});

// Password strength checker
const passwordInput = document.getElementById('password');
const strengthText = document.getElementById('strengthText');
const passwordStrengthText = document.getElementById('passwordStrengthText');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

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

// Form validation + fetch submission
const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    let isValid = true;

    const check = (id, condition, errorId) => {
        const el = document.getElementById(id);
        const error = document.getElementById(errorId);
        if (condition(el.value)) {
            error.style.display = 'block';
            isValid = false;
        } else {
            error.style.display = 'none';
        }
    };

    check('firstName', v => v.trim() === '', 'firstNameError');
    check('lastName', v => v.trim() === '', 'lastNameError');
    check('studentId', v => v.trim() === '', 'studentIdError');
    check('emailId', v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'emailError');
    check('password', v => v.length < 8, 'passwordError');
    check('confirmPassword', v => v !== document.getElementById('password').value, 'confirmPasswordError');

    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('You must agree to the terms and conditions');
        isValid = false;
    }

    if (!isValid) return;

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
            window.location.href = '/login';
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error submitting the form:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});
