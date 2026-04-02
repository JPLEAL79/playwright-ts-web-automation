import { test } from '../../fixtures/base.fixture';
import { resolvePurchaseData } from '../../utils/dataResolver';

/**
 * Test suite for the purchase flow.
 */
test.describe('Purchase Flow', () => {
  /**
   * Verifies that an authenticated user can complete a purchase successfully.
   */
  test('User completes purchase successfully', async ({ loggedUser, productsPage, cartPage, checkoutPage }) => {
    // Add product and open cart.
    await productsPage.addBackpackToCart();
    await productsPage.goToCart();

    // Review cart and start checkout.
    await cartPage.assertBackpackInCart();
    await cartPage.clickCheckout();

    // Complete checkout information.
    await checkoutPage.enterCheckoutInformation(
      resolvePurchaseData('FIRST_NAME'),
      resolvePurchaseData('LAST_NAME'),
      resolvePurchaseData('POSTAL_CODE')
    );

    // Finish purchase and verify confirmation.
    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();
    await checkoutPage.assertPurchaseConfirmation();
  });
});
