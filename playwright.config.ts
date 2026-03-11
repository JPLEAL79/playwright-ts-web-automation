import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright configuration
 * https://playwright.dev/docs/test-configuration
 */
export default defineConfig({

  testDir: './tests',

  /* Permite ejecutar archivos de test en paralelo */
  fullyParallel: true,

  /* Evita subir accidentalmente test.only a CI */
  forbidOnly: !!process.env.CI,

  /* Retry solo cuando corre en CI */
  retries: process.env.CI ? 2 : 0,

  /* En CI se ejecuta secuencial para evitar saturación */
  workers: process.env.CI ? 1 : undefined,

  /* Reporte HTML local */
  reporter: 'html',

  use: {

    /* URL base de la aplicación */
    baseURL: 'https://www.saucedemo.com/v1/index.html',

    /* Captura trace solo cuando hay retry */
    trace: 'on-first-retry',

    /* Opciones útiles para debug si se necesitan más adelante */
    // screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
  },

  /* Navegadores soportados por el framework */
  projects: [

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

  ],

  /* Para levantar servidor local si fuese necesario */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});