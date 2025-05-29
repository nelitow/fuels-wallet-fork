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
