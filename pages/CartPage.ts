import { Locator, Page } from '@playwright/test';

/**
 * Page object for the cart page.
 */
export class CartPage {
  private readonly page: Page;

  // Locators
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('#checkout');
  }

  /**
   * Proceeds to the checkout flow.
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
