// ==========================================
// INITIALIZATION & GLOBAL VARIABLES
// ==========================================

let particlesActive = false;
let canvas, ctx;
let particles = [];
const particleCount = 100;

// ==========================================
// DARK MODE FUNCTIONALITY
// ==========================================

// Load theme preference from localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon('dark');
}

// Theme toggle button
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.toggle-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ==========================================
// BACKGROUND ANIMATION TOGGLE
// ==========================================

const bgToggle = document.getElementById('bg-toggle');
const gradientWaves = document.querySelector('.gradient-waves');
const particlesCanvas = document.getElementById('particles-canvas');

// Load background preference from localStorage
const currentBg = localStorage.getItem('background') || 'gradient';
if (currentBg === 'particles') {
    deactivateGradient();
    activateParticles();
}

bgToggle.addEventListener('click', () => {
    if (particlesActive) {
        // Switch to gradient waves
        deactivateParticles();
        activateGradient();
        localStorage.setItem('background', 'gradient');
    } else {
        // Switch to particles
        deactivateGradient();
        activateParticles();
        localStorage.setItem('background', 'particles');
    }
});

function activateGradient() {
    gradientWaves.classList.remove('hidden');
    bgToggle.querySelector('.toggle-icon').textContent = '🌊';
}

function deactivateGradient() {
    gradientWaves.classList.add('hidden');
}

function activateParticles() {
    particlesActive = true;
    particlesCanvas.classList.add('active');
    initParticles();
    animateParticles();
    bgToggle.querySelector('.toggle-icon').textContent = '✨';
}

function deactivateParticles() {
    particlesActive = false;
    particlesCanvas.classList.remove('active');
    particles = [];
}

// ==========================================
// PARTICLE CANVAS ANIMATION
// ==========================================

function initParticles() {
    canvas = particlesCanvas;
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        
        if (isDarkMode) {
            gradient.addColorStop(0, `rgba(168, 85, 247, ${this.opacity})`);
            gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        } else {
            gradient.addColorStop(0, `rgba(0, 245, 255, ${this.opacity})`);
            gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animateParticles() {
    if (!particlesActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw connections between nearby particles
    connectParticles();
    
    requestAnimationFrame(animateParticles);
}

function connectParticles() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const maxDistance = 150;
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.3;
                ctx.strokeStyle = isDarkMode 
                    ? `rgba(168, 85, 247, ${opacity})` 
                    : `rgba(0, 245, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// ==========================================
// MOBILE NAVIGATION MENU
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const scrollElements = document.querySelectorAll('.about-content, .timeline-item, .project-card, .contact-item');
scrollElements.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// TYPING EFFECT FOR HERO SUBTITLE
// ==========================================

const typingText = document.querySelector('.typing-text');
const text = 'Aspiring Web Developer & AI Enthusiast';
let charIndex = 0;

function typeText() {
    if (charIndex < text.length) {
        typingText.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        // Keep the blinking cursor
        setTimeout(() => {
            typingText.style.borderRight = '3px solid var(--accent-2)';
        }, 500);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    typingText.textContent = '';
    setTimeout(typeText, 500);
});

// ==========================================
// PARALLAX EFFECT ON SCROLL
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// ==========================================
// 3D TILT EFFECT FOR PROJECT CARDS
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
});

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
}

// ==========================================
// PROFILE IMAGE 3D EFFECT
// ==========================================

const profileContainer = document.querySelector('.profile-image-container');

if (profileContainer) {
    profileContainer.addEventListener('mousemove', (e) => {
        const rect = profileContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        profileContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    profileContainer.addEventListener('mouseleave', () => {
        profileContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c👋 Welcome to CashPharmar\'s Portfolio!', 'color: #a855f7; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Calvin Selassie', 'color: #00f5ff; font-size: 14px;');
console.log('%cInterested in collaborating? Reach out at calvinselassie1@gmail.com', 'color: #ec4899; font-size: 12px;');
