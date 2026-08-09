import { test } from '../../src/fixtures/base';

test.describe('OpenProject - Work Package Status Lifecycle', () => {
  test('admin can move a task from New to In progress', async ({
    page,
    homePage,
    projectsPage,
    createProjectPage,
    workPackagesPage,
  }) => {
    const timestamp = Date.now();
    const projectName = `Status Lifecycle Project ${timestamp}`;
    const taskSubject = `Status Lifecycle Task ${timestamp}`;

    await page.goto('/');
    await homePage.expectLoaded();

    await projectsPage.navigateToProjects();
    await projectsPage.clickAddProject();

    await createProjectPage.createProject(
      projectName,
      'Project created to validate the work package status lifecycle.',
    );

    await workPackagesPage.navigateToWorkPackages();
    await workPackagesPage.createTask(taskSubject);

    await workPackagesPage.expectTaskStatusInTable(taskSubject, 'New');

    await workPackagesPage.changeTaskStatus(taskSubject, 'In progress');

    await workPackagesPage.expectTaskStatusInTable(taskSubject, 'In progress');

    await workPackagesPage.openTaskDetails(taskSubject);
    await workPackagesPage.expectTaskStatusInDetails('In progress');

    await workPackagesPage.deleteTask(taskSubject);

    await projectsPage.navigateToProjects();
    await projectsPage.searchProject(projectName);
    await projectsPage.deleteProject(projectName);
  });
});
