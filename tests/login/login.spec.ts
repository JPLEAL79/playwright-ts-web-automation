import { test } from '../../fixtures/base.fixture';
import { resolveLoginData, resolveUser } from '../../utils/dataResolver';

/**
 * Test suite for the login flow.
 */
test.describe('Authentication - Login Flow', () => {
  /**
   * Opens the application before each login scenario.
   */
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.openApplication();
  });

  /**
   * Verifies that a valid user can log in successfully.
   */
  test('Login - valid credentials', async ({ loginPage, productsPage }) => {
    await loginPage.login(
      resolveUser('USER_OK'),
      resolveUser('PASS_OK')
    );

    await productsPage.validateUserIsLoggedIn();
  });

  /**
   * Verifies that a locked user cannot log in.
   */
  test('Login - locked user', async ({ loginPage }) => {
    await loginPage.login(
      resolveUser('USER_LOCKED'),
      resolveUser('PASS_OK')
    );

    await loginPage.validateErrorMessage(
      resolveLoginData('ERROR_LOCKED_USER')
    );
  });

  /**
   * Verifies the behavior when no credentials are provided.
   */
  test('Login - empty username and password', async ({ loginPage }) => {
    await loginPage.clickLogin();

    await loginPage.validateErrorMessage(
      resolveLoginData('ERROR_USERNAME_REQUIRED')
    );
  });
});
