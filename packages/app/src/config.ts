import { CRXPages } from './systems/Core/types';

export const {
  VITE_MNEMONIC_WORDS,
  VITE_FUEL_PROVIDER_URL,
  VITE_FUEL_FAUCET_URL,
  VITE_APP_VERSION,
  VITE_DATABASE_VERSION,
  VITE_CRX_NAME,
  VITE_CRX,
  VITE_CRX_VERSION_API,
  VITE_AUTO_LOCK_IN_MINUTES,
  VITE_SENTRY_DSN,
  VITE_ECOSYSTEM_PROJECTS_URL,
  NODE_ENV,
  VITE_CRX_VERSION_POSTFIX,
  VITE_BUILD_VERSION,
  VITE_ENABLE_TEST_FEATURES,
} = import.meta.env;

export const ECOSYSTEM_PROJECTS_URL = VITE_ECOSYSTEM_PROJECTS_URL;
export const WALLET_NAME = VITE_CRX_NAME;
export const APP_VERSION = VITE_APP_VERSION;
export const DATABASE_VERSION = Number(VITE_DATABASE_VERSION);
export const FORMAT_LANGUAGE = 'en-US';
export const MIN_FRACTION_DIGITS = 1;
export const MAX_FRACTION_DIGITS = 3;
export const MNEMONIC_SIZE = 16;
export const WALLET_WIDTH = 350;
export const WALLET_HEIGHT = 600;
export const TAB_BAR_HEIGHT = 30;
export const IS_CRX = import.meta.env.VITE_CRX_BUILD === 'true';
export const IS_LOGGED_KEY = 'isLogged';
export const HAS_ACCEPTED_TERMS_KEY = 'hasAcceptedTerms';
export const IS_DEVELOPMENT = import.meta.env.DEV;
export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_CRX_POPUP = IS_CRX && window.location.hash === '#popup';
/** Time in minutes before Wallet auto locks */
export const AUTO_LOCK_IN_MINUTES = VITE_AUTO_LOCK_IN_MINUTES;
export const MIN_NODE_VERSION = '0.33.0';
export const IS_LOGGED_IN_STATE_TEST =
  import.meta.env.VITE_LOGGED_IN_STATE_TEST === 'true';
export const CRX_VERSION_POSTFIX =
  (import.meta.env.VITE_CRX_VERSION_POSTFIX as string) || '';
export const BUILD_VERSION = import.meta.env.VITE_BUILD_VERSION as string;

// Test features configuration
export const IS_TEST_FEATURES_ENABLED =
  import.meta.env.VITE_ENABLE_TEST_FEATURES === 'true' || IS_DEVELOPMENT;

/**
 * Test configuration utilities
 */
export const TEST_CONFIG = {
  isEnabled: IS_TEST_FEATURES_ENABLED,
  features: {
    debugLogging: IS_TEST_FEATURES_ENABLED,
    mockData: IS_TEST_FEATURES_ENABLED && IS_DEVELOPMENT,
    connectionMonitoring: IS_TEST_FEATURES_ENABLED,
    performanceMetrics: IS_TEST_FEATURES_ENABLED,
    memoryTracking: IS_TEST_FEATURES_ENABLED && IS_DEVELOPMENT,
  },
} as const;

/**
 * NEW: Performance monitoring configuration
 */
export const PERFORMANCE_CONFIG = {
  enableMetrics: TEST_CONFIG.features.performanceMetrics,
  sampleRate: IS_DEVELOPMENT ? 1.0 : 0.1,
  maxMetrics: 1000,
  thresholds: {
    slowTransaction: 5000, // 5 seconds
    memoryWarning: 100 * 1024 * 1024, // 100MB
    connectionTimeout: 10000, // 10 seconds
  },
} as const;
