import { expect, Locator, Page } from '@playwright/test';

/**
 * Page object for the checkout page.
 */
export class CheckoutPage {
  // Locators
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.confirmationMessage = page.locator('.complete-header');
  }

  /**
   * Fills the customer first name.
   */
  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Fills the customer last name.
   */
  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Fills the customer postal code.
   */
  async enterPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Completes the customer information form.
   */
  async enterCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  /**
   * Continues the checkout flow.
   */
  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Finishes the purchase flow.
   */
  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Verifies that the purchase confirmation is displayed.
   */
  async validatePurchaseConfirmation(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible();
  }
}
