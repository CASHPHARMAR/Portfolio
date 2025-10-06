# Portfolio Website - Calvin Selassie (CashPharmar)

## Overview

A modern, interactive portfolio website showcasing Calvin Selassie's work as an aspiring web developer and AI enthusiast. The site features dynamic background animations, dark mode support, 3D effects, and a responsive design built with vanilla HTML, CSS, and JavaScript.

**Last Updated:** October 6, 2025

## User Preferences

- **Communication Style:** Simple, everyday language

## Project Features

### Complete Feature List

1. **Sticky Navigation Bar**
   - Animated "CashPharmar" logo with glowing gradient effect
   - Navigation links: Home, About, Timeline, Projects, Contact
   - Smooth hover effects with gradient underlines
   - Background toggle button (gradient waves ↔ particle canvas)
   - Dark/light mode toggle button
   - Responsive mobile hamburger menu

2. **Hero Section**
   - Large title: "Hi, I'm Calvin Selassie" with gradient text effect
   - Animated typing subtitle: "Aspiring Web Developer & AI Enthusiast"
   - 3D floating animation effect
   - Call-to-action button with hover effects
   - Parallax scrolling effect

3. **About Me Section**
   - Professional profile photo with 3D tilt effect on hover
   - Introduction paragraph
   - Education details: St. John's Grammar School, 2025 (General Science with Biology)
   - Achievement: 2024 National Cyber Security Contest (Substitute)
   - Interests: Coding, Programming, AI Vibing
   - Skills showcase: HTML, CSS, JavaScript, Python, Firebase, AI Tools
   - Responsive layout (photo left, text right on desktop; stacked on mobile)
   - Scroll-triggered fade-in animations

4. **Timeline Section**
   - Vertical timeline with gradient connector line
   - Animated pulsing dots on timeline
   - Three milestones:
     * 2025 - Completed St. John's Grammar School
     * 2024 - National Cyber Security Contest
     * Future - Aspiring Web Developer & AI Innovator
   - 3D card effects with hover transformations
   - Alternating left-right layout

5. **Projects Section**
   - Two featured project cards with 3D tilt effect on mouse movement
   - Project 1: AI Music Converter (transforms songs into drill beats)
   - Project 2: Web Login System (Firebase authentication)
   - Each card includes: icon, title, description, technology tags, demo/GitHub links
   - Hover effects with shadow and transformation

6. **Contact Section**
   - Email: calvinselassie1@gmail.com
   - GitHub: github.com/CASHPHARMAR
   - LinkedIn: placeholder (coming soon)
   - Styled "CashPharmar" signature
   - 3D hover effects on contact cards

7. **Footer**
   - Copyright notice: © 2025 Calvin Selassie (CashPharmar)
   - Quick navigation links
   - Subtle hover effects

## System Architecture

### Frontend Architecture

**Technology Stack**
- Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- Google Fonts integration (Inter and Poppins font families)
- Canvas-based particle animation system
- SVG graphics for logo rendering

**Design Patterns**
- **Component-based sections**: The site is divided into semantic sections (home, about, timeline, projects, contact)
- **CSS custom properties (variables)**: Centralized theming system using CSS variables for colors, fonts, and shadows
- **Local state management**: Browser localStorage used for persisting user preferences (theme and background settings)
- **Event-driven architecture**: JavaScript uses event listeners for user interactions (theme toggle, background toggle, scroll animations)

**Key Architectural Decisions**

1. **Dual Background System**
   - Problem: Provide visual variety and user choice for background aesthetics
   - Solution: Implemented two independent background systems (gradient waves and particle canvas) that can be toggled
   - The particle system uses HTML5 Canvas API with 100 particles
   - The gradient wave system uses pure CSS animations
   - User preference persisted via localStorage
   - **Fixed:** Background toggle now properly deactivates gradient before activating particles on page load

2. **Theme Management**
   - Problem: Support both light and dark viewing preferences
   - Solution: CSS variable-based theming with body class toggle
   - All colors defined as CSS custom properties at `:root` level
   - Dark mode overrides applied through `.dark-mode` class
   - Theme state persisted in localStorage and loaded on page initialization
   - Dynamic icon updates (sun/moon) to reflect current theme

3. **3D Animation System**
   - Hero section: Floating animation with continuous up/down movement
   - Profile image: 3D tilt effect based on mouse position
   - Project cards: Dynamic 3D tilt following cursor movement
   - Timeline items: Slide-in animations triggered by scroll
   - Buttons: Floating animation and scale effects on hover

4. **Performance Considerations**
   - Particle system controlled by activation/deactivation flags to prevent unnecessary rendering
   - Font preconnect directives for Google Fonts to optimize loading
   - Inline SVG favicon to eliminate additional HTTP requests
   - Intersection Observer API for efficient scroll-triggered animations
   - RequestAnimationFrame for smooth particle animations

