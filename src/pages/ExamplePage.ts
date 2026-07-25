import { expect, Page } from '@playwright/test';

export class ExamplePage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('https://example.com');
  }

  async verifyTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Example Domain');
  }

  async verifyHeading(): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: 'Example Domain' })
    ).toBeVisible();
  }
}