# UI Design Specifications - Logic Gates Learning Webapp

## Design Philosophy

The visual design system for Logi emphasizes clarity, educational focus, and engaging interactions while maintaining a clean, distraction-free interface. The design language balances technical precision with approachable aesthetics to make complex digital logic concepts accessible to learners of all levels.

### Core Design Principles

1. **Educational Clarity**: Every visual element serves the learning experience
2. **Progressive Disclosure**: Information revealed as needed to prevent overwhelm
3. **Consistent Metaphors**: Real-world electronics inspire digital representations
4. **Accessible by Default**: Design decisions prioritize universal usability
5. **Performance-Conscious**: Visual fidelity balanced with smooth performance

## Color System

### Primary Color Palette

#### Brand Colors
```css
/* Primary Brand */
--color-primary-900: #1a202c;     /* Deep navy - headers, text */
--color-primary-800: #2d3748;     /* Dark slate - secondary text */
--color-primary-700: #4a5568;     /* Medium slate - borders */
--color-primary-600: #718096;     /* Light slate - disabled states */
--color-primary-500: #a0aec0;     /* Silver - backgrounds */
--color-primary-400: #cbd5e0;     /* Light silver - dividers */
--color-primary-300: #e2e8f0;     /* Very light - hover states */
--color-primary-200: #edf2f7;     /* Off-white - backgrounds */
--color-primary-100: #f7fafc;     /* Near white - page background */

/* Accent/Action */
--color-accent-600: #3182ce;      /* Primary blue - CTAs */
--color-accent-500: #4299e1;      /* Medium blue - hover states */
--color-accent-400: #63b3ed;      /* Light blue - focus states */
--color-accent-300: #90cdf4;      /* Very light blue - backgrounds */
```

#### Educational Logic Colors
```css
/* Logic State Colors */
--color-logic-high: #38a169;      /* Green - TRUE/HIGH/1 state */
--color-logic-low: #e53e3e;       /* Red - FALSE/LOW/0 state */
--color-logic-undefined: #ed8936;  /* Orange - undefined/floating state */
--color-logic-disabled: #a0aec0;   /* Gray - disabled components */

/* Signal Flow Colors */
--color-signal-active: #38a169;    /* Green - active signal path */
--color-signal-inactive: #cbd5e0;  /* Light gray - inactive path */
--color-signal-pulse: #4299e1;     /* Blue - animated signal pulse */
```

#### Semantic Colors
```css
/* Success States */
--color-success-700: #2f855a;     /* Dark green - success text */
--color-success-500: #38a169;     /* Medium green - success elements */
--color-success-100: #f0fff4;     /* Light green - success backgrounds */

/* Warning States */
--color-warning-700: #c05621;     /* Dark orange - warning text */
--color-warning-500: #ed8936;     /* Medium orange - warning elements */
--color-warning-100: #fffaf0;     /* Light orange - warning backgrounds */

/* Error States */
--color-error-700: #c53030;       /* Dark red - error text */
--color-error-500: #e53e3e;       /* Medium red - error elements */
--color-error-100: #fed7d7;       /* Light red - error backgrounds */

/* Information States */
--color-info-700: #2c5282;        /* Dark blue - info text */
--color-info-500: #3182ce;        /* Medium blue - info elements */
--color-info-100: #ebf8ff;        /* Light blue - info backgrounds */
```

### Color Usage Guidelines

#### Accessibility Requirements
- **Minimum Contrast**: 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- **Enhanced Contrast**: 7:1 for normal text, 4.5:1 for large text (WCAG AAA)
- **Color Independence**: Never rely solely on color to convey information
- **High Contrast Mode**: Alternative color scheme with maximum contrast

#### Logic State Representation
- **Consistent Mapping**: GREEN always = HIGH/TRUE/1, RED always = LOW/FALSE/0
- **Pattern Support**: Use patterns or shapes alongside colors for colorblind users
- **Animation Consistency**: State changes use consistent color transitions

#### Context-Sensitive Coloring
- **Interactive Elements**: Hover states use color-accent-500, focus uses color-accent-400
- **Feedback States**: Success/warning/error colors used only for feedback, not decorative
- **Brand Consistency**: Primary brand colors for navigation and structure

## Typography System

### Font Families

