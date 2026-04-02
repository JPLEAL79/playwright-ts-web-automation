import { expect, Locator, Page } from '@playwright/test';

/**
 * Page object for the login page.
 */
export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  /**
   * Receives the Playwright page used to interact with the browser.
   */
  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator("[data-test='error']");
  }

  /**
   * Opens the application entry page.
   * The "/" route is resolved against the baseURL from Playwright config.
   */
  async openApplication(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Performs the complete login action.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Clicks the login button without filling credentials.
   */
  async submitLoginWithoutCredentials(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Asserts the displayed login error message.
   */
  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
