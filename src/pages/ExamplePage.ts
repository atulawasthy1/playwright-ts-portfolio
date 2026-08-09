import { expect, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class ExamplePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('https://example.com');
  }

  async verifyTitle(): Promise<void> {
    await this.expectPageTitle('Example Domain');
  }

  async verifyHeading(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
  }
}
