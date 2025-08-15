# Technical Architecture - Logi

## Overview

Logi is a modern, browser-based educational web application for learning digital logic gates through interactive animations and hands-on experimentation. The application is built with performance, maintainability, and user experience as primary concerns.

## Technology Stack

### Core Framework
- **React 19** - Latest React with concurrent features and improved performance
- **TypeScript 5.8** - Strict type checking with latest language features
- **Vite 7** - Modern build tool with fast hot reload and optimized production builds

### Styling & Animation
- **Tailwind CSS 4** - Utility-first CSS framework with modern features
- **Framer Motion 12** - Production-ready motion library for complex animations
- **PostCSS** - CSS preprocessing with autoprefixer

### Development & Testing
- **Vitest** - Fast unit testing framework with native ESM support
- **React Testing Library** - Component testing utilities
- **ESLint 9** - Modern linting with flat config
- **Prettier** - Code formatting with consistent style

### Build & Deployment
- **GitHub Pages** - Zero-cost static hosting
- **Bundle optimization** - Code splitting and asset optimization
- **PWA ready** - Offline support capability

## Project Structure

```
src/
├── components/           # React components organized by feature
│   ├── LogicGates/      # Individual gate components (AND, OR, NOT, etc.)
│   ├── Simulation/      # Circuit simulation and visualization
│   ├── Learning/        # Educational content and tutorials
│   └── UI/              # Shared UI components
├── hooks/               # Custom React hooks
├── utils/               # Pure utility functions
│   ├── logic.ts         # Logic gate calculations and simulation
│   ├── circuit.ts       # Circuit manipulation utilities
│   ├── storage.ts       # LocalStorage operations
│   ├── validation.ts    # Input validation and error handling
│   └── motion.ts        # Animation configurations
├── types/               # TypeScript type definitions
├── constants/           # Application constants and configurations
├── contexts/            # React context providers
├── styles/              # Global styles and Tailwind config
└── test/                # Test utilities and setup
```

## Component Architecture

### Design Principles

1. **Single Responsibility** - Each component has one clear purpose
2. **Composition over Inheritance** - Build complex UI through composition
3. **Props Interface** - Well-defined TypeScript interfaces for all props
4. **Performance First** - Optimized for 60fps animations and fast interactions

### Component Hierarchy

```
App
├── Router (if needed for future expansion)
├── ThemeProvider
├── LearningModuleProvider
└── Main Layout
    ├── Header
    │   ├── Navigation
    │   └── Settings
    ├── Sidebar (Learning Progress)
    └── Content Area
        ├── Circuit Canvas
        │   ├── LogicGates (AND, OR, NOT, etc.)
        │   ├── Wires
        │   └── SignalFlow
        ├── Control Panel
        │   ├── GatePalette
        │   └── TruthTable
        └── Learning Content
            ├── Tutorial
            ├── Lesson
            └── Quiz
```

### Key Components

#### LogicGate Components
- Reusable gate components with consistent interface
- Animated state transitions using Framer Motion
- Drag-and-drop functionality for circuit building
- Real-time visual feedback for input/output states

#### Circuit Simulation
- Real-time logic simulation engine
- Wire routing with smooth animations
- Signal flow visualization
- Performance optimized for complex circuits

#### Learning Modules
- Progressive lesson structure
- Interactive truth tables
- Guided tutorials with step-by-step instructions
- Assessment and progress tracking

## State Management Strategy

### Context API Approach
We use React Context API for global state management instead of Redux/Zustand for the following reasons:

1. **Simplicity** - Reduced boilerplate for educational application
2. **Performance** - Native React optimization with concurrent features
3. **Type Safety** - Excellent TypeScript integration
4. **Bundle Size** - No additional dependencies

### State Architecture

```typescript
// Global Application State
interface AppState {
  // User progress and settings
  user: {
    progress: UserProgress;
    settings: AppSettings;
  };
  
  // Current learning state
  learning: {
    currentModule: string;
    currentLesson: string;
    completedLessons: string[];
  };
  
  // Circuit editor state
  circuit: {
    current: Circuit;
    isSimulating: boolean;
    selectedGates: string[];
    clipboard: Circuit | null;
  };
  
  // UI state
  ui: {
    sidebarOpen: boolean;
    theme: 'light' | 'dark' | 'auto';
    animationSpeed: 'slow' | 'normal' | 'fast';
  };
}
```

### Context Providers

1. **AppProvider** - Global application state and settings
2. **LearningProvider** - Learning progress and content
3. **CircuitProvider** - Circuit editor and simulation state
4. **ThemeProvider** - Theme and appearance settings

## Animation Performance Strategy

### Framer Motion Optimization

1. **GPU Acceleration** - Transform-based animations using `transform` properties
2. **Reduce Layout Thrashing** - Avoid animating layout-affecting properties
3. **Stagger Animations** - Smooth entrance animations for lists and groups
4. **Gesture Recognition** - Optimized touch and mouse interactions

### Animation Patterns

```typescript
// Gate entrance animation
const gateVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.3, ease: "backOut" }
  },
  exit: { scale: 0.8, opacity: 0 }
};

// Signal flow animation
const signalVariants = {
  animate: {
    x: [0, 100],
    transition: { 
      duration: 1, 
      ease: "linear", 
      repeat: Infinity 
    }
  }
};
```

