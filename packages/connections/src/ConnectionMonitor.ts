/**
 * Connection monitoring and health check utilities
 */

export interface ConnectionHealth {
  isConnected: boolean;
  lastPing: Date | null;
  responseTime: number;
  errorCount: number;
  totalAttempts: number;
  successRate: number;
}

export interface MonitorConfig {
  pingInterval: number;
  maxErrors: number;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  backoffMultiplier: number;
}

export const DEFAULT_MONITOR_CONFIG: MonitorConfig = {
  pingInterval: 30000, // 30 seconds
  maxErrors: 5,
  timeout: 5000,
  retryAttempts: 3,
  retryDelay: 1000,
  backoffMultiplier: 2,
};

export class ConnectionMonitor {
  private health: ConnectionHealth;
  private config: MonitorConfig;
  private monitorInterval?: NodeJS.Timeout;
  private onHealthChange?: (health: ConnectionHealth) => void;

  constructor(config: Partial<MonitorConfig> = {}) {
    this.config = { ...DEFAULT_MONITOR_CONFIG, ...config };
    this.health = {
      isConnected: false,
      lastPing: null,
      responseTime: 0,
      errorCount: 0,
      totalAttempts: 0,
      successRate: 0,
    };
  }

  /**
   * Start monitoring connection health
   */
  start(callback?: (health: ConnectionHealth) => void): void {
    this.onHealthChange = callback;
    this.monitorInterval = setInterval(() => {
      this.performHealthCheck();
    }, this.config.pingInterval);
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = undefined;
    }
  }

  /**
   * Get current health status
   */
  getHealth(): ConnectionHealth {
    return { ...this.health };
  }

  /**
   * Manually trigger health check
   */
  async performHealthCheck(): Promise<ConnectionHealth> {
    const startTime = Date.now();

    try {
      // Simulate health check (in real implementation, this would ping the actual connection)
      await this.simulatePing();

      const responseTime = Date.now() - startTime;

      this.health = {
        isConnected: true,
        lastPing: new Date(),
        responseTime,
        errorCount: Math.max(0, this.health.errorCount - 1), // Decrease error count on success
        totalAttempts: this.health.totalAttempts + 1,
        successRate: this.health.successRate + (responseTime < this.config.timeout ? 1 : 0) / this.health.totalAttempts,
      };
    } catch (error) {
      console.warn('Connection health check failed:', error);
      this.health = {
        ...this.health,
        isConnected: false,
        errorCount: this.health.errorCount + 1,
        totalAttempts: this.health.totalAttempts + 1,
      };
    }

    if (this.onHealthChange) {
      this.onHealthChange(this.health);
    }

    return this.getHealth();
  }

  /**
   * Check if connection is healthy
   */
  isHealthy(): boolean {
    return (
      this.health.isConnected && this.health.errorCount < this.config.maxErrors
    );
  }

  /**
   * NEW: Automatic retry with exponential backoff
   */
  async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = this.config.retryAttempts
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries - 1) {
          throw lastError;
        }
        
        const delay = this.config.retryDelay * Math.pow(this.config.backoffMultiplier, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  }

  private async simulatePing(): Promise<void> {
    // Simulate network delay
    const delay = Math.random() * 100 + 50; // 50-150ms
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Simulate occasional failures for testing
    if (Math.random() < 0.1) {
      // 10% failure rate
      throw new Error('Simulated connection failure');
    }
  }
}

/**
 * Utility function to create a connection monitor with custom config
 */
export function createConnectionMonitor(
  config?: Partial<MonitorConfig>
): ConnectionMonitor {
  return new ConnectionMonitor(config);
}

/**
 * Health status checker utility
 */
export function isConnectionHealthy(
  health: ConnectionHealth,
  maxErrors = 5
): boolean {
  return health.isConnected && health.errorCount < maxErrors;
}
