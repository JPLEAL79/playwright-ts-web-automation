import { test } from '../../fixtures/base.fixture';
import { resolveUser, resolveLoginData } from '../../utils/dataResolver';

/**
 * Suite de pruebas para Login
 */
test.describe('Login Flow', () => {

  /**
   * LOGIN POSITIVO
   */
  test('Login - valid credentials', async ({ loginPage, productsPage }) => {

    // Abrir aplicación
    await loginPage.openApplication();

    // Ingresar credenciales válidas
    await loginPage.enterUsername(resolveUser('USER_OK'));
    await loginPage.enterPassword(resolveUser('PASS_OK'));
    await loginPage.clickLogin();

    // Validar que el usuario quedó autenticado
    await productsPage.validateUserIsLoggedIn();

  });

  /**
   * LOGIN NEGATIVO - usuario bloqueado
   */
  test('Login - locked user', async ({ loginPage }) => {

    // Abrir aplicación
    await loginPage.openApplication();

    // Ingresar credenciales
    await loginPage.enterUsername(resolveUser('USER_LOCKED'));
    await loginPage.enterPassword(resolveUser('PASS_OK'));

    // Intentar login
    await loginPage.clickLogin();
    await loginPage.validateErrorMessage(
      resolveLoginData('ERROR_LOCKED_USER')
    );

  });

  /**
   * LOGIN NEGATIVO - credenciales vacías
   */
  test('Login - empty credentials', async ({ loginPage }) => {

    // Abrir aplicación
    await loginPage.openApplication();

    // Click login sin datos
    await loginPage.clickLogin();
    await loginPage.validateErrorMessage(
      resolveLoginData('ERROR_USERNAME_REQUIRED')
    );

  });

});