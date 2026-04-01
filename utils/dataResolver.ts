import fs from 'fs';
import path from 'path';
import { ENV } from '../config/environment';

type DataMap = Record<string, string>;

/**
 * Reads and parses a JSON file once at module load time.
 * This keeps test execution simple and avoids repeated disk reads.
 */
function loadJsonFile(relativePathSegments: string[]): DataMap {
  const filePath = path.join(__dirname, '..', ...relativePathSegments);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return JSON.parse(fileContent) as DataMap;
}

/**
 * Resolves a required key from a data source and fails fast with context.
 */
function resolveRequiredValue(
  source: DataMap,
  key: string,
  sourceName: string
): string {
  const value = source[key];

  if (!value) {
    throw new Error(`Missing key "${key}" in ${sourceName}.`);
  }

  return value;
}

/**
 * Resolves a non-empty environment variable when it exists.
 */
function resolveEnvironmentValue(key: string): string | undefined {
  const value = process.env[key]?.trim();

  return value ? value : undefined;
}

const usersData = loadJsonFile([
  'config',
  'environments',
  ENV.toLowerCase(),
  'users.json',
]);

const loginData = loadJsonFile([
  'test-data',
  'loginData.json',
]);

const purchaseData = loadJsonFile([
  'test-data',
  'purchaseData.json',
]);

/**
 * Resolves environment-specific user credentials.
 */
export function resolveUser(key: string): string {
  const environmentValue = resolveEnvironmentValue(key);

  if (environmentValue) {
    return environmentValue;
  }

  return resolveRequiredValue(
    usersData,
    key,
    `config/environments/${ENV.toLowerCase()}/users.json or environment variables`
  );
}

/**
 * Resolves login-related test data.
 */
export function resolveLoginData(key: string): string {
  return resolveRequiredValue(loginData, key, 'loginData.json');
}

/**
 * Resolves purchase-related test data.
 */
export function resolvePurchaseData(key: string): string {
  return resolveRequiredValue(purchaseData, key, 'purchaseData.json');
}
