import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator("[data-test='error']");
  }

  /**
   * Opens the application entry page.
   */
  async openApplication(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Fills the username field.
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fills the password field.
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login button.
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Performs the complete login action.
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Verifies the displayed login error message.
   */
  async validateErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
