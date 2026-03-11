/**
 * Gestión centralizada de environment
 * Permite cambiar entre DEV / QA / STAGE / PROD
 */

export const ENV = process.env.TEST_ENV || 'QA';