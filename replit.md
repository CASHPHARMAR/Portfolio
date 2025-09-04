# Portfolio Website

## Overview

This is a modern, interactive portfolio website for Calvin Selassie (CashPharmar), an aspiring web developer and AI enthusiast. The site is built as a single-page application using vanilla HTML, CSS, and JavaScript, featuring smooth animations, dark mode support, and responsive design. The portfolio showcases personal projects, timeline, and contact information with a focus on clean aesthetics and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single-page application (SPA)** built with vanilla HTML, CSS, and JavaScript
- **Component-based JavaScript structure** using ES6 classes for modularity
- **CSS custom properties (CSS variables)** for theme management and easy customization
- **Responsive design** using CSS Grid and Flexbox for cross-device compatibility

### UI/UX Design Patterns
- **Section-based layout** with navigation between Home, About, Timeline, Projects, and Contact
- **Hero section** with animated background (configurable between waves and particles)
- **Smooth scrolling** and intersection observer-based animations
- **Dark/light mode toggle** with system preference detection
- **Gradient-based color scheme** with purple/blue primary colors

### Animation System
- **Configurable hero background animations** (waves or particles)
- **Scroll-triggered animations** using Intersection Observer API
- **Reduced motion support** for accessibility compliance
- **Smooth transitions** with CSS transforms and opacity changes

### Styling Architecture
- **CSS custom properties** for centralized theme management
- **BEM-inspired naming conventions** for maintainable CSS
- **Mobile-first responsive design** approach
- **Modular CSS structure** with logical section organization

### Performance Considerations
- **Vanilla JavaScript** for minimal bundle size
- **Efficient animation loops** with requestAnimationFrame
- **Optimized font loading** with Google Fonts preconnect
- **Reduced motion detection** for accessibility and performance

## External Dependencies

### Web Fonts
- **Google Fonts (Poppins)** - Primary typography with multiple weights (300-700)
- **Preconnect optimization** for faster font loading

### Browser APIs
- **Intersection Observer API** - For scroll-triggered animations
- **matchMedia API** - For dark mode and reduced motion detection
- **localStorage API** - For persisting user preferences
- **requestAnimationFrame** - For smooth animations

### No Backend Dependencies
- Static website with no server-side components
- No database requirements
- No external API integrations
- Client-side only architecture suitable for static hosting