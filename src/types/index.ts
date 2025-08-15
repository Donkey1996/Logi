// Core logic gate types
export type LogicState = 0 | 1 | 'X'; // 0 = false, 1 = true, X = unknown/invalid

export type GateType = 
  | 'AND' 
  | 'OR' 
  | 'NOT' 
  | 'NAND' 
  | 'NOR' 
  | 'XOR' 
  | 'XNOR' 
  | 'BUFFER';

export interface Position {
  x: number;
  y: number;
}

export interface LogicGate {
  id: string;
  type: GateType;
  position: Position;
  inputs: LogicState[];
  output: LogicState;
  label?: string;
}

export interface Wire {
  id: string;
  from: {
    gateId: string;
    outputIndex: number;
  };
  to: {
    gateId: string;
    inputIndex: number;
  };
  state: LogicState;
  path?: string; // SVG path for custom wire routing
}

export interface Circuit {
  id: string;
  name: string;
  gates: LogicGate[];
  wires: Wire[];
  inputs: Array<{
    id: string;
    label: string;
    state: LogicState;
    position: Position;
  }>;
  outputs: Array<{
    id: string;
    label: string;
    state: LogicState;
    position: Position;
  }>;
}

// Learning module types
export interface TruthTableRow {
  inputs: LogicState[];
  output: LogicState;
  highlighted?: boolean;
}

export interface TruthTable {
  inputs: string[];
  output: string;
  rows: TruthTableRow[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  gateType: GateType;
  truthTable: TruthTable;
  interactiveCircuit?: Circuit;
  completed: boolean;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number; // 0-100
}

// Quiz types
export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'circuit-building' | 'truth-table';
  options?: string[];
  correctAnswer: string | Circuit | TruthTableRow[];
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
  repeat?: boolean;
}

export interface SignalAnimation {
  wireId: string;
  duration: number;
  direction: 'forward' | 'backward';
}

// User progress tracking
export interface UserProgress {
  completedLessons: string[];
  completedQuizzes: string[];
  currentModule: string;
  totalTimeSpent: number; // in minutes
  lastActive: Date;
  achievements: string[];
}

// Component props interfaces
export interface LogicGateProps {
  gate: LogicGate;
  onInputChange?: (inputIndex: number, value: LogicState) => void;
  onPositionChange?: (position: Position) => void;
  isSelected?: boolean;
  isAnimating?: boolean;
  showLabels?: boolean;
}

export interface CircuitProps {
  circuit: Circuit;
  isEditable?: boolean;
  showSignalFlow?: boolean;
  onCircuitChange?: (circuit: Circuit) => void;
  onGateSelect?: (gateId: string) => void;
}

export interface WireProps {
  wire: Wire;
  isAnimating?: boolean;
  onStateChange?: (state: LogicState) => void;
}

// Settings and preferences
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  animationSpeed: 'slow' | 'normal' | 'fast';
  showAdvancedFeatures: boolean;
  autoSave: boolean;
  soundEnabled: boolean;
}

// Error handling
export interface AppError {
  message: string;
  type: 'validation' | 'circuit' | 'network' | 'unknown';
  details?: unknown;
}

// API response types (for future expansion)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: AppError;
}