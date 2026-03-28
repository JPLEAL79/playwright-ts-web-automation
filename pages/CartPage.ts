import { expect, Locator, Page } from '@playwright/test';

/**
 * Page object for the cart page.
 */
export class CartPage {
  // Locators
  private readonly checkoutButton: Locator;
  private readonly backpackItem: Locator;

  constructor(page: Page) {
    this.checkoutButton = page.locator('#checkout');
    this.backpackItem = page.locator('text=Sauce Labs Backpack');
  }

  /**
   * Proceeds to the checkout flow.
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Verifies that the backpack item is visible in the cart.
   */
  async validateBackpackInCart(): Promise<void> {
    await expect(this.backpackItem).toBeVisible();
  }
}
