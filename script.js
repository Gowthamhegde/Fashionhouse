document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login');
    const signupForm = document.querySelector('.signup');
    const toggleButtons = document.querySelectorAll('.toggle-form');

    // Toggle between login and signup forms
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const formToShow = button.dataset.form;
            if (formToShow === 'login') {
                loginForm.classList.remove('hidden');
                signupForm.classList.add('hidden');
            } else {
                signupForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
            }
        });
    });

    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;
        
        // Add your login logic here
        console.log('Login attempt:', { email, password });
    });

    // Handle signup form submission
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.querySelector('input[type="text"]').value;
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Add your signup logic here
        console.log('Signup attempt:', { name, email, password });
    });
});