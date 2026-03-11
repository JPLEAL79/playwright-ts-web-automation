import { Page, Locator, expect } from '@playwright/test';


export class LoginPage {

  private page: Page;

  /* Locators */

  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator("[data-test='error']");
  }

  /**
   * Abre la aplicación
   */
  async openApplication() {
    await this.page.goto('/');
  }

  /**
   * Ingresa username
   */
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  /**
   * Ingresa password
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click botón login
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Validar mensaje de error
   */
  async validateErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

}