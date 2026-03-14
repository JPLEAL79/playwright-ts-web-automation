import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object de la página de productos
 */
export class ProductsPage {

  private page: Page;

  /* Locators */

  private productsTitle: Locator;
  private addBackpackButton: Locator;
  private cartButton: Locator;
  private backpackItem: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productsTitle = page.locator('#header_container');
    this.addBackpackButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.cartButton = page.locator('#shopping_cart_container');
    this.backpackItem = page.locator("text=Sauce Labs Backpack");

  }

  /**
 * Valida que el usuario se encuentra autenticado en la aplicación
 */
  async validateUserIsLoggedIn() {
    await expect(this.productsTitle).toBeVisible();

  }

  /**
   * Agrega el producto Backpack al carrito
   */
  async addBackpackToCart() {
    await this.addBackpackButton.click();

  }

  /**
   * Navega al carrito
   */
  async goToCart() {
    await this.cartButton.click();

  }

  /**
   * Verifica que el producto esté en el carrito
   */
  async isBackpackInCart() {
    await expect(this.backpackItem).toBeVisible();

  }

}