import { expect, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).not.toHaveURL(/\/login/);
    await expect(
      this.page.getByRole('heading', {
        name: 'OpenProject',
        exact: true,
      }),
    ).toBeVisible();
  }
}
