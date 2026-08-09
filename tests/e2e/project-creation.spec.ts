import { test } from '../../src/fixtures/base';

test.describe('OpenProject - Project Management', () => {
  test('admin can create a project and find it in the active projects list', async ({
    page,
    homePage,
    projectsPage,
    createProjectPage,
  }) => {
    const projectName = `Portfolio Project ${Date.now()}`;
    const description = 'Project created through the Playwright TypeScript portfolio framework.';

    await page.goto('/');
    await homePage.expectLoaded();

    await projectsPage.navigateToProjects();
    await projectsPage.clickAddProject();

    await createProjectPage.createProject(projectName, description);

    await projectsPage.navigateToProjects();
    await projectsPage.searchProject(projectName);
    await projectsPage.expectProjectVisible(projectName);
    await projectsPage.openProject(projectName);

    await projectsPage.navigateToProjects();
    await projectsPage.searchProject(projectName);
    await projectsPage.deleteProject(projectName);
  });
});
