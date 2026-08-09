import { test } from '@playwright/test';
import { ExamplePage } from '../../src/pages/ExamplePage';

test.describe('Example Domain - Smoke Tests', () => {
  test('should open the page and verify the main heading', async ({ page }) => {
    const examplePage = new ExamplePage(page);

    await examplePage.open();
    await examplePage.verifyTitle();
    await examplePage.verifyHeading();
  });
});
