import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const projectRoot = path.resolve(__dirname, '..');

let environmentLoaded = false;

function loadIfPresent(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    return;
  }

  dotenv.config({
    path: filePath,
    override: true,
    quiet: true,
  });
}

/**
 * Loads environment variables using a layered strategy similar to mature CI/CD
 * setups: shared defaults first, then environment-specific values, then local
 * overrides.
 */
export function loadEnvironmentVariables(): void {
  if (environmentLoaded) {
    return;
  }

  loadIfPresent(path.join(projectRoot, '.env'));
  loadIfPresent(path.join(projectRoot, '.env.local'));

  const selectedEnvironment = (process.env.TEST_ENV?.trim() || 'QA').toLowerCase();

  loadIfPresent(path.join(projectRoot, `.env.${selectedEnvironment}`));
  loadIfPresent(path.join(projectRoot, `.env.${selectedEnvironment}.local`));

  environmentLoaded = true;
}
