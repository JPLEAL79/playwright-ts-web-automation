import { expect, test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { resolveUser } from '../utils/dataResolver';

/**
 * Custom fixtures exposed to the test files.
 * Each property becomes available in tests through dependency injection.
 */
type AppFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedUser: void;
};

/**
 * Performs the default login flow used by authenticated tests.
 */
async function authenticateDefaultUser(loginPage: LoginPage): Promise<void> {
  await loginPage.openApplication();
  await loginPage.login(resolveUser('USER_OK'), resolveUser('PASS_OK'));
}

/**
 * Extends Playwright's base test with reusable application fixtures.
 * This plays a similar role to a shared BaseTest, but through composition.
 */
export const test = base.extend<AppFixtures>({
  /**
   * Provides the login page object to any test that requests it.
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Provides the products page object to any test that requests it.
   */
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  /**
   * Provides the cart page object to any test that requests it.
   */
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  /**
   * Provides the checkout page object to any test that requests it.
   */
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  /**
   * Provides an authenticated session for tests that require a logged user.
   * This plays a similar role to a reusable Cucumber Background setup.
   */
  loggedUser: async ({ loginPage, productsPage }, use) => {
    await authenticateDefaultUser(loginPage);
    await productsPage.assertUserIsLoggedIn();
    await use();
  },
});

export { expect };
