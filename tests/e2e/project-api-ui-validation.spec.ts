import { expect, test } from '../../src/fixtures/base';

test.describe('OpenProject - Hybrid API and UI', () => {
  test('project created through API is available in the UI', async ({
    page,
    apiClient,
    homePage,
    projectsPage,
  }) => {
    const uniqueId = Date.now();
    const projectName = `Hybrid Project ${uniqueId}`;
    const projectIdentifier = `hybrid-project-${uniqueId}`;

    let projectId: number | undefined;

    try {
      const createResponse = await apiClient.createProject(
        projectName,
        projectIdentifier,
      );

      expect(createResponse.status()).toBe(201);

      const createdProject = await createResponse.json();

      projectId = createdProject.id;

      if (typeof projectId !== 'number') {
        throw new Error(
          'Created project response did not contain a valid project ID',
        );
      }

      await page.goto('/');
      await homePage.expectLoaded();

      await projectsPage.navigateToProjects();
      await projectsPage.searchProject(projectName);
      await projectsPage.expectProjectVisible(projectName);
      await projectsPage.openProject(projectName);
    } finally {
      if (projectId) {
        const deleteResponse = await apiClient.deleteProject(projectId);

        expect(deleteResponse.status()).toBe(204);
      }
    }
  });
test('project updated through UI is reflected in the API', async ({
  page,
  apiClient,
  homePage,
  projectsPage,
  projectSettingsPage,
}) => {
  const uniqueId = Date.now();
  const originalName = `Hybrid Update Project ${uniqueId}`;
  const updatedName = `${originalName} Renamed`;
  const projectIdentifier = `hybrid-update-project-${uniqueId}`;

  let projectId: number | undefined;

  try {
    const createResponse = await apiClient.createProject(
      originalName,
      projectIdentifier,
    );

    expect(createResponse.status()).toBe(201);

    const createdProject = await createResponse.json();

    projectId = createdProject.id;

    if (typeof projectId !== 'number') {
      throw new Error(
        'Created project response did not contain a valid project ID',
      );
    }

    await page.goto('/');
    await homePage.expectLoaded();

    await projectsPage.navigateToProjects();
    await projectsPage.searchProject(originalName);
    await projectsPage.openProjectSettings(originalName);

    await projectSettingsPage.expectLoaded();
    await projectSettingsPage.updateProjectName(updatedName);

    const getResponse = await apiClient.getProjectById(projectId);

    expect(getResponse.status()).toBe(200);

    const retrievedProject = await getResponse.json();

    expect(retrievedProject.id).toBe(projectId);
    expect(retrievedProject.name).toBe(updatedName);
    expect(retrievedProject.identifier).toBe(projectIdentifier);
  } finally {
    if (projectId) {
      const deleteResponse = await apiClient.deleteProject(projectId);

      expect(deleteResponse.status()).toBe(204);
    }
  }
});
});