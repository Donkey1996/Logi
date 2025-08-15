# Animation Specifications - Logic Gates Learning Webapp

## Animation Philosophy

Animations in the Logic Gates Learning Webapp serve three primary purposes: **Educational Clarity**, **Engagement Enhancement**, and **Feedback Communication**. Every animation must contribute to the learning experience while maintaining smooth 60fps performance across all target devices.

### Core Animation Principles

1. **Purposeful Motion**: Every animation serves a clear educational or UX purpose
2. **Smooth Performance**: Maintain 60fps on all target devices (Chrome 90+, Firefox 88+, Safari 14+)
3. **Accessibility First**: Respect user motion preferences and provide alternatives
4. **Educational Timing**: Animation speeds match learning comprehension rates
5. **Visual Consistency**: Consistent motion language throughout the application

## Performance Requirements

### Target Performance Metrics
- **Frame Rate**: Consistent 60fps (16.67ms per frame)
- **Animation Budget**: Maximum 8ms per frame for animations
- **Memory Usage**: <50MB additional for animation assets
- **CPU Usage**: <15% on medium-tier devices during peak animation
- **Battery Impact**: Minimal impact on mobile devices

### Technical Constraints
```javascript
// Performance Budgets
const ANIMATION_BUDGETS = {
  maxConcurrentAnimations: 12,
  maxParticleCount: 50,
  maxAnimationDuration: 3000, // 3 seconds
  frameTimeTarget: 16.67, // 60fps
  cpuThreshold: 15 // percentage
};
```

## Logic Gate Operation Animations

### Basic Gate Animations

#### AND Gate Animation Sequence
**Duration**: 800ms total
**Trigger**: Input state change
**Purpose**: Demonstrate AND logic operation

```typescript
// Animation Timeline
const andGateAnimation = {
  // Phase 1: Input Signal Reception (0-200ms)
  inputHighlight: {
    duration: 200,
    easing: 'easeOutQuart',
    properties: {
      inputGlow: '0 0 8px var(--color-logic-high)',
      scale: 1.1
    }
  },
  
  // Phase 2: Logic Processing (200-500ms)
  logicProcessing: {
    duration: 300,
    delay: 200,
    easing: 'easeInOutCubic',
    properties: {
      gateBodyPulse: 'brightness(1.2)',
      borderGlow: '0 0 12px var(--color-accent-400)'
    }
  },
  
  // Phase 3: Output Generation (500-800ms)
  outputGeneration: {
    duration: 300,
    delay: 500,
    easing: 'easeOutBack',
    properties: {
      outputPin: {
        color: 'var(--color-logic-high)',
        scale: 1.3,
        glow: '0 0 10px var(--color-logic-high)'
      }
    }
  }
};
```

**Educational Benefits**:
- Visual demonstration of sequential logic processing
- Clear timing shows cause-and-effect relationship
- Output state change is visually prominent

#### OR Gate Animation Sequence
**Duration**: 700ms total
**Trigger**: Any input change to HIGH
**Purpose**: Show OR gate's "any input HIGH" behavior

```typescript
const orGateAnimation = {
  // Immediate Response Pattern (faster than AND)
  inputDetection: {
    duration: 150,
    easing: 'easeOutExpo',
    properties: {
      inputPin: {
        scale: 1.2,
        brightness: 1.5
      }
    }
  },
  
  // Parallel Processing (shows immediate OR behavior)
  rapidProcessing: {
    duration: 200,
    delay: 150,
    easing: 'easeOutQuint',
    properties: {
      gateBody: {
        backgroundColor: 'var(--color-logic-high)',
        opacity: 0.3
      }
    }
  },
  
  // Quick Output (demonstrates OR's immediate response)
  quickOutput: {
    duration: 350,
    delay: 350,
    easing: 'easeOutElastic',
    properties: {
      outputPin: {
        color: 'var(--color-logic-high)',
        scale: 1.4
      }
    }
  }
};
```

#### NOT Gate Animation Sequence
**Duration**: 600ms total
**Trigger**: Input state change
**Purpose**: Demonstrate inversion concept

