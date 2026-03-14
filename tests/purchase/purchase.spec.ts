import { test } from '../../fixtures/base.fixture';
import { resolvePurchaseData } from '../../utils/dataResolver';

/**
 * Suite de pruebas para el flujo de compra
 */
test.describe('Purchase Flow', () => {

  test('User completes purchase successfully',
    async ({ loggedUser, productsPage, cartPage, checkoutPage }) => {

      // Agregar producto al carrito
      await productsPage.addBackpackToCart();

      // Ir al carrito
      await productsPage.goToCart();

      // Iniciar checkout
      await cartPage.clickCheckout();

      // Ingresar datos del cliente
      await checkoutPage.enterFirstName(
        resolvePurchaseData('FIRST_NAME')
      );

      await checkoutPage.enterLastName(
        resolvePurchaseData('LAST_NAME')
      );

      await checkoutPage.enterPostalCode(
        resolvePurchaseData('POSTAL_CODE')
      );

      // Continuar proceso
      await checkoutPage.continueCheckout();

      // Finalizar compra
      await checkoutPage.finishCheckout();

      // Validar confirmación
      await checkoutPage.validatePurchaseConfirmation();

    });

});