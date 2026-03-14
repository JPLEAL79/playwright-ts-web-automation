import { Page, Locator } from '@playwright/test';

/**
 * Page Object de la página del carrito
 */
export class CartPage {

  private page: Page;

  /* Locators */

  private checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('#checkout');

  }

  /**
   * Avanza al proceso de checkout
   */
  async clickCheckout() {
    await this.checkoutButton.click();

  }

}