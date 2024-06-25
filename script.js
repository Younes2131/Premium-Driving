// Main JavaScript file for the driving lesson booking website

// Use strict mode for better error catching and performance
'use strict';

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Navbar functionality
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Sticky navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentIndex = 0;

    function updateTestimonialSlider() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonialSlider();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonialSlider();
    });

    // Auto-advance testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonialSlider();
    }, 5000);

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Form validation
    const bookingForm = document.querySelector('.booking-form');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        let isValid = true;
        const requiredFields = bookingForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'This field is required');
            } else {
                clearError(field);
            }
        });

        const emailField = bookingForm.querySelector('#email');
        if (emailField && !isValidEmail(emailField.value)) {
            isValid = false;
            showError(emailField, 'Please enter a valid email address');
        }

        return isValid;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(field, message) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        } else {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            field.parentNode.insertBefore(error, field.nextSibling);
        }
        field.classList.add('error');
    }

    function clearError(field) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }

    function submitForm() {
        // Show loading animation
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            showSuccessMessage();
            bookingForm.reset();
        }, 2000);
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Booking submitted successfully!';
        bookingForm.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // Dynamic course filtering
    const courseFilter = document.querySelector('#course-filter');
    const courseCards = document.querySelectorAll('.course-card');

    if (courseFilter) {
        courseFilter.addEventListener('change', () => {
            const selectedCategory = courseFilter.value;
            courseCards.forEach(card => {
                if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyImageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });

 
});


