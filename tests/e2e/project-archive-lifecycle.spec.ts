import { test } from '../../src/fixtures/base';

test.describe('OpenProject - Project Archive Lifecycle', () => {
  test('admin can archive and unarchive a project', async ({
    page,
    homePage,
    projectsPage,
    createProjectPage,
  }) => {
    const projectName = `Archive Project ${Date.now()}`;
    const description = 'Project created to validate archive and unarchive behavior.';

    await page.goto('/');
    await homePage.expectLoaded();

    await projectsPage.navigateToProjects();
    await projectsPage.clickAddProject();
    await createProjectPage.createProject(projectName, description);

    await projectsPage.navigateToProjects();
    await projectsPage.searchProject(projectName);
    await projectsPage.archiveProject(projectName);

    await projectsPage.openArchivedProjects();
    await projectsPage.expectArchivedProjectVisible(projectName);
    await projectsPage.unarchiveProject(projectName);

    await projectsPage.navigateToProjects();
    await projectsPage.searchProject(projectName);
    await projectsPage.expectProjectVisible(projectName);

    await projectsPage.deleteProject(projectName);
  });
});
