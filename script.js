/*
===========================================
MODERN PORTFOLIO JAVASCRIPT FOR CALVIN SELASSIE (CASHPHARMAR)
===========================================
*/

// ========================================
// CONFIGURATION - Easy Customization
// ========================================

// Background Configuration - Change this to switch between "waves" or "particles"
const HERO_BACKGROUND = "waves"; // Options: "waves" or "particles"

// Animation Settings
const ANIMATION_CONFIG = {
  particleCount: 80,          // Number of particles (for particle background)
  particleSpeed: 0.5,         // Particle movement speed
  connectionDistance: 100,    // Distance for particle connections
  fps: 60,                   // Target FPS
  reducedMotion: false       // Will be auto-detected
};

// Scroll Animation Settings
const SCROLL_CONFIG = {
  threshold: 0.1,            // Intersection threshold
  rootMargin: '0px 0px -50px 0px'
};

// ========================================
// MAIN APPLICATION
// ========================================

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    // Check for reduced motion preference
    this.checkReducedMotion();
    
    // Initialize all components
    this.initDarkMode();
    this.initHeroBackground();
    this.initScrollAnimations();
    this.initSmoothScrolling();
    this.initNavbarEffects();
    
    console.log('Portfolio loaded successfully! 🚀');
  }

  checkReducedMotion() {
    ANIMATION_CONFIG.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (ANIMATION_CONFIG.reducedMotion) {
      console.log('Reduced motion detected - animations optimized');
    }
  }

  // ========================================
  // DARK MODE FUNCTIONALITY
  // ========================================
  
  initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Load saved preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (prefersDark.matches ? 'dark' : 'light');
    
    this.setTheme(savedTheme);
    
    // Toggle event listener
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    });
    
    // Listen for system preference changes
    prefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle icon
    const toggleIcon = document.querySelector('.toggle-icon');
    toggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // ========================================
  // HERO BACKGROUND SYSTEM
  // ========================================
  
  initHeroBackground() {
    const heroBackground = document.getElementById('heroBackground');
    
    if (HERO_BACKGROUND === 'particles') {
      this.initParticleBackground(heroBackground);
    } else {
      this.initWaveBackground(heroBackground);
    }
  }
  
  initWaveBackground(container) {
    container.className = 'hero-background waves-background';
    
    // Add additional wave layers for more depth
    const waveLayer = document.createElement('div');
    waveLayer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 70%, rgba(102, 126, 234, 0.2) 0%, transparent 50%),
                  radial-gradient(circle at 70% 30%, rgba(245, 87, 108, 0.2) 0%, transparent 50%);
      animation: floatWaves 8s ease-in-out infinite reverse;
    `;
    container.appendChild(waveLayer);
  }
  
  initParticleBackground(container) {
    if (ANIMATION_CONFIG.reducedMotion) {
      // Fallback to static gradient for reduced motion
      container.className = 'hero-background waves-background';
      return;
    }
    
    container.className = 'hero-background particles-background';
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);
    
    this.particleSystem = new ParticleSystem(canvas, ctx);
    this.particleSystem.init();
  }

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================
  
  initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: SCROLL_CONFIG.threshold,
      rootMargin: SCROLL_CONFIG.rootMargin
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
    
    // Observe all sections and timeline items
    const elementsToAnimate = [
      ...document.querySelectorAll('section'),
      ...document.querySelectorAll('.timeline-item')
    ];
    
    elementsToAnimate.forEach(el => observer.observe(el));
  }
  
  // ========================================
  // SMOOTH SCROLLING & NAVIGATION
  // ========================================
  
  initSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  initNavbarEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    // Throttled scroll handler for performance
    const handleScroll = this.throttle(() => {
      const currentScrollY = window.scrollY;
      
      // Add/remove navbar background based on scroll
      if (currentScrollY > 100) {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
          ? 'rgba(26, 32, 44, 0.98)' 
          : 'rgba(255, 255, 255, 0.98)';
      } else {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'rgba(26, 32, 44, 0.95)'
          : 'rgba(255, 255, 255, 0.95)';
      }
      
      lastScrollY = currentScrollY;
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
  }
  
  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// ========================================
// PARTICLE SYSTEM CLASS
// ========================================

class ParticleSystem {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.particles = [];
    this.animationId = null;
    this.lastTime = 0;
    this.fpsInterval = 1000 / ANIMATION_CONFIG.fps;
  }
  
  init() {
    this.setupCanvas();
    this.createParticles();
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.setupCanvas();
      this.createParticles();
    });
  }
  
  setupCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }
  
  createParticles() {
    this.particles = [];
    const particleCount = ANIMATION_CONFIG.reducedMotion ? 20 : ANIMATION_CONFIG.particleCount;
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * ANIMATION_CONFIG.particleSpeed,
        vy: (Math.random() - 0.5) * ANIMATION_CONFIG.particleSpeed,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate(currentTime = 0) {
    this.animationId = requestAnimationFrame((time) => this.animate(time));
    
    // FPS limiting
    if (currentTime - this.lastTime < this.fpsInterval) return;
    this.lastTime = currentTime;
    
    this.update();
    this.draw();
  }
  
  update() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x <= 0 || particle.x >= this.canvas.width) particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= this.canvas.height) particle.vy *= -1;
      
      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    });
  }
  
  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections
    this.drawConnections();
    
    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
      this.ctx.fill();
    });
  }
  
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < ANIMATION_CONFIG.connectionDistance) {
          const opacity = (1 - distance / ANIMATION_CONFIG.connectionDistance) * 0.2;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ========================================
// INITIALIZE APPLICATION
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the portfolio app
  new PortfolioApp();
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause heavy animations when page is hidden
    ANIMATION_CONFIG.reducedMotion = true;
  } else {
    // Resume animations when page is visible
    setTimeout(() => {
      ANIMATION_CONFIG.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, 100);
  }
});

// ========================================
// CUSTOMIZATION GUIDE
// ========================================

/*
EASY CUSTOMIZATION POINTS:

1. BACKGROUND MODE:
   - Change HERO_BACKGROUND to "waves" or "particles" (line 10)

2. COLORS:
   - Edit CSS variables in style.css (lines 8-20)

3. ANIMATIONS:
   - Adjust ANIMATION_CONFIG values (lines 13-19)
   - Modify --animation-duration in CSS

4. PERSONAL INFO:
   - Update HTML content in index.html
   - Change project details, links, and contact info

5. PERFORMANCE:
   - Reduce particleCount for slower devices
   - Adjust fps value
   - Use "waves" background for better performance

6. SCROLL ANIMATIONS:
   - Modify SCROLL_CONFIG values (lines 22-25)
   - Adjust threshold and rootMargin for sensitivity

TIPS:
- Test on mobile devices and adjust particle count accordingly
- Use browser dev tools to monitor performance
- The site automatically respects user's motion preferences
*/