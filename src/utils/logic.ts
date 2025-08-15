import type { LogicState, GateType, LogicGate, Circuit, TruthTable } from '../types';
import { GATE_FUNCTIONS } from '../constants';

/**
 * Calculate the output of a logic gate given its inputs
 */
export function calculateGateOutput(gateType: GateType, inputs: LogicState[]): LogicState {
  // Handle unknown states
  if (inputs.some(input => input === 'X')) {
    return 'X';
  }

  // Convert to binary for calculation
  const binaryInputs = inputs as (0 | 1)[];
  
  try {
    return GATE_FUNCTIONS[gateType](binaryInputs);
  } catch (error) {
    console.error(`Error calculating output for ${gateType} gate:`, error);
    return 'X';
  }
}

/**
 * Simulate an entire circuit and update all gate outputs
 */
export function simulateCircuit(circuit: Circuit): Circuit {
  const updatedGates = [...circuit.gates];
  const maxIterations = 100; // Prevent infinite loops
  let iteration = 0;
  let hasChanges = true;

  while (hasChanges && iteration < maxIterations) {
    hasChanges = false;
    iteration++;

    for (let i = 0; i < updatedGates.length; i++) {
      const gate = updatedGates[i];
      const newOutput = calculateGateOutput(gate.type, gate.inputs);
      
      if (newOutput !== gate.output) {
        updatedGates[i] = { ...gate, output: newOutput };
        hasChanges = true;
        
        // Propagate output to connected gates
        propagateSignal(updatedGates, circuit.wires, gate.id, newOutput);
      }
    }
  }

  if (iteration >= maxIterations) {
    console.warn('Circuit simulation reached maximum iterations - possible feedback loop');
  }

  return {
    ...circuit,
    gates: updatedGates,
  };
}

/**
 * Propagate a signal change through the circuit
 */
function propagateSignal(
  gates: LogicGate[],
  wires: Array<{ from: { gateId: string; outputIndex: number }; to: { gateId: string; inputIndex: number } }>,
  sourceGateId: string,
  signal: LogicState
): void {
  // Find all wires connected to this gate's output
  const connectedWires = wires.filter(wire => wire.from.gateId === sourceGateId);
  
  connectedWires.forEach(wire => {
    const targetGate = gates.find(gate => gate.id === wire.to.gateId);
    if (targetGate) {
      // Update the input of the target gate
      const newInputs = [...targetGate.inputs];
      newInputs[wire.to.inputIndex] = signal;
      
      const gateIndex = gates.findIndex(gate => gate.id === targetGate.id);
      if (gateIndex !== -1) {
        gates[gateIndex] = { ...targetGate, inputs: newInputs };
      }
    }
  });
}

/**
 * Generate truth table for a logic gate
 */
export function generateTruthTable(gateType: GateType): TruthTable {
  const inputCount = getGateInputCount(gateType);
  const inputLabels = Array.from({ length: inputCount }, (_, i) => 
    String.fromCharCode(65 + i) // A, B, C, etc.
  );
  
  const rows = [];
  const totalCombinations = Math.pow(2, inputCount);
  
  for (let i = 0; i < totalCombinations; i++) {
    const inputs: LogicState[] = [];
    
    // Convert number to binary representation
    for (let j = inputCount - 1; j >= 0; j--) {
      inputs.push(((i >> j) & 1) as LogicState);
    }
    
    const output = calculateGateOutput(gateType, inputs);
    rows.push({ inputs, output });
  }
  
  return {
    inputs: inputLabels,
    output: 'Y',
    rows,
  };
}

/**
 * Get the number of inputs for a logic gate type
 */
export function getGateInputCount(gateType: GateType): number {
  switch (gateType) {
    case 'NOT':
    case 'BUFFER':
      return 1;
    case 'AND':
    case 'OR':
    case 'NAND':
    case 'NOR':
    case 'XOR':
    case 'XNOR':
      return 2;
    default:
      return 2;
  }
}

/**
 * Validate logic states (ensure they're valid)
 */
export function isValidLogicState(state: unknown): state is LogicState {
  return state === 0 || state === 1 || state === 'X';
}

/**
 * Convert logic state to boolean (for display purposes)
 */
export function logicStateToBoolean(state: LogicState): boolean | null {
  switch (state) {
    case 0:
      return false;
    case 1:
      return true;
    case 'X':
      return null;
    default:
      return null;
  }
}

/**
 * Convert boolean to logic state
 */
export function booleanToLogicState(value: boolean): LogicState {
  return value ? 1 : 0;
}

/**
 * Check if a circuit has any feedback loops
 */
export function hasFeedbackLoop(circuit: Circuit): boolean {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  function hasLoopUtil(gateId: string): boolean {
    visited.add(gateId);
    recursionStack.add(gateId);
    
    // Find all gates that this gate's output connects to
    const connectedWires = circuit.wires.filter(wire => wire.from.gateId === gateId);
    
    for (const wire of connectedWires) {
      const targetGateId = wire.to.gateId;
      
      if (!visited.has(targetGateId)) {
        if (hasLoopUtil(targetGateId)) {
          return true;
        }
      } else if (recursionStack.has(targetGateId)) {
        return true;
      }
    }
    
    recursionStack.delete(gateId);
    return false;
  }
  
  // Check each gate for loops
  for (const gate of circuit.gates) {
    if (!visited.has(gate.id)) {
      if (hasLoopUtil(gate.id)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Find unconnected inputs in a circuit
 */
export function findUnconnectedInputs(circuit: Circuit): Array<{ gateId: string; inputIndex: number }> {
  const unconnected: Array<{ gateId: string; inputIndex: number }> = [];
  
  circuit.gates.forEach(gate => {
    const inputCount = getGateInputCount(gate.type);
    
    for (let i = 0; i < inputCount; i++) {
      const isConnected = circuit.wires.some(
        wire => wire.to.gateId === gate.id && wire.to.inputIndex === i
      );
      
      if (!isConnected) {
        unconnected.push({ gateId: gate.id, inputIndex: i });
      }
    }
  });
  
  return unconnected;
}