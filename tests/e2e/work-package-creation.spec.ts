import { test } from '../../src/fixtures/base';

test.describe('OpenProject - Work Package Management', () => {
  test('admin can create and delete a task inside a project', async ({
    page,
    homePage,
    projectsPage,
    createProjectPage,
    workPackagesPage,
  }) => {
    const projectName = `Work Package Project ${Date.now()}`;
    const taskSubject = `Automation Task ${Date.now()}`;

    await page.goto('/');
    await homePage.expectLoaded();

    await projectsPage.navigateToProjects();
    await projectsPage.clickAddProject();

    await createProjectPage.createProject(
      projectName,
      'Project created to validate work package behavior.',
    );

    await workPackagesPage.navigateToWorkPackages();
    await workPackagesPage.createTask(taskSubject);
    await workPackagesPage.deleteTask(taskSubject);

    await projectsPage.navigateToProjects();
    await projectsPage.searchProject(projectName);
    await projectsPage.deleteProject(projectName);
  });
});