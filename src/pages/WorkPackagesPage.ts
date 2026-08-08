import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class WorkPackagesPage extends BasePage {
  private readonly workPackagesNavigationLink: Locator;
  private readonly pageHeading: Locator;
  private readonly createNewWorkPackageButton: Locator;
  private readonly taskMenuItem: Locator;
  private readonly subjectInput: Locator;
  private readonly saveButton: Locator;
  private readonly successMessage: Locator;
  private readonly deleteMenuItem: Locator;
  private readonly deleteDialogHeading: Locator;
  private readonly deleteAcknowledgementCheckbox: Locator;
  private readonly deletePermanentlyButton: Locator;
  private readonly successfulUpdateMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.workPackagesNavigationLink = page.getByRole('link', {
      name: 'Work packages',
      exact: true,
    });

    this.pageHeading = page.getByRole('heading', {
      name: 'All open',
      exact: true,
    });

    this.createNewWorkPackageButton = page
      .getByRole('button', {
        name: 'Create new work package',
        exact: true,
      })
      .first();

    this.taskMenuItem = page.getByRole('menuitem', {
      name: 'Task',
      exact: true,
    });

    this.subjectInput = page.getByRole('textbox', {
      name: 'Subject',
      exact: true,
    });

    this.saveButton = page.getByRole('button', {
      name: 'Save',
      exact: true,
    });

    this.successMessage = page.getByRole('alert').getByText('Successful creation.', {
    exact: true,
    });

    this.successfulUpdateMessage = page.getByRole('alert').filter({
    hasText: 'Successful update.',
    });

    this.deleteMenuItem = page.getByRole('menuitem', {
      name: 'Delete',
      exact: true,
    });

    this.deleteDialogHeading = page.getByRole('heading', {
      name: 'Permanently delete this work package?',
      exact: true,
    });

    this.deleteAcknowledgementCheckbox = page.getByLabel(
      'I understand that this deletion cannot be reversed',
    );

    this.deletePermanentlyButton = page.getByRole('button', {
      name: 'Delete permanently',
      exact: true,
    });
  }

  async navigateToWorkPackages(): Promise<void> {
    await this.workPackagesNavigationLink.click();

    await expect(this.pageHeading).toBeVisible();
    await this.expectPageURL(/\/work_packages/);
  }

  async createTask(subject: string): Promise<void> {
    await this.createNewWorkPackageButton.click();
    await expect(this.taskMenuItem).toBeVisible();
    await this.taskMenuItem.click();

    await expect(this.subjectInput).toBeVisible();
    await this.subjectInput.fill(subject);

    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();

    await expect(this.successMessage).toBeVisible();
    await this.expectTaskVisible(subject);
  }

  async expectTaskVisible(subject: string): Promise<void> {
    const taskRow = this.page
      .getByRole('row')
      .filter({
        hasText: subject,
      });

    await expect(taskRow).toBeVisible();
    await expect(taskRow).toContainText(/Task/i);
  }

  async expectTaskStatusInTable(
  subject: string,
  status: string,
): Promise<void> {
  const taskRow = this.page
    .getByRole('row')
    .filter({
      hasText: subject,
    });

  await expect(
    taskRow.getByRole('button', {
      name: `Status ${status}: Edit`,
      exact: true,
    }),
  ).toBeVisible();
}

async changeTaskStatus(
  subject: string,
  status: string,
): Promise<void> {
  const taskRow = this.page
    .getByRole('row')
    .filter({
      hasText: subject,
    });

  await taskRow
    .getByRole('button', {
      name: /^Status .+: Edit$/,
    })
    .click();

  await this.page.getByText(status, {
    exact: true,
  }).click();

  await expect(this.successfulUpdateMessage).toBeVisible();
  await this.expectTaskStatusInTable(subject, status);
}

async openTaskDetails(subject: string): Promise<void> {
  const taskRow = this.page
    .getByRole('row')
    .filter({
      hasText: subject,
    });

  await taskRow
    .getByRole('link', {
      name: 'Open details view',
      exact: true,
    })
    .click();

  await expect(
    this.page.getByText(
      `You are on the Overview tab for Task ${subject}.`,
      {
        exact: true,
      },
    ),
  ).toBeVisible();
}

async expectTaskStatusInDetails(status: string): Promise<void> {
  await expect(
    this.page.getByRole('button', {
      name: 'Edit the status of the work package',
      exact: true,
    }),
  ).toContainText(status);
}


  async deleteTask(subject: string): Promise<void> {
  const taskRow = this.page
    .getByRole('row')
    .filter({
      hasText: subject,
    });

  await taskRow
    .getByRole('link', {
      name: 'Open context menu',
      exact: true,
    })
    .click();

  await this.deleteMenuItem.click();

  await expect(this.deleteDialogHeading).toBeVisible();
  await expect(this.deletePermanentlyButton).toBeDisabled();

  await this.deleteAcknowledgementCheckbox.check();

  await expect(this.deletePermanentlyButton).toBeEnabled();
  await this.deletePermanentlyButton.click();

  await expect(taskRow).not.toBeVisible();
}
}