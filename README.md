# Playwright TypeScript Test Automation Framework

A scalable, maintainable test automation portfolio built with **Playwright and TypeScript** for Web UI, REST API, and hybrid API–UI testing.

The framework uses **OpenProject** as the application under test and demonstrates practical SDET engineering patterns including reusable authentication, Page Object Model, API clients, custom fixtures, CI quality gates, and cross-layer validation.

---

## Key Engineering Highlights

- Playwright Test with TypeScript
- Web UI automation using Page Object Model
- REST API automation using Playwright `APIRequestContext`
- Hybrid API → UI and UI → API validation
- Reusable authenticated browser state
- Custom Playwright fixtures
- Environment-based configuration
- Automated test data creation and cleanup
- CI/CD quality gates using GitHub Actions
- TypeScript static validation
- ESLint code quality checks
- Prettier formatting validation
- HTML test reporting
- Playwright trace, screenshot, and video support for failures

---

## Tech Stack

| Area | Technology |
|---|---|
| Language | TypeScript |
| Web Automation | Playwright |
| API Automation | Playwright APIRequestContext |
| Runtime | Node.js |
| Package Manager | npm |
| Code Quality | ESLint, Prettier |
| CI/CD | GitHub Actions |
| Version Control | Git, GitHub |
| Application Under Test | OpenProject |

---

## Automation Architecture

The framework separates application interaction, test logic, configuration, API services, and reusable fixtures.

```text
playwright-ts-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docs/
│
├── src/
│   ├── api/
│   ├── config/
│   ├── core/
│   ├── fixtures/
│   ├── pages/
│   ├── types/
│   └── utils/
│
├── tests/
│   ├── api/
│   ├── e2e/
│   ├── regression/
│   └── smoke/
│
├── playwright.config.ts
├── eslint.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Web UI Automation

The UI framework follows reusable Page Object Model principles.

Current automation demonstrates workflows such as:

- Authentication
- Project creation
- Project search
- Project updates
- Project archive and unarchive flows
- Project deletion
- Work package related validation

A reusable `BasePage` provides common navigation and page validation capabilities.

---

## Reusable Authentication

Authentication is handled through a dedicated Playwright setup project.

The authenticated browser state is saved and reused by dependent browser tests using Playwright `storageState`.

This reduces unnecessary login repetition and keeps browser tests faster and cleaner.

---

## Custom Fixtures

The framework uses Playwright fixtures to provide reusable application components to tests.

Page objects and API services are injected through fixtures instead of being repeatedly instantiated inside individual test specifications.

This improves:

- Reusability
- Test readability
- Maintainability
- Separation of concerns

---

## API Automation

The project includes REST API automation for OpenProject.

Current API coverage includes:

- Retrieve project information
- Create projects
- Update projects
- Delete projects
- Validate API response status codes
- Validate response payloads
- Validate expected error responses

API tests use reusable client methods rather than placing HTTP request logic directly inside individual test specifications.

---

## Hybrid API + UI Testing

The framework demonstrates cross-layer validation between API and UI.

### API → UI

A project is created through the REST API and subsequently validated through the web application.

This demonstrates how APIs can be used for efficient test-data preparation while the final business state is validated through the UI.

### UI → API

A project is updated through the web application and the resulting state is subsequently verified through the REST API.

This demonstrates cross-layer consistency validation between frontend and backend behavior.

Hybrid testing helps create faster and more reliable end-to-end automation by using the most appropriate layer for each operation.

---

## Test Data Management

Tests create unique project data dynamically during execution.

Where applicable, generated projects are removed after validation to keep execution repeatable and reduce test-environment pollution.

This helps avoid:

- Hard-coded reusable records
- Duplicate test-data conflicts
- Environment contamination
- Dependencies between executions

---

## Environment Configuration

Runtime configuration is managed through environment variables.

The framework supports configuration such as:

- Base URL
- Username
- Password
- API token

Sensitive values are expected to be supplied through environment configuration rather than hard-coded inside automation tests.

---

## Playwright Configuration

The project currently includes:

- Chromium browser execution
- Dedicated API project
- Authentication setup dependency
- Reusable `storageState`
- Parallel execution support
- CI-specific retry configuration
- HTML reporting
- Screenshots on failure
- Videos retained on failure
- Playwright traces on retry
- Environment-driven base URL configuration

---

## CI/CD and Code Quality

GitHub Actions automatically validates code quality for pushes and pull requests targeting `main`.

Current CI quality gates include:

```bash
npm run typecheck
npm run lint
npm run format:check
```

These checks help prevent TypeScript errors, lint violations, and formatting inconsistencies from reaching the main branch.

---

## TypeScript Validation

The framework uses TypeScript static validation to detect compile-time issues before test execution.

Run:

```bash
npm run typecheck
```

---

## ESLint

ESLint is used to enforce consistent TypeScript coding standards.

Run:

```bash
npm run lint
```

---

## Prettier

Prettier is used for consistent source-code formatting.

Check formatting:

```bash
npm run format:check
```

Apply formatting:

```bash
npm run format
```

---

## Running the Project

### Install dependencies

```bash
npm install
```

### Run all Playwright tests

```bash
npm test
```

### Run smoke tests

```bash
npm run test:smoke
```

### Run API tests

```bash
npm run test:api
```

### Run end-to-end tests

```bash
npm run test:e2e
```

### Run tests in headed mode

```bash
npm run test:headed
```

### Run smoke tests in headed mode

```bash
npm run test:smoke:headed
```

---

## Test Reporting

Playwright HTML reports can be opened using:

```bash
npm run report
```

The framework also captures debugging artifacts based on execution conditions, including:

- Screenshots
- Videos
- Playwright traces

These artifacts help investigate failures without relying only on console output.

---

## Engineering Approach

This portfolio focuses on automation practices commonly expected in modern SDET and QA Automation roles:

- Reusable test architecture
- Page Object Model
- Separation of test logic and application interaction
- UI automation
- API automation
- Hybrid API/UI validation
- Reusable authentication
- Custom fixtures
- Automated test-data lifecycle
- Environment-based configuration
- CI quality enforcement
- Maintainable TypeScript code
- Failure investigation using Playwright artifacts
- Git-based development workflow

---

## CI Quality Workflow

The repository follows a Git-based development workflow where automation changes can be developed on feature branches and validated before merging into `main`.

GitHub Actions currently performs automated:

1. Dependency installation
2. TypeScript validation
3. ESLint validation
4. Prettier formatting validation

This helps maintain consistent code quality as the framework grows.

---

## Why This Project

This repository is designed as a practical SDET portfolio rather than a collection of isolated test scripts.

The focus is on demonstrating:

- Framework design
- Reusable automation components
- Web and API coverage
- Cross-layer testing
- Maintainable test architecture
- CI/CD integration
- Code-quality practices
- Reliable debugging capabilities

---

## Project Status

🚧 **Actively under development**

Currently implemented:

- Framework foundation
- Playwright + TypeScript setup
- Reusable Page Object Model
- Reusable authentication
- Web UI automation
- REST API automation
- Hybrid API/UI validation
- Test-data cleanup
- ESLint
- Prettier
- TypeScript validation
- GitHub Actions CI quality gates

Additional automation capabilities and test coverage will continue to be added.

---

## Author

**Atul Awasthy**

QA Automation Engineer | SDET

**Core Focus:** Playwright · TypeScript · Web Automation · API Automation · CI/CD · Test Automation Framework Design

GitHub: https://github.com/atulawasthy1