```typescript
const notGateAnimation = {
  // Input Reception with Inversion Preview
  inputInversion: {
    duration: 200,
    easing: 'easeInQuart',
    properties: {
      inputPin: {
        scale: 1.1,
        color: 'input === HIGH ? var(--color-logic-low) : var(--color-logic-high)'
      }
    }
  },
  
  // Visual Inversion Process
  inversionProcess: {
    duration: 250,
    delay: 200,
    easing: 'easeInOutCubic',
    properties: {
      gateSymbol: {
        rotateY: '180deg',
        scale: 1.1
      },
      bubble: {
        scale: 1.3,
        glow: '0 0 8px var(--color-accent-500)'
      }
    }
  },
  
  // Inverted Output
  invertedOutput: {
    duration: 150,
    delay: 450,
    easing: 'easeOutBounce',
    properties: {
      outputPin: {
        color: 'input === HIGH ? var(--color-logic-low) : var(--color-logic-high)',
        scale: 1.2
      }
    }
  }
};
```

### Advanced Gate Animations

#### XOR Gate Animation Sequence
**Duration**: 1000ms total
**Purpose**: Demonstrate exclusive OR behavior

```typescript
const xorGateAnimation = {
  // Input Comparison Phase
  inputComparison: {
    duration: 300,
    easing: 'easeOutQuart',
    properties: {
      inputPins: {
        scale: [1.1, 1.1],
        glow: ['0 0 6px var(--color-accent-400)', '0 0 6px var(--color-accent-400)']
      }
    }
  },
  
  // Exclusivity Check (visual comparison)
  exclusivityCheck: {
    duration: 400,
    delay: 300,
    easing: 'easeInOutSine',
    properties: {
      comparisonLine: {
        strokeDasharray: '5,5',
        strokeDashoffset: '0',
        opacity: 1
      },
      gateBody: {
        backgroundColor: inputs[0] !== inputs[1] ? 
          'var(--color-success-100)' : 'var(--color-warning-100)'
      }
    }
  },
  
  // Conditional Output
  conditionalOutput: {
    duration: 300,
    delay: 700,
    easing: inputs[0] !== inputs[1] ? 'easeOutElastic' : 'easeOutQuart',
    properties: {
      outputPin: {
        color: inputs[0] !== inputs[1] ? 
          'var(--color-logic-high)' : 'var(--color-logic-low)',
        scale: inputs[0] !== inputs[1] ? 1.4 : 1.0
      }
    }
  }
};
```

#### NAND Gate Animation Sequence
**Duration**: 900ms total
**Purpose**: Demonstrate AND-then-NOT process

```typescript
const nandGateAnimation = {
  // AND Process First
  andPhase: {
    duration: 400,
    easing: 'easeOutQuart',
    properties: {
      andSection: {
        backgroundColor: allInputsHigh ? 'var(--color-logic-high)' : 'var(--color-logic-low)',
        opacity: 0.4
      }
    }
  },
  
  // Inversion Indicator
  inversionTransition: {
    duration: 200,
    delay: 400,
    easing: 'easeInOutBack',
    properties: {
      inversionBubble: {
        scale: 1.5,
        glow: '0 0 12px var(--color-warning-500)'
      }
    }
  },
  
  // Final NAND Output
  nandOutput: {
    duration: 300,
    delay: 600,
    easing: 'easeOutBounce',
    properties: {
      outputPin: {
        color: allInputsHigh ? 'var(--color-logic-low)' : 'var(--color-logic-high)',
        scale: 1.3
      }
    }
  }
};
```

## Signal Flow Visualizations

### Wire Animation System

#### Signal Propagation Animation
**Purpose**: Show how signals travel through circuits
**Performance**: Uses CSS transforms for 60fps

```typescript
const signalPropagation = {
  // Signal Pulse Effect
  signalPulse: {
    duration: 500,
    easing: 'linear',
    infinite: false,
    properties: {
      signalDot: {
        offsetDistance: '0% to 100%', // CSS offset-path
        scale: '1.0 to 1.2 to 1.0',
        opacity: '0.8 to 1.0 to 0.8'
      }
    }
  },
  
  // Wire State Change
  wireStateChange: {
    duration: 200,
    easing: 'easeOutQuart',
    properties: {
      wireColor: 'transition between inactive/active colors',
      wireWidth: 'scale from 3px to 4px on activation',
      wireGlow: 'add subtle glow for active signals'
    }
  }
};
```