### Performance Monitoring

- Frame rate monitoring in development
- Animation performance budgets
- Fallback static states for low-performance devices
- Configurable animation speeds

## Code Organization Patterns

### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `ANDGate.tsx`)
- Utilities: `camelCase.ts` (e.g., `circuitUtils.ts`)
- Types: `index.ts` with descriptive interface names
- Tests: `ComponentName.test.tsx`

### Import/Export Strategy
```typescript
// Barrel exports for clean imports
export * from './LogicGates';
export * from './Simulation';
export * from './Learning';

// Named exports for utilities
export { calculateGateOutput, simulateCircuit } from './logic';
export { createGate, cloneCircuit } from './circuit';
```

### Code Quality Standards
- **TypeScript strict mode** - No implicit any, strict null checks
- **ESLint rules** - Consistent code style and best practices
- **Prettier formatting** - Automated code formatting
- **Test coverage** - Minimum 90% coverage for core logic

## Build and Deployment Configuration

### Build Optimization

1. **Code Splitting** - Automatic route-based and vendor chunks
2. **Tree Shaking** - Unused code elimination
3. **Asset Optimization** - Image compression and format optimization
4. **Bundle Analysis** - Size monitoring and optimization

### Deployment Strategy

#### GitHub Pages
```yaml
# Build configuration for GitHub Pages
base: '/Logi/'
outDir: 'dist'
assetsDir: 'assets'
```

#### Performance Targets
- **Initial Load** - < 2 seconds on 3G
- **Bundle Size** - < 1MB initial bundle
- **Animation FPS** - 60fps on modern devices
- **Lighthouse Score** - > 90 across all metrics

### CI/CD Pipeline
```bash
# Automated deployment workflow
npm run lint          # Code quality check
npm run test          # Unit tests
npm run build         # Production build
npm run deploy        # Deploy to GitHub Pages
```

## Browser Compatibility

### Target Browsers
- **Chrome 90+** (Primary development target)
- **Firefox 88+** (Full feature support)
- **Safari 14+** (WebKit optimizations)
- **Edge 90+** (Chromium-based)

### Progressive Enhancement
- **Core functionality** - Works without JavaScript (basic HTML)
- **Enhanced experience** - Full interactivity with modern browsers
- **Graceful degradation** - Fallbacks for older browsers

### Feature Detection
```typescript
// Modern browser feature detection
const supportsWebGL = !!window.WebGLRenderingContext;
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const supportsResizeObserver = 'ResizeObserver' in window;
```

## Security Considerations

### Client-Side Security
- **Input Validation** - All user inputs validated and sanitized
- **XSS Prevention** - React's built-in XSS protection
- **Content Security Policy** - Strict CSP headers for production
- **Dependency Scanning** - Regular security audits of dependencies

### Data Privacy
- **Local Storage Only** - No external data transmission
- **No Tracking** - Privacy-first approach
- **GDPR Compliant** - No personal data collection

## Testing Strategy

### Unit Testing
- **Logic Functions** - Comprehensive testing of gate calculations
- **Utility Functions** - Edge case testing for circuit operations
- **Component Behavior** - User interaction testing

### Integration Testing
- **Circuit Simulation** - End-to-end simulation testing
- **Learning Flow** - Complete lesson progression testing
- **Performance Testing** - Animation and rendering performance

### Test Structure
```typescript
describe('Logic Gate Calculations', () => {
  it('should calculate AND gate output correctly', () => {
    expect(calculateGateOutput('AND', [1, 1])).toBe(1);
    expect(calculateGateOutput('AND', [1, 0])).toBe(0);
  });
});
```

## Performance Monitoring

### Metrics Tracking
- **Core Web Vitals** - LCP, FID, CLS monitoring
- **Custom Metrics** - Animation frame rates, simulation performance
- **User Experience** - Learning completion rates, engagement time

### Optimization Techniques
1. **Lazy Loading** - Component and route-based lazy loading
2. **Memoization** - React.memo and useMemo for expensive calculations
3. **Virtual Scrolling** - For large lists of components
4. **Debouncing** - Input handling optimization

## Future Extensibility

### Planned Enhancements
- **Advanced Circuits** - Sequential logic, flip-flops, counters
- **Export/Import** - Circuit sharing and collaboration
- **PWA Features** - Offline support and app installation
- **Accessibility** - Enhanced screen reader support

### Architecture Flexibility
- **Modular Design** - Easy addition of new gate types
- **Plugin System** - Extensible learning modules
- **Theme System** - Customizable visual themes
- **Internationalization** - Multi-language support ready

## Development Workflow

### Local Development
```bash
npm run dev          # Start development server
npm run test         # Run tests in watch mode
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
```

### Production Build
```bash
npm run build        # Create production build
npm run preview      # Preview production build
npm run analyze      # Analyze bundle size
```

### Quality Gates
1. **Pre-commit** - Linting and formatting checks
2. **Pre-push** - Full test suite execution
3. **CI Pipeline** - Automated testing and deployment
4. **Performance Budget** - Bundle size and speed monitoring

---

This technical architecture provides a solid foundation for building a high-performance, maintainable, and scalable educational web application for learning digital logic gates.