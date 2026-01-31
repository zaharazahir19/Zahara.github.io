// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const nav = document.querySelector('nav');

// Initial Theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Nav Scroll Background
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Active Link Highlighting (Intersection Observer)
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

const options = {
    threshold: 0.3, // Trigger when 30% of section is visible
    rootMargin: "-80px 0px 0px 0px" // Account for fixed nav
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        // Toggle icon between menu and close
        const icon = navToggle.querySelector('ion-icon');
        icon.setAttribute('name', navLinksContainer.classList.contains('active') ? 'close-outline' : 'menu-outline');
    });
}

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        if (navToggle) {
            const icon = navToggle.querySelector('ion-icon');
            icon.setAttribute('name', 'menu-outline');
        }
    });
});

// Card Interactivity (Glow on Click)
const cards = document.querySelectorAll('.content-card, .skill-card, .contact-info-card, .contact-form-card, .project-card, .centered-hero-content');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Toggle active state for the clicked card
        card.classList.toggle('active');

        // Optional: Remove active from others (tab behavior)
        // cards.forEach(c => { if(c !== card) c.classList.remove('active'); });
    });
});

// No JS needed for direct download now