#### Primary Font Stack
```css
/* Interface Text */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

/* Code and Technical Content */
font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, 
             'Cascadia Code', 'Roboto Mono', monospace;

/* Mathematical Expressions */
font-family: 'Computer Modern', 'Latin Modern Math', 
             'STIX Two Math', serif;
```

### Typography Scale

#### Heading Hierarchy
```css
/* Display Headings */
--text-display-xl: 4.5rem;    /* 72px - Hero titles */
--text-display-lg: 3.75rem;   /* 60px - Page titles */
--text-display-md: 3rem;      /* 48px - Section titles */

/* Content Headings */
--text-heading-xl: 2.25rem;   /* 36px - h1 */
--text-heading-lg: 1.875rem;  /* 30px - h2 */
--text-heading-md: 1.5rem;    /* 24px - h3 */
--text-heading-sm: 1.25rem;   /* 20px - h4 */
--text-heading-xs: 1.125rem;  /* 18px - h5 */

/* Body Text */
--text-body-xl: 1.25rem;      /* 20px - Large body */
--text-body-lg: 1.125rem;     /* 18px - Default body */
--text-body-md: 1rem;         /* 16px - Compact body */
--text-body-sm: 0.875rem;     /* 14px - Small text */
--text-body-xs: 0.75rem;      /* 12px - Caption text */
```

#### Font Weights
```css
--font-weight-light: 300;     /* Light text */
--font-weight-normal: 400;    /* Regular body text */
--font-weight-medium: 500;    /* Emphasized text */
--font-weight-semibold: 600;  /* Subheadings */
--font-weight-bold: 700;      /* Headings */
--font-weight-extrabold: 800; /* Strong emphasis */
```

#### Line Heights
```css
--line-height-tight: 1.25;    /* Dense content */
--line-height-normal: 1.5;    /* Default body text */
--line-height-relaxed: 1.75;  /* Reading content */
--line-height-loose: 2;       /* Very comfortable reading */
```

### Typography Usage Guidelines

#### Educational Content Optimization
- **Reading Comfort**: 1.5x line height minimum for sustained reading
- **Scanning Support**: Clear hierarchy with consistent spacing ratios
- **Technical Accuracy**: Monospace fonts for code, formulas, and precise alignments
- **Multilingual Support**: Font stacks include international character support

#### Accessibility Considerations
- **Minimum Size**: 16px base font size for body text
- **Scalability**: Design works at 200% zoom without horizontal scrolling
- **Dyslexia Support**: Adequate character spacing and clear letter forms
- **Screen Reader Compatibility**: Semantic markup with proper heading structure

## Component Design Patterns

### Logic Gate Components

#### Gate Representation Standards
```css
/* Gate Dimensions */
--gate-width-standard: 80px;
--gate-height-standard: 60px;
--gate-input-pin-size: 8px;
--gate-output-pin-size: 8px;
--gate-border-width: 2px;
--gate-corner-radius: 4px;

/* Gate Visual Properties */
--gate-background: var(--color-primary-100);
--gate-border: var(--color-primary-700);
--gate-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
--gate-hover-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
```

#### Gate State Indicators
- **Input Pins**: Circular, 8px diameter, color indicates logic state
- **Output Pins**: Circular, 8px diameter, color shows computed result
- **Gate Body**: Light background with subtle shadow, hover state elevation
- **Labels**: Gate type clearly labeled inside body (AND, OR, NOT, etc.)

#### Interactive States
```css
/* Default State */
.logic-gate {
  background: var(--gate-background);
  border: var(--gate-border-width) solid var(--gate-border);
  box-shadow: var(--gate-shadow);
  transition: all 0.2s ease-in-out;
}

/* Hover State */
.logic-gate:hover {
  transform: translateY(-1px);
  box-shadow: var(--gate-hover-shadow);
}

/* Active/Selected State */
.logic-gate.selected {
  border-color: var(--color-accent-500);
  box-shadow: 0 0 0 2px var(--color-accent-300);
}

/* Disabled State */
.logic-gate.disabled {
  opacity: 0.6;
  background: var(--color-primary-200);
  border-color: var(--color-primary-400);
}
```

### Circuit Building Interface

