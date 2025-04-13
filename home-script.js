// Initialize tilt effect for floating cards
VanillaTilt.init(document.querySelectorAll(".floating-card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5
});

// Avatar interaction
const avatar = document.querySelector('.avatar');
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 30;
    const y = (clientY / window.innerHeight - 0.5) * 30;
    
    avatar.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) translateZ(50px)`;
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive button effects
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// User Authentication System
const users = JSON.parse(localStorage.getItem('users')) || [];

function checkUserExists(email) {
    return users.find(user => user.email === email);
}

function createUser(name, email, password) {
    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
}

function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

// Login button handler
document.querySelector('.login-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');

    if (!email || !password) {
        alert('Please provide both email and password');
        return;
    }

    const existingUser = checkUserExists(email);
    
    if (existingUser) {
        // Try to login
        if (loginUser(email, password)) {
            alert('Login successful!');
            window.location.href = 'dashboard.html'; // Redirect to dashboard or desired page
        } else {
            alert('Invalid password!');
        }
    } else {
        // New user registration
        const createNewUser = confirm('User not found. Would you like to create a new account?');
        if (createNewUser) {
            const name = prompt('Enter your name:');
            if (name) {
                createUser(name, email, password);
                loginUser(email, password);
                alert('Account created and logged in successfully!');
                window.location.href = 'dashboard.html'; // Redirect to dashboard or desired page
            }
        }
    }
});

// Check if user is already logged in
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // Login Modal Functionality
        const loginBtn = document.querySelector('.login-btn');
        const authModal = document.getElementById('authModal');
        const closeButtons = document.querySelectorAll('.close-modal');
        
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.style.display = 'block';
        });
        
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                authModal.style.display = 'none';
            });
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.style.display = 'none';
            }
        });
        loginBtn.textContent = 'Dashboard';
        loginBtn.href = 'dashboard.html';
    }
});