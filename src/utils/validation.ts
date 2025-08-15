import type { Circuit, LogicGate, Wire, Position } from '../types';
import { PERFORMANCE } from '../constants';
import { getGateInputCount, findUnconnectedInputs, hasFeedbackLoop } from './logic';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate a complete circuit
 */
export function validateCircuit(circuit: Circuit): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check circuit limits
  if (circuit.gates.length > PERFORMANCE.MAX_GATES) {
    errors.push(`Too many gates: ${circuit.gates.length}/${PERFORMANCE.MAX_GATES}`);
  }

  if (circuit.wires.length > PERFORMANCE.MAX_WIRES) {
    errors.push(`Too many wires: ${circuit.wires.length}/${PERFORMANCE.MAX_WIRES}`);
  }

  // Validate each gate
  circuit.gates.forEach(gate => {
    const gateValidation = validateGate(gate);
    errors.push(...gateValidation.errors);
    warnings.push(...gateValidation.warnings);
  });

  // Validate each wire
  circuit.wires.forEach(wire => {
    const wireValidation = validateWire(wire, circuit.gates);
    errors.push(...wireValidation.errors);
    warnings.push(...wireValidation.warnings);
  });

  // Check for duplicate gate IDs
  const gateIds = circuit.gates.map(gate => gate.id);
  const duplicateGateIds = gateIds.filter((id, index) => gateIds.indexOf(id) !== index);
  if (duplicateGateIds.length > 0) {
    errors.push(`Duplicate gate IDs: ${duplicateGateIds.join(', ')}`);
  }

  // Check for duplicate wire IDs
  const wireIds = circuit.wires.map(wire => wire.id);
  const duplicateWireIds = wireIds.filter((id, index) => wireIds.indexOf(id) !== index);
  if (duplicateWireIds.length > 0) {
    errors.push(`Duplicate wire IDs: ${duplicateWireIds.join(', ')}`);
  }

  // Check for unconnected inputs
  const unconnectedInputs = findUnconnectedInputs(circuit);
  if (unconnectedInputs.length > 0) {
    warnings.push(`${unconnectedInputs.length} unconnected inputs found`);
  }

  // Check for feedback loops
  if (hasFeedbackLoop(circuit)) {
    warnings.push('Circuit contains feedback loops');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate a single logic gate
 */
export function validateGate(gate: LogicGate): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required properties
  if (!gate.id || gate.id.trim() === '') {
    errors.push('Gate ID is required');
  }

  if (!gate.type) {
    errors.push('Gate type is required');
  }

  // Check position
  const positionValidation = validatePosition(gate.position);
  if (!positionValidation.isValid) {
    errors.push(...positionValidation.errors.map(err => `Gate position: ${err}`));
  }

  // Check input count matches gate type
  const expectedInputCount = getGateInputCount(gate.type);
  if (gate.inputs.length !== expectedInputCount) {
    errors.push(
      `Invalid input count for ${gate.type}: expected ${expectedInputCount}, got ${gate.inputs.length}`
    );
  }

  // Check input values
  gate.inputs.forEach((input, index) => {
    if (input !== 0 && input !== 1 && input !== 'X') {
      errors.push(`Invalid input value at index ${index}: ${input}`);
    }
  });

  // Check output value
  if (gate.output !== 0 && gate.output !== 1 && gate.output !== 'X') {
    errors.push(`Invalid output value: ${gate.output}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate a wire connection
 */
export function validateWire(wire: Wire, gates: LogicGate[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required properties
  if (!wire.id || wire.id.trim() === '') {
    errors.push('Wire ID is required');
  }

  // Check from connection
  const fromGate = gates.find(gate => gate.id === wire.from.gateId);
  if (!fromGate) {
    errors.push(`Source gate not found: ${wire.from.gateId}`);
  } else if (wire.from.outputIndex !== 0) {
    errors.push(`Invalid output index: ${wire.from.outputIndex} (gates have only one output)`);
  }

  // Check to connection
  const toGate = gates.find(gate => gate.id === wire.to.gateId);
  if (!toGate) {
    errors.push(`Target gate not found: ${wire.to.gateId}`);
  } else {
    const expectedInputCount = getGateInputCount(toGate.type);
    if (wire.to.inputIndex < 0 || wire.to.inputIndex >= expectedInputCount) {
      errors.push(
        `Invalid input index: ${wire.to.inputIndex} (${toGate.type} gates have ${expectedInputCount} inputs)`
      );
    }
  }

  // Check state value
  if (wire.state !== 0 && wire.state !== 1 && wire.state !== 'X') {
    errors.push(`Invalid wire state: ${wire.state}`);
  }

  // Check for self-connection
  if (wire.from.gateId === wire.to.gateId) {
    errors.push('Wire cannot connect a gate to itself');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate a position
 */
export function validatePosition(position: Position): ValidationResult {
  const errors: string[] = [];

  if (typeof position.x !== 'number' || isNaN(position.x)) {
    errors.push('X coordinate must be a valid number');
  }

  if (typeof position.y !== 'number' || isNaN(position.y)) {
    errors.push('Y coordinate must be a valid number');
  }

  if (position.x < 0) {
    errors.push('X coordinate cannot be negative');
  }

  if (position.y < 0) {
    errors.push('Y coordinate cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
  };
}

/**
 * Check if two gates overlap
 */
export function checkGateOverlap(gate1: LogicGate, gate2: LogicGate, margin: number = 10): boolean {
  const distance = Math.sqrt(
    Math.pow(gate1.position.x - gate2.position.x, 2) + 
    Math.pow(gate1.position.y - gate2.position.y, 2)
  );
  
  // Assume gates have a minimum size for collision detection
  const minDistance = 80 + margin; // Gate width + margin
  
  return distance < minDistance;
}

/**
 * Validate circuit name
 */
export function validateCircuitName(name: string): ValidationResult {
  const errors: string[] = [];

  if (!name || name.trim() === '') {
    errors.push('Circuit name is required');
  }

  if (name.length > 50) {
    errors.push('Circuit name cannot exceed 50 characters');
  }

  // Check for invalid characters
  const invalidChars = /[<>:"/\\|?*]/;
  if (invalidChars.test(name)) {
    errors.push('Circuit name contains invalid characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
  };
}

/**
 * Sanitize user input
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 100); // Limit length
}

/**
 * Validate email format (for future features)
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}