#### Wire/Connection System
```css
/* Wire Properties */
--wire-width-default: 3px;
--wire-width-active: 4px;
--wire-color-inactive: var(--color-signal-inactive);
--wire-color-active: var(--color-signal-active);
--wire-corner-radius: 2px;

/* Connection Points */
--connection-point-size: 12px;
--connection-hover-size: 16px;
--connection-active-size: 14px;
```

#### Grid System
```css
/* Circuit Grid */
--grid-size: 20px;
--grid-color: var(--color-primary-300);
--grid-opacity: 0.3;
--snap-tolerance: 10px;
```

### Truth Table Components

#### Table Structure
```css
/* Truth Table Styling */
.truth-table {
  border-collapse: collapse;
  width: 100%;
  background: var(--color-primary-100);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.truth-table th {
  background: var(--color-primary-700);
  color: var(--color-primary-100);
  padding: 12px 16px;
  font-weight: var(--font-weight-semibold);
  text-align: center;
}

.truth-table td {
  padding: 10px 16px;
  text-align: center;
  border-bottom: 1px solid var(--color-primary-300);
  font-family: var(--font-mono);
}

/* Logic Value Styling */
.logic-value-high {
  color: var(--color-logic-high);
  font-weight: var(--font-weight-bold);
}

.logic-value-low {
  color: var(--color-logic-low);
  font-weight: var(--font-weight-bold);
}
```

### Interactive Control Components

#### Button System
```css
/* Primary Button */
.button-primary {
  background: var(--color-accent-600);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.button-primary:hover {
  background: var(--color-accent-500);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.button-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Secondary Button */
.button-secondary {
  background: transparent;
  color: var(--color-accent-600);
  border: 2px solid var(--color-accent-600);
  padding: 10px 22px;
  border-radius: 6px;
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.button-secondary:hover {
  background: var(--color-accent-600);
  color: white;
}
```

#### Toggle Switches
```css
/* Logic State Toggle */
.logic-toggle {
  width: 60px;
  height: 30px;
  background: var(--color-logic-low);
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.logic-toggle.active {
  background: var(--color-logic-high);
}

.logic-toggle::after {
  content: '';
  width: 26px;
  height: 26px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.logic-toggle.active::after {
  transform: translateX(30px);
}
```

## Layout System

### Grid Framework

#### Responsive Breakpoints
```css
/* Breakpoint System */
--breakpoint-xs: 320px;   /* Small phones */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Large laptops */
--breakpoint-2xl: 1536px; /* Desktop displays */
```

#### Container Widths
```css
/* Container Constraints */
--container-xs: 100%;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Content Width Limits */
--content-width-reading: 65ch;  /* Optimal reading width */
--content-width-form: 480px;    /* Form optimal width */
--content-width-full: 100%;     /* Full available width */
```

### Page Layout Templates

#### Main Application Layout
```css
/* Application Shell */
.app-shell {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "sidebar footer";
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.app-header {
  grid-area: header;
  background: var(--color-primary-100);
  border-bottom: 1px solid var(--color-primary-300);
  padding: 16px 24px;
}

.app-sidebar {
  grid-area: sidebar;
  background: var(--color-primary-200);
  border-right: 1px solid var(--color-primary-300);
  padding: 24px;
}

.app-main {
  grid-area: main;
  padding: 32px;
  overflow-y: auto;
}

.app-footer {
  grid-area: footer;
  background: var(--color-primary-100);
  border-top: 1px solid var(--color-primary-300);
  padding: 16px 24px;
}
```

#### Learning Module Layout
```css
/* Learning Page Structure */
.learning-layout {
  display: grid;
  grid-template-areas:
    "progress progress"
    "content tools"
    "navigation navigation";
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 24px;
  height: 100%;
}

.learning-progress {
  grid-area: progress;
  background: var(--color-primary-100);
  border-radius: 8px;
  padding: 16px;
}

.learning-content {
  grid-area: content;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.learning-tools {
  grid-area: tools;
  background: var(--color-primary-100);
  border-radius: 12px;
  padding: 24px;
}

.learning-navigation {
  grid-area: navigation;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}
```

### Responsive Behavior

