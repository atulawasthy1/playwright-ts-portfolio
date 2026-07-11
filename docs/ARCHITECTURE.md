# Architecture

## Overview

This repository follows a layered Playwright and TypeScript automation architecture for Web UI and API testing.

The design keeps reusable framework code separate from test specifications so the project can scale without mixing application logic, test logic, configuration, and utilities.

## Current Architecture

```text
playwright-ts-portfolio/
├── docs/
├── src/
│   ├── api/
│   ├── config/
│   ├── core/
│   ├── fixtures/
│   ├── pages/
│   ├── types/
│   └── utils/
├── tests/
│   ├── api/
│   ├── e2e/
│   ├── regression/
│   └── smoke/
├── AGENTS.md
├── CLAUDE.md
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md