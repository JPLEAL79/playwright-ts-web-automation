import appConfiguration from './environments/qa/app.json';

const SUPPORTED_ENVIRONMENTS = ['QA'] as const;

type SupportedEnvironment = (typeof SUPPORTED_ENVIRONMENTS)[number];
type EnvironmentConfig = {
  baseUrl: string;
};

const ENVIRONMENT_CONFIG: Record<SupportedEnvironment, EnvironmentConfig> = {
  QA: appConfiguration,
};

/**
 * Resolves the active test environment and validates supported values.
 */
function resolveEnvironment(): SupportedEnvironment {
  const rawEnvironment = process.env.TEST_ENV?.trim().toUpperCase() || 'QA';

  if (
    !SUPPORTED_ENVIRONMENTS.includes(rawEnvironment as SupportedEnvironment)
  ) {
    throw new Error(
      `Unsupported TEST_ENV "${rawEnvironment}". Supported values: ${SUPPORTED_ENVIRONMENTS.join(', ')}.`
    );
  }

  return rawEnvironment as SupportedEnvironment;
}

export const ENV = resolveEnvironment();
export const environmentConfig = ENVIRONMENT_CONFIG[ENV];