#### Multi-Signal Coordination
```typescript
const coordinatedSignals = {
  // Staggered Signal Timing
  signalStagger: {
    staggerDelay: 100, // 100ms between signal starts
    maxConcurrent: 6,  // Performance limit
    priority: 'user-triggered', // User interactions take priority
  },
  
  // Signal Collision Handling
  signalInteraction: {
    collision: 'pass-through', // Signals pass through each other
    merging: 'visual-blend',   // Multiple signals on same wire blend
    timing: 'maintain-individual' // Each signal keeps its timing
  }
};
```

### Circuit Simulation Animations

#### Cascading Logic Updates
**Purpose**: Show how changes propagate through complex circuits

```typescript
const cascadingUpdates = {
  // Wave Propagation Pattern
  logicWave: {
    pattern: 'breadth-first', // Update gates level by level
    timingFunction: 'easeOutQuart',
    baseDelay: 150, // Base time between logic levels
    maxDepth: 8,    // Maximum circuit depth to animate
  },
  
  // Gate Update Sequence
  gateUpdateTiming: {
    preparation: 50,   // Gate prepares for update
    processing: 200,   // Gate processes inputs
    output: 100,       // Gate generates output
    propagation: 150   // Signal travels to next gates
  }
};
```

## Interactive Feedback Animations

### User Input Feedback

#### Click/Tap Feedback
```typescript
const inputFeedback = {
  // Immediate Response
  instantFeedback: {
    duration: 150,
    easing: 'easeOutQuart',
    properties: {
      scale: 1.05,
      brightness: 1.2,
      ringEffect: '0 0 0 4px rgba(66, 153, 225, 0.3)'
    }
  },
  
  // State Change Confirmation
  stateConfirmation: {
    duration: 300,
    delay: 150,
    easing: 'easeOutBack',
    properties: {
      backgroundColor: 'new state color',
      scale: 1.0, // Return to normal
      checkmark: 'fade in confirmation icon'
    }
  }
};
```

#### Hover Interactions
```typescript
const hoverAnimations = {
  // Gentle Elevation
  hoverLift: {
    duration: 200,
    easing: 'easeOutCubic',
    properties: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
      scale: 1.02
    }
  },
  
  // Information Preview
  tooltipReveal: {
    duration: 300,
    delay: 500, // Show after hover intent
    easing: 'easeOutBack',
    properties: {
      tooltip: {
        opacity: 1,
        transform: 'translateY(-8px) scale(1)',
        visibility: 'visible'
      }
    }
  }
};
```

### Success/Error Animations

#### Correct Answer Celebration
```typescript
const successAnimation = {
  // Victory Pulse
  victoryPulse: {
    duration: 600,
    easing: 'easeOutElastic',
    properties: {
      scale: '1.0 to 1.15 to 1.0',
      backgroundColor: 'var(--color-success-100)',
      borderColor: 'var(--color-success-500)'
    }
  },
  
  // Particle Celebration
  successParticles: {
    particleCount: 12,
    duration: 1200,
    properties: {
      particles: {
        velocity: 'random(50, 150)px/s',
        gravity: '200px/s²',
        rotation: 'random(0, 360)deg',
        fade: 'opacity from 1 to 0 over 800ms'
      }
    }
  }
};
```

#### Error Indication
```typescript
const errorAnimation = {
  // Shake Animation
  errorShake: {
    duration: 400,
    easing: 'easeInOutSine',
    properties: {
      transform: 'translateX(0) to translateX(-8px) to translateX(8px) to translateX(0)',
      backgroundColor: 'var(--color-error-100)',
      borderColor: 'var(--color-error-500)'
    }
  },
  
  // Error Recovery
  recoveryFade: {
    duration: 2000,
    delay: 1000,
    easing: 'easeOutQuart',
    properties: {
      backgroundColor: 'return to normal',
      borderColor: 'return to normal'
    }
  }
};
```

