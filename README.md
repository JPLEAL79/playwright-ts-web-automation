# Playwright TypeScript Automation Framework

Automation framework built with **Playwright + TypeScript** for end-to-end testing of an e-commerce web application.
The project follows clean automation practices using **Page Object Model**, reusable **fixtures**, and **externalized test data**, providing a scalable foundation for integration with CI/CD pipelines and cloud environments such as Docker and AWS.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)

---

## Project Structure

```text
playwright-ts-web
│
├── config
│   ├── environment.ts
│   └── environments
│       └── qa
│           └── users.json
│
├── fixtures
│   └── base.fixture.ts
│
├── pages
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests
│   ├── login
│   │   └── login.spec.ts
│   └── purchase
│       └── purchase.spec.ts
│
├── test-data
│   ├── loginData.json
│   └── purchaseData.json
│
├── utils
│   └── dataResolver.ts
│
├── playwright.config.ts
├── package.json
└── tsconfig.json

Project Setup:
1. Create the project
mkdir playwright-ts-web
cd playwright-ts-web
npm init -y
npm init playwright@latest

---

2. Recommended setup during Playwright installation
✔ Do you want to use TypeScript? → Yes
✔ Where to put your tests? → tests
✔ Add GitHub Actions workflow? → No
✔ Install Playwright browsers? → Yes

---

3. Install dependencies:
npm install

Running Tests.
Run all tests: npx playwright test
Run tests in headed mode: npx playwright test --headed
Run login tests only: npx playwright test tests/login
Run purchase tests only: npx playwright test tests/purchase

---

Browser Support:
Run tests in Chrome
npx playwright test --project=chrome
Run tests in Firefox
npx playwright test --project=firefox
Open HTML report
npx playwright show-report

---

Test Data:
Test data is externalized to avoid hardcoded values in tests.
config/environments/qa/users.json → user credentials
test-data/loginData.json → login validation messages
test-data/purchaseData.json → purchase flow data

Author:
Juan Pablo Leal
Senior QA Automation Engineer