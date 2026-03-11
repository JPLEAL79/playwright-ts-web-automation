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

  /* Directorio donde se encuentran los tests */
  testDir: './tests',

  /* Permite ejecutar archivos de test en paralelo */
  fullyParallel: true,

  /* Evita subir accidentalmente test.only a CI */
  forbidOnly: !!process.env.CI,

  /**
   * Retry de tests
   * Si un test falla se vuelve a ejecutar una vez.
   * Esto ayuda a reducir falsos negativos por problemas de timing o red.
   */
  retries: 1,

 /**
 * Control de paralelismo
 * En CI se ejecuta 1 worker para estabilidad.
 * En local se limitan los workers para evitar saturar la máquina.
 */
workers: process.env.CI ? 1 : 2,

  /* Reporte HTML local generado por Playwright */
  reporter: 'html',

  use: {

    /**
     * URL base de la aplicación
     * Permite usar page.goto('/') en los tests
     */
    baseURL: 'https://www.saucedemo.com/v1/index.html',

    /**
     * Trace de ejecución
     * Solo se guarda cuando un test falla y se vuelve a ejecutar
     */
    trace: 'on-first-retry',

    /**
     * Captura screenshot cuando un test falla
     * Muy útil para análisis de errores
     */
    screenshot: 'only-on-failure',

    /**
     * Graba video cuando un test falla
     * Facilita debugging en entornos CI
     */
    video: 'retain-on-failure',

    /**
     * Manejo automático de permisos del navegador
     * Se puede extender si la aplicación lo requiere
     */
    permissions: [],

  },

  /**
   * Navegadores soportados por el framework
   * Actualmente: Chrome y Firefox
   */
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

  /**
   * Configuración opcional para levantar servidor local
   * útil en aplicaciones frontend locales
   */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});