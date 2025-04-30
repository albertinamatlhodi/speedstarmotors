document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const feedbackInput = document.getElementById('feedback');
    const successMessage = document.getElementById('successMessage');
    const userNameSpan = document.getElementById('userName');

    // Validate name field
    nameInput.addEventListener('input', function() {
        const nameValue = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (nameValue === '') {
            showError(nameInput, nameError, 'Please enter your name');
        } else if (!/^[a-zA-Z\s'-]+$/.test(nameValue)) {
            showError(nameInput, nameError, 'Please enter a valid name');
        } else {
            showSuccess(nameInput, nameError);
        }
    });

    // Validate email field
    emailInput.addEventListener('input', function() {
        const emailValue = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(emailInput, emailError, 'Please enter your email');
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else {
            showSuccess(emailInput, emailError);
        }
    });

    // Validate feedback field
    feedbackInput.addEventListener('input', function() {
        const feedbackValue = feedbackInput.value.trim();
        const feedbackError = document.getElementById('feedbackError');
        
        if (feedbackValue === '') {
            showError(feedbackInput, feedbackError, 'Please enter your feedback');
        } else if (feedbackValue.length < 20) {
            showError(feedbackInput, feedbackError, 'Feedback should be at least 20 characters');
        } else {
            showSuccess(feedbackInput, feedbackError);
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Trigger validation for all fields
        nameInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        feedbackInput.dispatchEvent(new Event('input'));
        
        // Check if all fields are valid
        const errorElements = document.querySelectorAll('.error:not(:empty)');
        
        if (errorElements.length === 0) {
            // Form is valid - show success message
            userNameSpan.textContent = nameInput.value.trim().split(' ')[0];
            successMessage.style.display = 'block';
            form.reset();
            
            // In a real application, you would send the data to a server here
            // For demo purposes, we'll just log it
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                rating: document.getElementById('rating').value,
                feedback: feedbackInput.value.trim()
            };
            console.log('Form submitted:', formData);
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Scroll to first error
            errorElements[0].parentElement.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Helper functions
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('invalid');
        input.classList.remove('valid');
    }
    
    function showSuccess(input, errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        input.classList.add('valid');
        input.classList.remove('invalid');
    }
});