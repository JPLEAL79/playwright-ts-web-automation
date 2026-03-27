import { expect, Locator, Page } from '@playwright/test';

/**
 * Page object for the products page.
 */
export class ProductsPage {
  // Locators
  private readonly productsTitle: Locator;
  private readonly addBackpackButton: Locator;
  private readonly cartButton: Locator;
  private readonly backpackItem: Locator;

  constructor(page: Page) {
    this.productsTitle = page.locator('#header_container');
    this.addBackpackButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.cartButton = page.locator('#shopping_cart_container');
    this.backpackItem = page.locator('text=Sauce Labs Backpack');
  }

  /**
   * Verifies that the user is successfully logged in.
   */
  async validateUserIsLoggedIn(): Promise<void> {
    await expect(this.productsTitle).toBeVisible();
  }

  /**
   * Adds the backpack product to the cart.
   */
  async addBackpackToCart(): Promise<void> {
    await this.addBackpackButton.click();
  }

  /**
   * Opens the shopping cart page.
   */
  async goToCart(): Promise<void> {
    await this.cartButton.click();
  }

  /**
   * Verifies that the backpack item is visible.
   */
  async validateBackpackInCart(): Promise<void> {
    await expect(this.backpackItem).toBeVisible();
  }
}
