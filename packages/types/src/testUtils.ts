/**
 * Test utilities and types for development and testing purposes
 */

export interface TestWalletConfig {
  name: string;
  network: string;
  isTestMode: boolean;
}

export interface TestTransactionData {
  id: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export type TestWalletType = 'development' | 'staging' | 'production';

export const TEST_CONSTANTS = {
  DEFAULT_TIMEOUT: 5000,
  MAX_RETRIES: 3,
  TEST_NETWORK_ID: 'test-network',
} as const;

/**
 * Utility function to create test wallet configuration
 */
export function createTestWalletConfig(
  name: string,
  type: TestWalletType = 'development'
): TestWalletConfig {
  return {
    name,
    network: type === 'production' ? 'mainnet' : 'testnet',
    isTestMode: type !== 'production',
  };
}

/**
 * Helper type for test environment detection
 */
export type TestEnvironment = {
  isDevelopment: boolean;
  isStaging: boolean;
  isProduction: boolean;
  testId?: string;
};

/**
 * NEW: Debug logging utility for development
 */
export interface DebugLogger {
  level: 'debug' | 'info' | 'warn' | 'error';
  prefix: string;
  enabled: boolean;
}

export function createDebugLogger(prefix: string = 'FUEL'): DebugLogger {
  return {
    level: 'debug',
    prefix,
    enabled: process.env.NODE_ENV === 'development',
  };
}

export function logDebug(logger: DebugLogger, message: string, data?: any): void {
  if (logger.enabled) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${logger.prefix}: ${message}`, data || '');
  }
}
