import { test } from '../../fixtures/base.fixture';
import { resolveUser, resolveLoginData } from '../../utils/dataResolver';

/**
 * Suite de pruebas para validar el flujo de Login
 */
test.describe('Authentication - Login Flow', () => {

  /**
   * Hook que se ejecuta antes de cada prueba.
   * Abre la aplicación para iniciar el flujo de login.
   */
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.openApplication();

  });

  /**
   * LOGIN POSITIVO
   * Valida que un usuario válido pueda autenticarse correctamente.
   */
  test('Login - valid credentials', async ({ loginPage, productsPage }) => {

    await loginPage.enterUsername(resolveUser('USER_OK'));
    await loginPage.enterPassword(resolveUser('PASS_OK'));
    await loginPage.clickLogin();
    await productsPage.validateUserIsLoggedIn();

  });

  /**
   * LOGIN NEGATIVO
   * Valida que un usuario bloqueado no pueda autenticarse.
   */
  test('Login - locked user', async ({ loginPage }) => {

    // Ingresar usuario bloqueado
    await loginPage.enterUsername(resolveUser('USER_LOCKED'));
    await loginPage.enterPassword(resolveUser('PASS_OK'));
    await loginPage.clickLogin();
    await loginPage.validateErrorMessage(
      resolveLoginData('ERROR_LOCKED_USER')
    );

  });

  /**
   * LOGIN NEGATIVO
   * Valida comportamiento cuando el usuario presiona login sin ingresar credenciales.
   */
  test('Login - empty username and password', async ({ loginPage }) => {

    // Ejecutar login sin ingresar datos
    await loginPage.clickLogin();
    await loginPage.validateErrorMessage(
      resolveLoginData('ERROR_USERNAME_REQUIRED')
    );

  });

});