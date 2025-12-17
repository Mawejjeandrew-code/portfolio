// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const challenge = document.getElementById('challenge').value;
    
    // In a real implementation, you would send this data to a server
    // For demo purposes, we'll simulate a successful submission
    
    // Create a success message
    const formHeader = document.querySelector('.form-header');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
        <h3>Thank you, ${name}!</h3>
        <p>Your discovery call request has been received. You'll be redirected to the calendar to select your preferred time slot.</p>
        <p><small>For demo purposes, this is a simulation. In production, this would connect to Calendly or similar.</small></p>
    `;
    
    // Replace form with success message
    contactForm.style.display = 'none';
    formHeader.parentNode.insertBefore(successMessage, formHeader.nextSibling);
    
    // In a real implementation, you would redirect to Calendly:
    // window.location.href = `https://calendly.com/your-link?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links (for browsers that don't support CSS smooth scroll)
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe service cards and case studies
document.querySelectorAll('.service-card, .case-study-card').forEach(card => {
    observer.observe(card);
});

// Calendly Integration
// If using inline widget, it's already handled by Calendly's script
// If using redirect button, the link already works

// Track Calendly clicks (optional analytics)
document.addEventListener('DOMContentLoaded', function() {
    const calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]');
    
    calendlyLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add Google Analytics or other tracking here
            console.log('Calendly link clicked:', this.href);
            // Example: gtag('event', 'calendly_click', { 'event_category': 'engagement' });
        });
    });
});