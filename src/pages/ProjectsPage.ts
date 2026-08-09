import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class ProjectsPage extends BasePage {
  private readonly pageHeading: Locator;
  private readonly addButton: Locator;
  private readonly projectMenuItem: Locator;
  private readonly searchInput: Locator;
  private readonly deleteMenuItem: Locator;
  private readonly deleteDialogHeading: Locator;
  private readonly deleteAcknowledgementCheckbox: Locator;
  private readonly deletePermanentlyButton: Locator;
  private readonly archiveMenuItem: Locator;
  private readonly unarchiveMenuItem: Locator;
  private readonly archivedProjectsLink: Locator;
  private readonly archivedPageHeading: Locator;
  private readonly projectSettingsMenuItem: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', {
      name: 'Active projects',
      exact: true,
    });

    this.addButton = page.getByRole('button', {
      name: 'Add',
      exact: true,
    });

    this.projectMenuItem = page.getByRole('menuitem', {
      name: 'Project',
      exact: true,
    });

    this.searchInput = page.getByPlaceholder('Search by name');

    this.deleteMenuItem = page.getByRole('menuitem', {
      name: 'Delete',
      exact: true,
    });

    this.deleteDialogHeading = page.getByRole('heading', {
      name: 'Permanently delete this project?',
      exact: true,
    });

    this.deleteAcknowledgementCheckbox = page.getByLabel(
      'I understand that this deletion cannot be reversed',
    );

    this.deletePermanentlyButton = page.getByRole('button', {
      name: 'Delete permanently',
      exact: true,
    });

    this.archiveMenuItem = page.getByRole('menuitem', {
      name: 'Archive',
      exact: true,
    });

    this.unarchiveMenuItem = page.getByRole('menuitem', {
      name: 'Unarchive',
      exact: true,
    });

    this.archivedProjectsLink = page.getByRole('link', {
      name: 'Archived projects',
      exact: true,
    });

    this.archivedPageHeading = page.getByRole('heading', {
      name: 'Archived projects',
      exact: true,
    });

    this.projectSettingsMenuItem = page.getByRole('menuitem', {
      name: 'Project settings',
      exact: true,
    });
  }
  async navigateToProjects(): Promise<void> {
    await this.navigate('/projects');

    await expect(this.pageHeading).toBeVisible();
    await this.expectPageURL(/\/projects/);
  }

  async clickAddProject(): Promise<void> {
    await this.addButton.click();
    await this.projectMenuItem.click();

    await expect(
      this.page.getByRole('heading', {
        name: 'New project',
        exact: true,
      }),
    ).toBeVisible();
  }

  async searchProject(name: string): Promise<void> {
    await this.searchInput.fill(name);
  }

  async expectProjectVisible(name: string): Promise<void> {
    await expect(
      this.page.getByRole('link', {
        name,
        exact: true,
      }),
    ).toBeVisible();
  }

  async openProject(name: string): Promise<void> {
    await this.page
      .getByRole('link', {
        name,
        exact: true,
      })
      .click();

    await expect(
      this.page.getByRole('heading', {
        name,
        exact: true,
      }),
    ).toBeVisible();
  }

  async openProjectActions(name: string): Promise<void> {
    const projectRow = this.page.getByRole('row').filter({
      hasText: name,
    });

    await projectRow.getByRole('button').click();
  }

  async deleteProject(name: string): Promise<void> {
    await this.openProjectActions(name);
    await this.deleteMenuItem.click();

    await expect(this.deleteDialogHeading).toBeVisible();
    await expect(this.deletePermanentlyButton).toBeDisabled();

    await this.deleteAcknowledgementCheckbox.check();

    await expect(this.deletePermanentlyButton).toBeEnabled();
    await this.deletePermanentlyButton.click();

    await expect(
      this.page.getByRole('link', {
        name,
        exact: true,
      }),
    ).not.toBeVisible();
  }
  async archiveProject(name: string): Promise<void> {
    await this.openProjectActions(name);

    this.page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe(`Are you sure you want to archive the project '${name}'?`);

      await dialog.accept();
    });

    await this.archiveMenuItem.click();

    await expect(
      this.page.getByRole('link', {
        name,
        exact: true,
      }),
    ).not.toBeVisible();
  }

  async openArchivedProjects(): Promise<void> {
    await this.archivedProjectsLink.click();

    await expect(this.archivedPageHeading).toBeVisible();
    await this.expectPageURL(/query_id=archived/);
  }

  async expectArchivedProjectVisible(name: string): Promise<void> {
    const archivedProjectRow = this.page.getByRole('row').filter({
      hasText: name,
    });

    await expect(archivedProjectRow).toBeVisible();
    await expect(archivedProjectRow).toContainText('(Archived)');
  }

  async unarchiveProject(name: string): Promise<void> {
    const archivedProjectRow = this.page.getByRole('row').filter({
      hasText: name,
    });

    await archivedProjectRow.getByRole('button').click();
    await this.unarchiveMenuItem.click();

    await expect(this.pageHeading).toBeVisible();
    await this.expectPageURL(/\/projects$/);

    const restoredProjectRow = this.page.getByRole('row').filter({
      hasText: name,
    });

    await expect(restoredProjectRow).toBeVisible();
    await expect(restoredProjectRow).not.toContainText('(Archived)');
  }

  async openProjectSettings(name: string): Promise<void> {
    await this.openProjectActions(name);
    await this.projectSettingsMenuItem.click();
  }
}
