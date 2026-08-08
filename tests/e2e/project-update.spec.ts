import { test } from '../../src/fixtures/base';

test.describe('OpenProject - Project Update', () => {
  test('admin can rename an existing project', async ({
    page,
    homePage,
    projectsPage,
    createProjectPage,
    projectSettingsPage,
  }) => {
    const originalName = `Update Project ${Date.now()}`;
    const updatedName = `${originalName} Renamed`;

    await page.goto('/');
    await homePage.expectLoaded();

    await projectsPage.navigateToProjects();
    await projectsPage.clickAddProject();

    await createProjectPage.createProject(
      originalName,
      'Project created to validate project update behavior.',
    );

    await projectsPage.navigateToProjects();
    await projectsPage.searchProject(originalName);
    await projectsPage.openProjectSettings(originalName);

    await projectSettingsPage.expectLoaded();
    await projectSettingsPage.updateProjectName(updatedName);

    await projectsPage.navigateToProjects();
    await projectsPage.searchProject(updatedName);
    await projectsPage.expectProjectVisible(updatedName);

    await projectsPage.deleteProject(updatedName);
  });
});