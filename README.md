# Logi - Interactive Logic Gates Learning Platform

An engaging, browser-based educational web application for learning digital logic gates through beautiful animations and hands-on experimentation.

## 🚀 Features

- **Interactive Logic Gates** - AND, OR, NOT, NAND, NOR, XOR, XNOR gates with real-time simulation
- **Beautiful Animations** - Smooth, 60fps animations powered by Framer Motion
- **Circuit Building** - Drag-and-drop interface for creating custom circuits
- **Learning Modules** - Progressive lessons with guided tutorials and quizzes
- **Truth Tables** - Interactive truth tables with visual highlighting
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Zero Setup** - Runs entirely in the browser, no installation required

## 🛠️ Technology Stack

- **React 19** + **TypeScript** - Modern React with strict type safety
- **Vite** - Lightning-fast development and optimized builds
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Production-ready animation library
- **Vitest** - Fast unit testing with comprehensive coverage

## 📋 Quick Start

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn package manager

### Development Setup

```bash
# Clone the repository
git clone https://github.com/jerry-li/Logi.git
cd Logi

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run preview          # Preview production build locally

# Building
npm run build            # Create optimized production build
npm run deploy           # Build and deploy to GitHub Pages

# Code Quality
npm run lint             # Run ESLint for code quality checks
npm run lint:fix         # Automatically fix linting issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm run test             # Run unit tests
npm run test:ui          # Run tests with interactive UI
npm run test:coverage    # Generate test coverage report
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── LogicGates/     # Gate components (AND, OR, NOT, etc.)
│   ├── Simulation/     # Circuit simulation and visualization
│   ├── Learning/       # Educational content and tutorials
│   └── UI/             # Shared UI components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
│   ├── logic.ts        # Logic gate calculations
│   ├── circuit.ts      # Circuit manipulation
│   ├── storage.ts      # Local storage operations
│   └── validation.ts   # Input validation
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── styles/             # Global styles and Tailwind config
```

## 🎓 Learning Modules

1. **Digital Logic Basics** - Binary concepts and digital signals
2. **Basic Logic Gates** - AND, OR, NOT gates with truth tables
3. **Advanced Logic Gates** - NAND, NOR, XOR, XNOR gates
4. **Circuit Building** - Combining gates into complex circuits
5. **Practice & Assessment** - Interactive quizzes and challenges

## 🎨 Design System

The application uses a carefully crafted design system built on Tailwind CSS:

- **Typography** - Inter font family with optimized loading
- **Colors** - Semantic color palette for logic states and UI elements
- **Animations** - Custom keyframes for gate interactions and signal flow
- **Components** - Reusable component classes for gates, wires, and UI elements

## 📱 Browser Support

- **Chrome 90+** (Primary target)
- **Firefox 88+** (Full support)
- **Safari 14+** (WebKit optimizations)
- **Edge 90+** (Chromium-based)

## 🚀 Deployment

### GitHub Pages (Automatic)

The application automatically deploys to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

Test coverage targets:
- **Core Logic** - 100% coverage for gate calculations
- **Utilities** - 95+ coverage for helper functions
- **Components** - 90+ coverage for React components

## 📊 Performance

Performance targets and optimizations:

- **Initial Load** - < 2 seconds on 3G connection
- **Bundle Size** - < 1MB initial bundle
- **Animation FPS** - Consistent 60fps on modern devices
- **Lighthouse Score** - 90+ across all metrics

## 🔧 Configuration

### Environment Variables

```bash
# Optional: Custom deployment base URL
VITE_BASE_URL=/custom-path/

# Optional: Enable development features
VITE_DEV_MODE=true
```

### Build Optimization

The build process includes:
- Code splitting with vendor and utility chunks
- Tree shaking for unused code elimination
- Asset optimization with compression
- Source maps for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Advanced circuit elements (flip-flops, counters)
- [ ] Circuit export/import functionality
- [ ] Collaborative circuit building
- [ ] Progressive Web App features
- [ ] Multi-language support
- [ ] Accessibility enhancements

## 📚 Documentation

- [Technical Architecture](TECHNICAL_ARCHITECTURE.md) - Detailed technical decisions and architecture
- [Project Plan](PROJECT_PLAN.md) - Project timeline and milestones

## 💡 Educational Goals

Logi aims to make digital logic accessible and engaging by:

- **Visual Learning** - Seeing how logic gates work in real-time
- **Hands-on Practice** - Building circuits interactively
- **Progressive Difficulty** - Learning from basic to advanced concepts
- **Immediate Feedback** - Real-time validation and guidance

---

Built with ❤️ for education and learning
