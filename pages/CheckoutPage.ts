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

  /**
   * Receives the Playwright page used to build the locators for this screen.
   */
  constructor(page: Page) {
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.confirmationMessage = page.locator('.complete-header');
  }

  /**
   * Completes the customer information form.
   */
  async enterCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
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
   * Asserts that the purchase confirmation is displayed.
   */
  async assertPurchaseConfirmation(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible();
  }
}
