import { expect, test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { resolveUser } from '../utils/dataResolver';

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
async function loginWithDefaultUser(loginPage: LoginPage): Promise<void> {
  await loginPage.openApplication();
  await loginPage.login(resolveUser('USER_OK'), resolveUser('PASS_OK'));
}

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  /**
   * Provides an authenticated session for tests that require a logged user.
   * This plays a similar role to a reusable Cucumber Background setup.
   */
  loggedUser: async ({ loginPage }, use) => {
    await loginWithDefaultUser(loginPage);
    await use();
  },
});

export { expect };
