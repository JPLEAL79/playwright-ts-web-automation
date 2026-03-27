import { test } from '../../fixtures/base.fixture';
import { resolvePurchaseData } from '../../utils/dataResolver';

/**
 * Test suite for the purchase flow.
 */
test.describe('Purchase Flow', () => {
  test(
    'User completes purchase successfully',
    async ({ loggedUser, productsPage, cartPage, checkoutPage }) => {
      await productsPage.addBackpackToCart();
      await productsPage.goToCart();
      await productsPage.validateBackpackInCart();
      await cartPage.clickCheckout();

      await checkoutPage.enterCheckoutInformation(
        resolvePurchaseData('FIRST_NAME'),
        resolvePurchaseData('LAST_NAME'),
        resolvePurchaseData('POSTAL_CODE')
      );

      await checkoutPage.continueCheckout();
      await checkoutPage.finishCheckout();
      await checkoutPage.validatePurchaseConfirmation();
    }
  );
});