## Educational Transition Animations

### Learning Module Transitions

#### Module Introduction
```typescript
const moduleIntroduction = {
  // Reveal Animation
  moduleReveal: {
    duration: 800,
    easing: 'easeOutExpo',
    properties: {
      container: {
        transform: 'translateY(40px) to translateY(0)',
        opacity: '0 to 1'
      }
    }
  },
  
  // Element Staggering
  elementStagger: {
    staggerDelay: 100,
    maxElements: 8,
    animation: {
      duration: 400,
      easing: 'easeOutQuart',
      properties: {
        transform: 'translateY(20px) to translateY(0)',
        opacity: '0 to 1'
      }
    }
  }
};
```

#### Concept Unveiling
```typescript
const conceptUnveiling = {
  // Progressive Disclosure
  conceptReveal: {
    phases: [
      {
        name: 'preparation',
        duration: 300,
        properties: {
          spotlightGrow: '0 to 100px radius',
          backgroundDim: 'opacity 0.3'
        }
      },
      {
        name: 'revelation',
        duration: 500,
        properties: {
          contentFade: 'opacity 0 to 1',
          contentScale: 'scale 0.9 to 1.0'
        }
      },
      {
        name: 'explanation',
        duration: 400,
        properties: {
          detailsSlide: 'translateY(20px) to translateY(0)',
          detailsFade: 'opacity 0 to 1'
        }
      }
    ]
  }
};
```

### Progress Animations

#### Learning Path Progression
```typescript
const progressAnimations = {
  // Path Unlocking
  pathUnlock: {
    duration: 1000,
    easing: 'easeInOutCubic',
    properties: {
      pathLine: {
        strokeDasharray: '0, 1000',
        strokeDashoffset: '0',
        stroke: 'var(--color-accent-500)'
      },
      nodeUnlock: {
        scale: '0 to 1',
        backgroundColor: 'var(--color-success-500)',
        delay: 'staggered by 200ms'
      }
    }
  },
  
  // Achievement Unlock
  achievementUnlock: {
    duration: 1500,
    easing: 'easeOutBack',
    properties: {
      badge: {
        scale: '0 to 1.2 to 1.0',
        rotation: '0 to 360deg',
        glow: '0 0 20px var(--color-accent-400)'
      },
      ribbon: {
        scaleX: '0 to 1',
        delay: 300
      }
    }
  }
};
```

## Accessibility Animation Considerations

### Motion Preferences Support

#### Reduced Motion Implementation
```typescript
const reducedMotionSupport = {
  // Detect User Preferences
  preferenceDetection: {
    mediaQuery: '(prefers-reduced-motion: reduce)',
    fallbackBehavior: 'assume-prefer-reduced'
  },
  
  // Alternative Animations
  reducedMotionAlternatives: {
    logicGateUpdates: {
      normal: 'smooth 800ms animation',
      reduced: 'instant state change with static highlight',
      alternative: 'simple opacity fade 200ms'
    },
    signalFlow: {
      normal: 'traveling pulse animation',
      reduced: 'immediate color change',
      alternative: 'subtle glow increase'
    },
    transitions: {
      normal: 'slide and scale animations',
      reduced: 'opacity-only transitions',
      alternative: 'instant state changes'
    }
  }
};
```

#### Vestibular Safety
```typescript
const vestibularSafety = {
  // Safe Animation Patterns
  safeAnimations: {
    maxRotation: '15deg',     // Limit rotation angles
    maxScale: '1.2',          // Limit scale changes
    maxTranslation: '20px',   // Limit movement distance
    avoidPatterns: [
      'continuous rotation',
      'pulsing/flashing above 3Hz',
      'parallax scrolling',
      'zoom in/out transitions'
    ]
  },
  
  // Alternative Feedback
  alternativeFeedback: {
    colorChanges: 'static color state changes',
    iconChanges: 'symbol/shape transformations',
    textual: 'text-based status updates',
    auditory: 'sound effect confirmations'
  }
};
```

### Keyboard Navigation Animations

