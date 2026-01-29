import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  
  /* OPTIMIZATION: Disable full parallelism to avoid file conflicts during PDF generation */
  fullyParallel: false, 

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* * FIX: Limit workers to avoid "EBUSY" or "Socket" errors with 'images-to-pdf'.
   * Using many workers causes multiple tests to fight over the '0.pdf' temporary file.
   */
  workers: process.env.CI ? 2 : 3, 

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. */
  use: {
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    
    /* Good practice: Take screenshots only on failure for technical debugging, 
       since your Helper handles the custom PDF reports. */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});