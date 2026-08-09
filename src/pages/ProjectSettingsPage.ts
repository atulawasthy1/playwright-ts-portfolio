import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class ProjectSettingsPage extends BasePage {
  private readonly informationHeading: Locator;
  private readonly nameInput: Locator;
  private readonly updateDetailsButton: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.informationHeading = page.getByRole('heading', {
      name: 'Information',
      exact: true,
    });

    this.nameInput = page.getByRole('textbox', {
      name: 'Name',
      exact: true,
    });

    this.updateDetailsButton = page.getByRole('button', {
      name: 'Update details',
      exact: true,
    });

    this.successMessage = page
      .locator('#primerized-flash-messages')
      .getByText(/Successful update/i);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.informationHeading).toBeVisible();
    await this.expectPageURL(/\/settings\/general/);
  }

  async updateProjectName(newName: string): Promise<void> {
    await this.nameInput.fill(newName);
    await this.updateDetailsButton.click();

    await expect(this.successMessage).toBeVisible();
    await expect(this.nameInput).toHaveValue(newName);
  }
}
