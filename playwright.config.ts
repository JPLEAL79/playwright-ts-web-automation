import { defineConfig, devices } from '@playwright/test';

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
     */
    baseURL: 'https://www.saucedemo.com/v1/index.html',

    /**
     * Resolución estándar enterprise
     */
    viewport: { width: 1920, height: 1080 },

    /**
     * Trace de ejecución
     */
    trace: 'on-first-retry',

    /**
     * Captura screenshot cuando falla
     */
    screenshot: 'only-on-failure',

    /**
     * Video cuando falla
     */
    video: 'retain-on-failure',

    /**
     * Permisos del navegador
     */
    permissions: [],

    /**
     * Modo headless por defecto
     */
    headless: true

  },

  /**
   * Navegadores soportados
   */
  projects: [

    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome'
      },
    },

    /**
     * Firefox
     */
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      },
    },

    /*
    Chromium
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    */

    /*
    Webkit / Safari
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */

  ],

});