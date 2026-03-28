import { defineConfig, devices } from '@playwright/test';
import { ENV, environmentConfig } from './config/environment';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  // Test source directory
  testDir: './tests',

  // Allows files to run in parallel when the suite supports it
  fullyParallel: true,

  // Prevents accidental test.only usage in CI
  forbidOnly: isCI,

  // Retries failed tests once to reduce flaky reruns noise
  retries: 1,

  // Keeps CI execution stable and local execution lightweight
  workers: isCI ? 1 : 2,

  // HTML report for local review, plus list output in CI logs
  reporter: isCI
    ? [['list'], ['html', { open: 'never' }]]
    : [['html', { open: 'never' }]],

  use: {
    // Base URL is resolved from the selected environment configuration
    baseURL: environmentConfig.baseUrl,

    // Standard desktop viewport
    viewport: { width: 1920, height: 1080 },

    // Collect trace only when a retry happens
    trace: 'on-first-retry',

    // Capture screenshots only on failures
    screenshot: 'only-on-failure',

    // Keep failure videos for debugging
    video: 'retain-on-failure',

    // No browser permissions are required for this application
    permissions: [],

    // Headless by default for predictable execution
    headless: true,
  },

  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ],
});
