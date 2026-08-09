// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default defineConfig({
  files: ['**/*.{js,mjs,ts}'],
  ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**', 'playwright/.auth/**'],
  extends: [js.configs.recommended, tseslint.configs.recommended, eslintConfigPrettier],
});
