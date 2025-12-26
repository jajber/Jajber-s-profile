// ============================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// ============================================

// DOM Elements
const navMenu = document.querySelector('.nav-menu');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const backToTopBtn = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const currentYearSpan = document.getElementById('currentYear');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize skill bars
    initSkillBars();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typingElement = document.querySelector('.hero-typing');
    const cursor = document.querySelector('.typing-cursor');
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let index = 0;
    let isDeleting = false;
    let isFinished = false;
    
    function type() {
        if (!isFinished) {
            if (!isDeleting && index < text.length) {
                // Typing forward
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            } else if (isDeleting && index > 0) {
                // Deleting
                typingElement.textContent = text.substring(0, index - 1);
                index--;
                setTimeout(type, 30);
            } else {
                // Switch between typing and deleting
                isDeleting = !isDeleting;
                
                // Pause at the end before restarting
                if (!isDeleting && index === 0) {
                    isFinished = true;
                    cursor.style.animation = 'none';
                    setTimeout(() => {
                        isFinished = false;
                        cursor.style.animation = 'blink 1s infinite';
                        setTimeout(type, 1000);
                    }, 3000);
                } else {
                    setTimeout(type, 1000);
                }
            }
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(type, 1000);
}

// ============================================
// NAVIGATION & SCROLL EFFECTS
// ============================================
// Mobile menu toggle
menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        
        if (document.body.classList.contains('dark-theme')) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        
        if (document.body.classList.contains('dark-theme')) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Active section highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top functionality
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// THEME TOGGLE
// ============================================
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    // Update icon
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.parentElement.getAttribute('data-level');
                skillBar.style.width = `${level}%`;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .timeline-content, .highlight');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ============================================
// FORM HANDLING (Frontend only - UI Feedback)
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message (in a real app, this would be an API call)
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log form data to console (for debugging)
        console.log('Form submitted:', { name, email, subject, message });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.padding = '15px';
    messageElement.style.borderRadius = '8px';
    messageElement.style.marginTop = '20px';
    messageElement.style.fontWeight = '500';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
        messageElement.style.color = '#16a34a';
        messageElement.style.border = '1px solid #86efac';
    } else {
        messageElement.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        messageElement.style.color = '#dc2626';
        messageElement.style.border = '1px solid #fca5a5';
    }
    
    // Insert message after the form
    contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// ============================================
// ADDITIONAL UI ENHANCEMENTS
// ============================================
// Add hover effect to project cards on touch devices
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        this.classList.add('hover');
    });
    
    card.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('hover');
        }, 500);
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Code that runs after scrolling stops
    }, 100);
});