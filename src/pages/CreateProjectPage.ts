import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class CreateProjectPage extends BasePage {
  private readonly blankProjectOption: Locator;
  private readonly continueButton: Locator;
  private readonly nameInput: Locator;
  private readonly identifierInput: Locator;
  private readonly descriptionEditor: Locator;
  private readonly completeButton: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.blankProjectOption = page.getByText('Blank project', {
      exact: true,
    });

    this.continueButton = page.getByRole('button', {
      name: 'Continue',
      exact: true,
    });

    this.nameInput = page.getByRole('textbox', {
      name: 'Name',
      exact: true,
    });

    this.identifierInput = page.getByRole('textbox', {
      name: 'Identifier',
      exact: true,
    });

    this.descriptionEditor = page.locator('[contenteditable="true"]');

    this.completeButton = page.getByRole('button', {
      name: 'Complete',
      exact: true,
    });

    this.successMessage = page
      .locator('#primerized-flash-messages')
      .getByText('Successful creation.', {
        exact: true,
      });
  }

  async selectBlankProject(): Promise<void> {
    await this.blankProjectOption.click();
    await this.continueButton.click();

    await expect(this.nameInput).toBeVisible();
  }

  async fillProjectName(name: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.nameInput.press('Tab');

    await expect(this.identifierInput).not.toHaveValue('');
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionEditor.fill(description);
  }

  async completeCreation(): Promise<void> {
    await this.completeButton.click();
    await expect(this.successMessage).toBeVisible();
  }

  async createProject(name: string, description: string): Promise<void> {
    await this.selectBlankProject();
    await this.fillProjectName(name);
    await this.fillDescription(description);
    await this.completeCreation();
  }
}