5. **Navigation Structure**
   - Single-page application (SPA) pattern with anchor-based navigation
   - Smooth scrolling enabled via CSS (`scroll-behavior: smooth`)
   - Fixed navbar with backdrop blur effect
   - Responsive mobile menu with hamburger toggle

### Styling Architecture

**CSS Organization**
- Global variables for theming consistency
- Separate sections for reset styles, base styles, and component styles
- Shadow system with multiple levels (sm, md, lg, 3d) for depth hierarchy
- Font stack with primary (Poppins) and secondary (Inter) typefaces
- Responsive breakpoints: 968px (tablet), 640px (mobile)

**Color System**
- Gradient-based accent colors (cyan to purple to pink)
- Semantic color naming (primary, secondary, accent-1/2/3)
- Border and card background variables for consistent UI elements
- Dark mode color overrides for accessibility

### Animation Systems

**Canvas Particle System**
- Managed through global state (`particlesActive` flag)
- Fixed particle count (100) for performance balance
- Particle class with update/draw methods
- Connection lines drawn between nearby particles
- Color adaptation based on theme (light/dark mode)
- Separate activation/deactivation functions for lifecycle management

**CSS Animation System**
- Gradient waves created through CSS animations (15s infinite loop)
- Logo glow effect (2s alternate animation)
- Hero floating animation (3s infinite ease-in-out)
- Button floating animation (2s infinite)
- Timeline pulse animation (2s infinite)
- Fade-in, slide-in, and scale effects

**JavaScript Animation System**
- Typing effect for hero subtitle (100ms per character)
- Parallax effect on hero section during scroll
- 3D tilt effects using mouse position tracking
- Scroll-triggered reveal animations using Intersection Observer
- Smooth scrolling to anchor links

## File Structure

```
/
├── index.html                 # Main HTML structure with all sections
├── style.css                 # Complete styling with animations and responsive design
├── script.js                 # Interactive features and animations
├── replit.md                 # Project documentation (this file)
└── attached_assets/
    └── IMG-20250718-WA0005_1759766956927.jpg  # Profile photo
```

## External Dependencies

### Third-Party Services

**Google Fonts API**
- Fonts: Inter (weights: 300, 400, 500, 600, 700) and Poppins (weights: 300, 400, 500, 600, 700, 800)
- Preconnect optimization implemented for performance
- Display swap strategy for font loading

### Browser APIs

**LocalStorage API**
- Key: `theme` - Stores user's theme preference ('light' or 'dark')
- Key: `background` - Stores background animation preference ('gradient' or 'particles')

**Canvas API**
- Used for particle background animation system
- Accessed via `particles-canvas` element ID
- RequestAnimationFrame for smooth rendering

**Intersection Observer API**
- Used for scroll-triggered animations
- Threshold: 0.1 (10% visibility triggers animation)
- Root margin: 0px 0px -100px 0px

**No External Libraries**
- Project deliberately uses no JavaScript frameworks or libraries
- All functionality implemented with native browser APIs
- No build tools or package managers required

## Development Notes

**Code Quality**
- Well-commented code throughout all files
- Semantic HTML structure
- BEM-inspired naming conventions for CSS classes
- Modular JavaScript with clear function separation
- Consistent indentation and formatting

**Browser Compatibility**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses ES6+ JavaScript features
- CSS Grid and Flexbox for layouts
- Backdrop filter may require vendor prefixes

**Responsive Breakpoints**
- Desktop: > 968px (multi-column layouts, full animations)
- Tablet: 640px - 968px (adjusted layouts, simplified animations)
- Mobile: < 640px (stacked layouts, hamburger menu)

## Recent Changes

**October 6, 2025**
- Initial portfolio website creation with all features
- Implemented sticky navbar with animated CashPharmar logo
- Added hero section with 3D floating animations
- Created dual background system (gradient waves + particle canvas)
- Built About Me section with profile photo and 3D tilt effect
- Developed vertical timeline with pulsing animations
- Designed project cards with 3D hover tilt effects
- Set up contact section with email/GitHub/LinkedIn links
- Implemented dark mode toggle with localStorage persistence
- Added background animation toggle with localStorage persistence
- Fixed background toggle persistence bug (gradient not deactivating on particles load)
- Made website fully responsive for desktop, tablet, and mobile
- Added comprehensive scroll animations and parallax effects
- Included well-commented code across all three files

## Contact Information

- **Email:** calvinselassie1@gmail.com
- **GitHub:** github.com/CASHPHARMAR
- **LinkedIn:** Coming soon

## Future Enhancements

Potential features for future updates:
- Add actual project demo links and GitHub repositories
- Integrate contact form with backend email service
- Add blog section for technical articles
- Implement additional project cards as portfolio grows
- Add testimonials section
- Include downloadable resume/CV
- Add loading animations for page transitions
- Implement more interactive 3D effects
- Add accessibility improvements (ARIA labels, keyboard navigation)
- Optimize images for faster loading
