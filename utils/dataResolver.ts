import fs from 'fs';
import path from 'path';
import { ENV } from '../config/environment';

/**
 * Resolver central de usuarios según environment
 */
export function resolveUser(key: string): string {

  const filePath = path.join(
    __dirname,
    '..',
    'config',
    'environments',
    ENV.toLowerCase(),
    'users.json'
  );

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return data[key];
}

/**
 * Resolver datos de login
 */
export function resolveLoginData(key: string): string {

  const filePath = path.join(
    __dirname,
    '..',
    'test-data',
    'login.json'
  );

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return data[key];
}

/**
 * Resolver datos de compra
 */
export function resolvePurchaseData(key: string): string {

  const filePath = path.join(
    __dirname,
    '..',
    'test-data',
    'purchase.json'
  );

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return data[key];
}