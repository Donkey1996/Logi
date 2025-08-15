import type { UserProgress, AppSettings, Circuit } from '../types';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../constants';

/**
 * Save user progress to localStorage
 */
export function saveUserProgress(progress: UserProgress): void {
  try {
    const serialized = JSON.stringify({
      ...progress,
      lastActive: progress.lastActive.toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, serialized);
  } catch (error) {
    console.error('Failed to save user progress:', error);
  }
}

/**
 * Load user progress from localStorage
 */
export function loadUserProgress(): UserProgress | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      lastActive: new Date(parsed.lastActive),
    };
  } catch (error) {
    console.error('Failed to load user progress:', error);
    return null;
  }
}

/**
 * Save app settings to localStorage
 */
export function saveAppSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save app settings:', error);
  }
}

/**
 * Load app settings from localStorage
 */
export function loadAppSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
    if (!stored) return DEFAULT_SETTINGS;
    
    const parsed = JSON.parse(stored);
    // Merge with defaults to handle new settings
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (error) {
    console.error('Failed to load app settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save a circuit to localStorage
 */
export function saveCircuit(circuit: Circuit): void {
  try {
    const existingCircuits = loadSavedCircuits();
    const updatedCircuits = existingCircuits.filter(c => c.id !== circuit.id);
    updatedCircuits.push(circuit);
    
    localStorage.setItem(STORAGE_KEYS.SAVED_CIRCUITS, JSON.stringify(updatedCircuits));
  } catch (error) {
    console.error('Failed to save circuit:', error);
  }
}

/**
 * Load all saved circuits from localStorage
 */
export function loadSavedCircuits(): Circuit[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_CIRCUITS);
    if (!stored) return [];
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load saved circuits:', error);
    return [];
  }
}

/**
 * Delete a saved circuit
 */
export function deleteCircuit(circuitId: string): void {
  try {
    const existingCircuits = loadSavedCircuits();
    const updatedCircuits = existingCircuits.filter(c => c.id !== circuitId);
    
    localStorage.setItem(STORAGE_KEYS.SAVED_CIRCUITS, JSON.stringify(updatedCircuits));
  } catch (error) {
    console.error('Failed to delete circuit:', error);
  }
}

/**
 * Clear all application data
 */
export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear application data:', error);
  }
}

/**
 * Export user data as JSON
 */
export function exportUserData(): string {
  const progress = loadUserProgress();
  const settings = loadAppSettings();
  const circuits = loadSavedCircuits();
  
  const exportData = {
    progress,
    settings,
    circuits,
    exportDate: new Date().toISOString(),
    version: '1.0.0',
  };
  
  return JSON.stringify(exportData, null, 2);
}

/**
 * Import user data from JSON
 */
export function importUserData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    
    // Validate data structure
    if (!data.version || !data.exportDate) {
      throw new Error('Invalid export format');
    }
    
    // Import progress
    if (data.progress) {
      const progress = {
        ...data.progress,
        lastActive: new Date(data.progress.lastActive),
      };
      saveUserProgress(progress);
    }
    
    // Import settings
    if (data.settings) {
      saveAppSettings(data.settings);
    }
    
    // Import circuits
    if (data.circuits && Array.isArray(data.circuits)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_CIRCUITS, JSON.stringify(data.circuits));
    }
    
    return true;
  } catch (error) {
    console.error('Failed to import user data:', error);
    return false;
  }
}

/**
 * Get storage usage information
 */
export function getStorageUsage(): { used: number; total: number; percentage: number } {
  try {
    let used = 0;
    
    // Calculate used space
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        used += item.length;
      }
    });
    
    // Estimate total available space (5MB is common limit)
    const total = 5 * 1024 * 1024; // 5MB in bytes
    const percentage = (used / total) * 100;
    
    return { used, total, percentage };
  } catch (error) {
    console.error('Failed to calculate storage usage:', error);
    return { used: 0, total: 0, percentage: 0 };
  }
}