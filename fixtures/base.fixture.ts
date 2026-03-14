import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { resolveUser } from '../utils/dataResolver';

type Pages = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;

  // fixture que representa un usuario autenticado
  loggedUser: void;
};

export const test = base.extend<Pages>({

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
   * Fixture que ejecuta login automático
   * Similar al Background de Cucumber
   */
  loggedUser: async ({ loginPage }, use) => {

    await loginPage.openApplication();
    await loginPage.enterUsername(resolveUser('USER_OK'));
    await loginPage.enterPassword(resolveUser('PASS_OK'));
    await loginPage.clickLogin();
    await use();

  }

});