#### Mobile Layout Adaptations
```css
/* Mobile-First Responsive Design */
@media (max-width: 768px) {
  .app-shell {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .app-sidebar {
    display: none; /* Hidden by default, shown via overlay */
  }
  
  .learning-layout {
    grid-template-areas:
      "progress"
      "content"
      "tools"
      "navigation";
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .app-main {
    padding: 16px;
  }
}

/* Tablet Layout Optimizations */
@media (min-width: 769px) and (max-width: 1023px) {
  .app-shell {
    grid-template-columns: 240px 1fr;
  }
  
  .learning-layout {
    grid-template-columns: 1.5fr 1fr;
  }
  
  .app-main {
    padding: 24px;
  }
}
```

#### Component Responsive Patterns
```css
/* Responsive Component Behavior */
.logic-gate {
  /* Scale gates appropriately on smaller screens */
  width: var(--gate-width-standard);
  height: var(--gate-height-standard);
}

@media (max-width: 640px) {
  .logic-gate {
    width: calc(var(--gate-width-standard) * 0.8);
    height: calc(var(--gate-height-standard) * 0.8);
  }
  
  .truth-table {
    font-size: var(--text-body-sm);
  }
  
  .truth-table th,
  .truth-table td {
    padding: 8px 12px;
  }
}
```

## Visual Feedback Systems

### State Indication Patterns

#### Loading States
```css
/* Content Loading Skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-primary-300) 0%,
    var(--color-primary-200) 50%,
    var(--color-primary-300) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Progress Indicators */
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-primary-300);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-accent-600);
  border-radius: 4px;
  transition: width 0.5s ease-out;
}
```

#### Success/Error Feedback
```css
/* Notification Toast System */
.notification {
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: notification-slide-in 0.3s ease-out;
}

.notification.success {
  background: var(--color-success-100);
  border-left: 4px solid var(--color-success-500);
  color: var(--color-success-700);
}

.notification.error {
  background: var(--color-error-100);
  border-left: 4px solid var(--color-error-500);
  color: var(--color-error-700);
}

.notification.warning {
  background: var(--color-warning-100);
  border-left: 4px solid var(--color-warning-500);
  color: var(--color-warning-700);
}

@keyframes notification-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

#### Interactive Feedback
```css
/* Hover and Focus States */
.interactive-element {
  transition: all 0.2s ease-in-out;
  outline: none;
}

.interactive-element:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.interactive-element:focus {
  box-shadow: 0 0 0 3px var(--color-accent-300);
}

.interactive-element:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Ripple Effect for Clicks */
.ripple-effect {
  position: relative;
  overflow: hidden;
}

.ripple-effect::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  to {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}
```

## Accessibility Design Patterns

### Focus Management
```css
/* High Visibility Focus Indicators */
.focus-visible {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary-900);
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  z-index: 1000;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 6px;
}
```

### High Contrast Mode Support
```css
/* High Contrast Theme */
@media (prefers-contrast: high) {
  :root {
    --color-primary-900: #000000;
    --color-primary-100: #ffffff;
    --color-accent-600: #0000ff;
    --color-logic-high: #008000;
    --color-logic-low: #ff0000;
  }
  
  .logic-gate {
    border-width: 3px;
  }
  
  .button-primary {
    border: 2px solid var(--color-primary-900);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .skeleton {
    animation: none;
    background: var(--color-primary-300);
  }
}
```

### Screen Reader Optimization
```css
/* Screen Reader Only Content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Live Region Styling */
.live-region {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

## Performance Considerations

### CSS Optimization
```css
/* Performance-Optimized Properties */
.performant-animation {
  /* Use transform and opacity for 60fps animations */
  transform: translateX(0);
  opacity: 1;
  will-change: transform, opacity;
}

/* Avoid layout-triggering properties in animations */
.avoid-in-animations {
  /* Don't animate: width, height, padding, margin, border-width */
  /* Prefer: transform: scale(), padding via transform */
}

/* Hardware Acceleration Triggers */
.hardware-accelerated {
  transform: translateZ(0); /* Force GPU layer */
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### Asset Loading Strategy
```css
/* Critical Above-Fold Styles Inlined */
/* Non-critical styles loaded asynchronously */

/* Font Loading Optimization */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap; /* Prevent invisible text during font load */
}
```

---

**Document Version**: 1.0  
**Creation Date**: August 15, 2025  
**Last Updated**: August 15, 2025  
**Next Review**: End of Phase 2  
**Dependencies**: UX_DESIGN.md, ANIMATION_SPECS.md  
**Approval Required**: Product Designer, Frontend Engineer