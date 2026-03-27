# Playwright TypeScript Web Automation Framework

End-to-end web automation framework built with Playwright and TypeScript.

The project follows a clean and scalable structure based on:
- Page Object Model
- reusable fixtures
- externalized test data
- environment-based configuration

## Tech Stack

- Playwright
- TypeScript
- Node.js

## Project Structure

```text
playwright-ts-web
|-- config
|   |-- environment.ts
|   `-- environments
|       `-- qa
|           `-- users.json
|-- fixtures
|   `-- base.fixture.ts
|-- pages
|   |-- CartPage.ts
|   |-- CheckoutPage.ts
|   |-- LoginPage.ts
|   `-- ProductsPage.ts
|-- test-data
|   |-- loginData.json
|   `-- purchaseData.json
|-- tests
|   |-- login
|   |   `-- login.spec.ts
|   `-- purchase
|       `-- purchase.spec.ts
|-- utils
|   `-- dataResolver.ts
|-- package.json
`-- playwright.config.ts
```

## Setup

```bash
npm install
```

## Run Tests

Run the full suite:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run login tests only:

```bash
npm run test:login
```

Run purchase tests only:

```bash
npm run test:purchase
```

Run Chrome project:

```bash
npm run test:chrome
```

Run Firefox project:

```bash
npm run test:firefox
```

Open the Playwright HTML report:

```bash
npm run report
```

## Environment Configuration

The framework currently supports:

- `QA`

The active environment is resolved through:

```bash
TEST_ENV=QA
```

## Test Data

The framework keeps test data outside the specs to avoid hardcoded values.

- `config/environments/qa/users.json`: environment-specific credentials
- `test-data/loginData.json`: login validation messages
- `test-data/purchaseData.json`: purchase flow data

## Current Design Goals

- readable page objects
- reusable test fixtures
- clean separation of data and test logic
- scalable foundation for CI/CD integration

## Author

Juan Pablo Leal
