async function login() {
    try {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        alert('Login successful!');
        
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
    }
}



const nameElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');

if (nameElement && emailElement && passwordElement) {
    const name = nameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
    async function signup(name, email, password) {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Signup successful! You can now login.');
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        }
        else {
            alert(`Signup failed: ${data}`);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        function showForm(formToShow, formToHide) {
            formToShow.style.display = 'block';
            formToHide.style.display = 'none';
        }

        document.getElementById('show-login').addEventListener('click', function () {
            showForm(loginForm, registerForm);
        });

        document.getElementById('show-register').addEventListener('click', function () {
            showForm(registerForm, loginForm);
        });

        document.getElementById('register-form').addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            signup(name, email, password);
        });
    });

}
else {
    console.error('One or more elements not found.');
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const showPasswordIcon = document.getElementById('show-password-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordIcon.innerHTML = '<ion-icon name="eye-off"></ion-icon>';
    } 
    else {
        passwordInput.type = 'password';
        showPasswordIcon.innerHTML = '<ion-icon name="eye"></ion-icon>';
    }
}
function toggleLoginPasswordVisibility() {
    const passwordInput = document.getElementById('login-password');
    const showPasswordIcon = document.getElementById('show-password-icon');
    if (passwordInput.type === 'login-password') {
        passwordInput.type = 'text';
        showPasswordIcon.innerHTML = '<ion-icon name="eye-off"></ion-icon>';
    } 
    else {
        passwordInput.type = 'login-password';
        showPasswordIcon.innerHTML = '<ion-icon name="eye"></ion-icon>';
    }
}