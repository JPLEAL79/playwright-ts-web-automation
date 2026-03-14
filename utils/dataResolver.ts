import fs from 'fs';
import path from 'path';
import { ENV } from '../config/environment';

/**
 * Carga de datos una sola vez para evitar lecturas repetidas de archivos
 */

const usersData = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      '..',
      'config',
      'environments',
      ENV.toLowerCase(),
      'users.json'
    ),
    'utf-8'
  )
);

const loginData = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      '..',
      'test-data',
      'loginData.json'
    ),
    'utf-8'
  )
);

const purchaseData = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      '..',
      'test-data',
      'purchaseData.json'
    ),
    'utf-8'
  )
);

/**
 * Resolver de usuarios
 */
export function resolveUser(key: string): string {
  const value = usersData[key];

  if (!value) {
    throw new Error('Missing key in users.json: ${key}');
  }

  return value;

}

/**
 * Resolver de datos de login
 */
export function resolveLoginData(key: string): string {
  const value = loginData[key];

  if (!value) {
    throw new Error('Missing key in loginData.json: ${key}');
  }

  return value;

}

/**
 * Resolver de datos de compra
 */
export function resolvePurchaseData(key: string): string {
  const value = purchaseData[key];

  if (!value) {
    throw new Error('Missing key in purchaseData.json: ${key}');
  }

  return value;

}