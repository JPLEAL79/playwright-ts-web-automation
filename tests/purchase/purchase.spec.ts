import { test } from '../../fixtures/base.fixture';
import { resolveUser, resolvePurchaseData } from '../../utils/dataResolver';

/**
 * Suite de pruebas para el flujo de compra
 */
test.describe('Purchase Flow', () => {

  test('User completes purchase successfully', async ({ loginPage, productsPage, cartPage, checkoutPage }) => {

    // Abrir aplicación
    await loginPage.openApplication();

    // Login usando keys lógicas
    await loginPage.enterUsername(resolveUser('USER_OK'));
    await loginPage.enterPassword(resolveUser('PASS_OK'));
    await loginPage.clickLogin();

    // Agregar producto al carrito
    await productsPage.addBackpackToCart();

    // Ir al carrito
    await productsPage.goToCart();

    // Iniciar checkout
    await cartPage.clickCheckout();

    // Datos del cliente desde test-data
    await checkoutPage.enterFirstName(resolvePurchaseData('FIRST_NAME_DEFAULT'));
    await checkoutPage.enterLastName(resolvePurchaseData('LAST_NAME_DEFAULT'));
    await checkoutPage.enterPostalCode(resolvePurchaseData('POSTAL_CODE_DEFAULT'));

    // Continuar checkout
    await checkoutPage.continueCheckout();

    // Confirmar compra
    await checkoutPage.finishCheckout();

    // Validar confirmación
    await checkoutPage.validatePurchaseConfirmation();

  });

});