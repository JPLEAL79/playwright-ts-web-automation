import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object de la página de checkout
 */
export class CheckoutPage {

  private page: Page;

  /* Locators */

  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  private confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.confirmationMessage = page.locator('.complete-header');

  }

  /**
   * Ingresa nombre del cliente
   */
  async enterFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);

  }

  /**
   * Ingresa apellido del cliente
   */
  async enterLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);

  }

  /**
   * Ingresa código postal
   */
  async enterPostalCode(postalCode: string) {
    await this.postalCodeInput.fill(postalCode);

  }

  /**
   * Continúa el proceso de checkout
   */
  async continueCheckout() {
    await this.continueButton.click();

  }

  /**
   * Finaliza la compra
   */
  async finishCheckout() {
    await this.finishButton.click();

  }

  /**
   * Valida confirmación de compra
   */
  async validatePurchaseConfirmation() {
    await expect(this.confirmationMessage).toBeVisible();

  }

}