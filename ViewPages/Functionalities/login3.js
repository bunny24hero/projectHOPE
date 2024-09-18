document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const main = document.getElementById('main');

    signUpButton.addEventListener('click', () => {
        main.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        main.classList.remove("right-panel-active");
    });

    // Add event listener for Sign Up button click to send verification code
    const signUpForm = document.querySelector('.sign-up form');
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission
        sendVerificationCode();
    });

    // Add event listener for Verify button click to verify code
    const verifyButton = document.getElementById('verify-button');
    if (verifyButton) {
        verifyButton.addEventListener('click', () => {
            verifyCode();
        });
    }
});

function sendVerificationCode() {
    const email = document.querySelector('.sign-up input[name="email"]').value;

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Verification email sent!') {
            document.getElementById('verification-section').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function verifyCode() {
    const code = document.getElementById('verification-code').value;

    fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Verification successful') {
            // Proceed with the rest of the signup logic
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
