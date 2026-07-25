import { expect, Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  protected async expectPageTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  protected async expectPageURL(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }
}