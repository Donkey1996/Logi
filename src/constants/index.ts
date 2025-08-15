import type { GateType } from '../types';

// Logic gate configurations
export const GATE_CONFIGS = {
  AND: {
    inputs: 2,
    symbol: '&',
    name: 'AND Gate',
    description: 'Output is high only when all inputs are high',
  },
  OR: {
    inputs: 2,
    symbol: '≥1',
    name: 'OR Gate', 
    description: 'Output is high when at least one input is high',
  },
  NOT: {
    inputs: 1,
    symbol: '¬',
    name: 'NOT Gate',
    description: 'Output is the inverse of the input',
  },
  NAND: {
    inputs: 2,
    symbol: '⊼',
    name: 'NAND Gate',
    description: 'Output is low only when all inputs are high',
  },
  NOR: {
    inputs: 2,
    symbol: '⊽',
    name: 'NOR Gate',
    description: 'Output is high only when all inputs are low',
  },
  XOR: {
    inputs: 2,
    symbol: '⊕',
    name: 'XOR Gate',
    description: 'Output is high when inputs are different',
  },
  XNOR: {
    inputs: 2,
    symbol: '⊙',
    name: 'XNOR Gate',
    description: 'Output is high when inputs are the same',
  },
  BUFFER: {
    inputs: 1,
    symbol: '▷',
    name: 'Buffer',
    description: 'Output equals input (amplifies signal)',
  },
} as const;

// Logic gate functions
export const GATE_FUNCTIONS = {
  AND: (inputs: (0 | 1)[]): 0 | 1 => inputs.every(i => i === 1) ? 1 : 0,
  OR: (inputs: (0 | 1)[]): 0 | 1 => inputs.some(i => i === 1) ? 1 : 0,
  NOT: (inputs: (0 | 1)[]): 0 | 1 => inputs[0] === 1 ? 0 : 1,
  NAND: (inputs: (0 | 1)[]): 0 | 1 => inputs.every(i => i === 1) ? 0 : 1,
  NOR: (inputs: (0 | 1)[]): 0 | 1 => inputs.some(i => i === 1) ? 0 : 1,
  XOR: (inputs: (0 | 1)[]): 0 | 1 => inputs.filter(i => i === 1).length % 2 === 1 ? 1 : 0,
  XNOR: (inputs: (0 | 1)[]): 0 | 1 => inputs.filter(i => i === 1).length % 2 === 0 ? 1 : 0,
  BUFFER: (inputs: (0 | 1)[]): 0 | 1 => inputs[0],
} as const;

// Animation constants
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.4,
  SLOW: 0.8,
} as const;

export const SIGNAL_FLOW_SPEED = {
  SLOW: 2,
  NORMAL: 1.5,
  FAST: 1,
} as const;

// UI constants
export const GATE_SIZE = {
  WIDTH: 80,
  HEIGHT: 60,
} as const;

export const GRID_SIZE = 20;
export const WIRE_THICKNESS = 3;
export const INPUT_RADIUS = 6;

// Color scheme
export const COLORS = {
  LOGIC_HIGH: '#22c55e', // green-500
  LOGIC_LOW: '#94a3b8',  // slate-400
  LOGIC_UNKNOWN: '#f59e0b', // amber-500
  WIRE_ACTIVE: '#3b82f6', // blue-500
  WIRE_INACTIVE: '#6b7280', // gray-500
  GATE_BACKGROUND: '#ffffff',
  GATE_BORDER: '#d1d5db', // gray-300
  GATE_SELECTED: '#3b82f6', // blue-500
} as const;

// Learning progression
export const LEARNING_MODULES = [
  {
    id: 'basics',
    title: 'Digital Logic Basics',
    order: 1,
    gates: ['AND', 'OR', 'NOT'] as GateType[],
  },
  {
    id: 'advanced',
    title: 'Advanced Gates',
    order: 2,
    gates: ['NAND', 'NOR', 'XOR', 'XNOR'] as GateType[],
  },
  {
    id: 'circuits',
    title: 'Circuit Building',
    order: 3,
    gates: ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'] as GateType[],
  },
] as const;

// Performance settings
export const PERFORMANCE = {
  MAX_GATES: 50,
  MAX_WIRES: 100,
  ANIMATION_FPS: 60,
  DEBOUNCE_DELAY: 100,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_PROGRESS: 'logi_user_progress',
  APP_SETTINGS: 'logi_app_settings',
  SAVED_CIRCUITS: 'logi_saved_circuits',
} as const;

// Default values
export const DEFAULT_SETTINGS = {
  theme: 'auto' as const,
  animationSpeed: 'normal' as const,
  showAdvancedFeatures: false,
  autoSave: true,
  soundEnabled: false,
};

// Responsive breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Success messages
export const MESSAGES = {
  LESSON_COMPLETED: 'Great job! Lesson completed successfully.',
  QUIZ_PASSED: 'Excellent! You passed the quiz.',
  CIRCUIT_VALID: 'Circuit is working correctly!',
  PROGRESS_SAVED: 'Your progress has been saved.',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  INVALID_CIRCUIT: 'Invalid circuit configuration',
  MISSING_CONNECTIONS: 'Some gates are not properly connected',
  TOO_MANY_GATES: 'Maximum number of gates exceeded',
  SAVE_FAILED: 'Failed to save progress',
} as const;