#### Focus Flow Animations
```typescript
const focusAnimations = {
  // Focus Indicators
  focusFlow: {
    duration: 200,
    easing: 'easeOutQuart',
    properties: {
      focusRing: {
        scale: '0.9 to 1.0',
        opacity: '0 to 1',
        borderRadius: '4px'
      }
    }
  },
  
  // Tab Navigation
  tabNavigation: {
    duration: 150,
    easing: 'easeOutCubic',
    properties: {
      previousElement: {
        focusRing: 'fade out',
        scale: '1.0 to 0.98'
      },
      nextElement: {
        focusRing: 'fade in',
        scale: '0.98 to 1.0'
      }
    }
  }
};
```

## Implementation Guidelines

### Framer Motion Integration

#### Component Animation Patterns
```typescript
// Reusable Animation Variants
export const gateAnimationVariants = {
  initial: {
    scale: 1,
    opacity: 1,
    glow: '0 0 0px transparent'
  },
  processing: {
    scale: 1.05,
    glow: '0 0 8px var(--color-accent-400)',
    transition: {
      duration: 0.3,
      ease: 'easeOutQuart'
    }
  },
  complete: {
    scale: 1,
    glow: '0 0 4px var(--color-success-500)',
    transition: {
      duration: 0.2,
      ease: 'easeOutBack'
    }
  }
};

// Usage Example
const LogicGate: React.FC = ({ isProcessing, isComplete }) => {
  return (
    <motion.div
      variants={gateAnimationVariants}
      initial="initial"
      animate={isProcessing ? 'processing' : isComplete ? 'complete' : 'initial'}
      className="logic-gate"
    >
      {/* Gate content */}
    </motion.div>
  );
};
```

#### Performance Optimization
```typescript
// Animation Performance Best Practices
const performanceOptimization = {
  // Use will-change sparingly
  willChange: 'transform, opacity', // Only when animating
  
  // Prefer transform and opacity
  preferredProperties: ['transform', 'opacity', 'filter'],
  avoidProperties: ['width', 'height', 'padding', 'margin'],
  
  // Use GPU acceleration triggers
  gpuAcceleration: {
    transform3d: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    perspective: '1000px'
  },
  
  // Batch animations
  batchUpdates: 'group simultaneous animations',
  useLayoutEffect: 'avoid during animation-heavy operations'
};
```

### CSS Animation Fallbacks

#### Progressive Enhancement
```css
/* Base styles (no animation) */
.logic-gate {
  transition: none;
  transform: translateZ(0);
}

/* Enhanced styles (with animation support) */
@supports (animation: none) {
  .logic-gate {
    transition: all 0.2s ease-out;
  }
  
  .logic-gate.processing {
    animation: gate-processing 0.8s ease-out forwards;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .logic-gate {
    animation: none !important;
    transition: opacity 0.2s ease-out;
  }
}
```

### Testing and Validation

#### Performance Testing Protocol
```typescript
const performanceTesting = {
  // Frame Rate Monitoring
  frameRateTargets: {
    minimum: 30, // Acceptable minimum
    target: 60,  // Desired target
    measurements: 'continuous during animation'
  },
  
  // Device Testing Matrix
  testDevices: [
    'iPhone 12 (iOS Safari)',
    'Samsung Galaxy S21 (Chrome Android)',
    'iPad Air (iOS Safari)',
    'MacBook Air M1 (Chrome/Safari/Firefox)',
    'Windows Laptop i5 (Chrome/Edge/Firefox)'
  ],
  
  // Animation Stress Tests
  stressTests: {
    maxConcurrentAnimations: 12,
    complexCircuitSimulation: '50+ gates with active signals',
    rapidUserInteraction: 'rapid clicking/typing during animations'
  }
};
```

---

**Document Version**: 1.0  
**Creation Date**: August 15, 2025  
**Last Updated**: August 15, 2025  
**Next Review**: End of Phase 2  
**Dependencies**: UX_DESIGN.md, UI_SPECIFICATIONS.md  
**Implementation Framework**: Framer Motion + CSS  
**Performance Target**: 60fps on all supported devices  
**Approval Required**: Product Designer, Frontend Engineer