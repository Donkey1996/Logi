import type { Circuit, LogicGate, Wire, Position, GateType } from '../types';
import { getGateInputCount } from './logic';

/**
 * Generate a unique ID for gates, wires, etc.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new logic gate
 */
export function createGate(
  type: GateType,
  position: Position,
  label?: string
): LogicGate {
  const inputCount = getGateInputCount(type);
  
  return {
    id: generateId(),
    type,
    position,
    inputs: Array(inputCount).fill('X'),
    output: 'X',
    label,
  };
}

/**
 * Create a new wire connection
 */
export function createWire(
  fromGateId: string,
  fromOutputIndex: number,
  toGateId: string,
  toInputIndex: number
): Wire {
  return {
    id: generateId(),
    from: {
      gateId: fromGateId,
      outputIndex: fromOutputIndex,
    },
    to: {
      gateId: toGateId,
      inputIndex: toInputIndex,
    },
    state: 'X',
  };
}

/**
 * Create a new empty circuit
 */
export function createEmptyCircuit(name: string = 'New Circuit'): Circuit {
  return {
    id: generateId(),
    name,
    gates: [],
    wires: [],
    inputs: [],
    outputs: [],
  };
}

/**
 * Clone a circuit (deep copy)
 */
export function cloneCircuit(circuit: Circuit): Circuit {
  return {
    ...circuit,
    id: generateId(), // New ID for the clone
    name: `${circuit.name} (Copy)`,
    gates: circuit.gates.map(gate => ({ ...gate, id: generateId() })),
    wires: circuit.wires.map(wire => ({ ...wire, id: generateId() })),
    inputs: circuit.inputs.map(input => ({ ...input, id: generateId() })),
    outputs: circuit.outputs.map(output => ({ ...output, id: generateId() })),
  };
}

/**
 * Calculate the bounding box of a circuit
 */
export function getCircuitBounds(circuit: Circuit): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
} {
  if (circuit.gates.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
  }

  const positions = [
    ...circuit.gates.map(gate => gate.position),
    ...circuit.inputs.map(input => input.position),
    ...circuit.outputs.map(output => output.position),
  ];

  const minX = Math.min(...positions.map(pos => pos.x));
  const minY = Math.min(...positions.map(pos => pos.y));
  const maxX = Math.max(...positions.map(pos => pos.x));
  const maxY = Math.max(...positions.map(pos => pos.y));

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/**
 * Center a circuit at the origin
 */
export function centerCircuit(circuit: Circuit): Circuit {
  const bounds = getCircuitBounds(circuit);
  const centerX = bounds.minX + bounds.width / 2;
  const centerY = bounds.minY + bounds.height / 2;

  return {
    ...circuit,
    gates: circuit.gates.map(gate => ({
      ...gate,
      position: {
        x: gate.position.x - centerX,
        y: gate.position.y - centerY,
      },
    })),
    inputs: circuit.inputs.map(input => ({
      ...input,
      position: {
        x: input.position.x - centerX,
        y: input.position.y - centerY,
      },
    })),
    outputs: circuit.outputs.map(output => ({
      ...output,
      position: {
        x: output.position.x - centerX,
        y: output.position.y - centerY,
      },
    })),
  };
}

/**
 * Scale a circuit by a factor
 */
export function scaleCircuit(circuit: Circuit, scale: number): Circuit {
  return {
    ...circuit,
    gates: circuit.gates.map(gate => ({
      ...gate,
      position: {
        x: gate.position.x * scale,
        y: gate.position.y * scale,
      },
    })),
    inputs: circuit.inputs.map(input => ({
      ...input,
      position: {
        x: input.position.x * scale,
        y: input.position.y * scale,
      },
    })),
    outputs: circuit.outputs.map(output => ({
      ...output,
      position: {
        x: output.position.x * scale,
        y: output.position.y * scale,
      },
    })),
  };
}

/**
 * Find all gates connected to a given gate
 */
export function findConnectedGates(circuit: Circuit, gateId: string): {
  inputs: LogicGate[];
  outputs: LogicGate[];
} {
  const inputGates: LogicGate[] = [];
  const outputGates: LogicGate[] = [];

  // Find gates that feed into this gate
  circuit.wires
    .filter(wire => wire.to.gateId === gateId)
    .forEach(wire => {
      const inputGate = circuit.gates.find(gate => gate.id === wire.from.gateId);
      if (inputGate) {
        inputGates.push(inputGate);
      }
    });

  // Find gates that this gate feeds into
  circuit.wires
    .filter(wire => wire.from.gateId === gateId)
    .forEach(wire => {
      const outputGate = circuit.gates.find(gate => gate.id === wire.to.gateId);
      if (outputGate) {
        outputGates.push(outputGate);
      }
    });

  return { inputs: inputGates, outputs: outputGates };
}

/**
 * Remove a gate and all its connections
 */
export function removeGate(circuit: Circuit, gateId: string): Circuit {
  return {
    ...circuit,
    gates: circuit.gates.filter(gate => gate.id !== gateId),
    wires: circuit.wires.filter(
      wire => wire.from.gateId !== gateId && wire.to.gateId !== gateId
    ),
  };
}

/**
 * Remove a wire
 */
export function removeWire(circuit: Circuit, wireId: string): Circuit {
  return {
    ...circuit,
    wires: circuit.wires.filter(wire => wire.id !== wireId),
  };
}

/**
 * Add a gate to a circuit
 */
export function addGate(circuit: Circuit, gate: LogicGate): Circuit {
  return {
    ...circuit,
    gates: [...circuit.gates, gate],
  };
}

/**
 * Add a wire to a circuit
 */
export function addWire(circuit: Circuit, wire: Wire): Circuit {
  return {
    ...circuit,
    wires: [...circuit.wires, wire],
  };
}

/**
 * Update a gate's position
 */
export function updateGatePosition(
  circuit: Circuit,
  gateId: string,
  position: Position
): Circuit {
  return {
    ...circuit,
    gates: circuit.gates.map(gate =>
      gate.id === gateId ? { ...gate, position } : gate
    ),
  };
}

/**
 * Snap position to grid
 */
export function snapToGrid(position: Position, gridSize: number = 20): Position {
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize,
  };
}

/**
 * Calculate distance between two positions
 */
export function distance(pos1: Position, pos2: Position): number {
  return Math.sqrt(
    Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
  );
}

/**
 * Find the nearest gate to a position
 */
export function findNearestGate(
  circuit: Circuit,
  position: Position,
  maxDistance: number = 100
): LogicGate | null {
  let nearestGate: LogicGate | null = null;
  let minDistance = maxDistance;

  circuit.gates.forEach(gate => {
    const dist = distance(position, gate.position);
    if (dist < minDistance) {
      minDistance = dist;
      nearestGate = gate;
    }
  });

  return nearestGate;
}

/**
 * Generate SVG path for a wire between two points
 */
export function generateWirePath(
  start: Position,
  end: Position,
  style: 'straight' | 'curved' | 'manhattan' = 'curved'
): string {
  switch (style) {
    case 'straight': {
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }
    
    case 'manhattan': {
      const midX = start.x + (end.x - start.x) / 2;
      return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
    }
    
    case 'curved':
    default: {
      const deltaX = end.x - start.x;
      const controlX1 = start.x + deltaX * 0.5;
      const controlY1 = start.y;
      const controlX2 = start.x + deltaX * 0.5;
      const controlY2 = end.y;
      
      return `M ${start.x} ${start.y} C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${end.x} ${end.y}`;
    }
  }
}