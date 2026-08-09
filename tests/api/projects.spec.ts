import { expect, test } from '../../src/fixtures/base';

test.describe('OpenProject API - Projects', () => {
  test('authenticated user can retrieve projects', async ({ apiClient }) => {
    const response = await apiClient.getProjects();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body._type).toBe('Collection');
    expect(typeof body.total).toBe('number');
    expect(typeof body.count).toBe('number');
    expect(Array.isArray(body._embedded.elements)).toBe(true);
    expect(body.count).toBe(body._embedded.elements.length);
  });

  test('authenticated user can create and retrieve a project', async ({ apiClient }) => {
    const uniqueId = Date.now();
    const projectName = `API Automation Project ${uniqueId}`;
    const projectIdentifier = `api-project-${uniqueId}`;

    let projectId: number | undefined;

    try {
      const createResponse = await apiClient.createProject(projectName, projectIdentifier);

      expect(createResponse.status()).toBe(201);

      const createdProject = await createResponse.json();

      projectId = createdProject.id;

      if (typeof projectId !== 'number') {
        throw new Error('Created project response did not contain a valid project ID');
      }

      expect(createdProject._type).toBe('Project');
      expect(createdProject.id).toBeTruthy();
      expect(createdProject.name).toBe(projectName);
      expect(createdProject.identifier).toBe(projectIdentifier);

      const getResponse = await apiClient.getProjectById(projectId);

      expect(getResponse.status()).toBe(200);

      const retrievedProject = await getResponse.json();

      expect(retrievedProject.id).toBe(projectId);
      expect(retrievedProject.name).toBe(projectName);
      expect(retrievedProject.identifier).toBe(projectIdentifier);
    } finally {
      if (projectId) {
        const deleteResponse = await apiClient.deleteProject(projectId);

        expect(deleteResponse.status()).toBe(204);
      }
    }
  });

  test('authenticated user can update a project', async ({ apiClient }) => {
    const uniqueId = Date.now();
    const projectName = `API Update Project ${uniqueId}`;
    const updatedProjectName = `API Updated Project ${uniqueId}`;
    const projectIdentifier = `api-update-project-${uniqueId}`;

    let projectId: number | undefined;

    try {
      const createResponse = await apiClient.createProject(projectName, projectIdentifier);

      expect(createResponse.status()).toBe(201);

      const createdProject = await createResponse.json();

      projectId = createdProject.id;

      if (typeof projectId !== 'number') {
        throw new Error('Created project response did not contain a valid project ID');
      }

      const updateResponse = await apiClient.updateProject(projectId, updatedProjectName);

      expect(updateResponse.status()).toBe(200);

      const updatedProject = await updateResponse.json();

      expect(updatedProject.id).toBe(projectId);
      expect(updatedProject.name).toBe(updatedProjectName);
      expect(updatedProject.identifier).toBe(projectIdentifier);

      const getResponse = await apiClient.getProjectById(projectId);

      expect(getResponse.status()).toBe(200);

      const retrievedProject = await getResponse.json();

      expect(retrievedProject.id).toBe(projectId);
      expect(retrievedProject.name).toBe(updatedProjectName);
      expect(retrievedProject.identifier).toBe(projectIdentifier);
    } finally {
      if (projectId) {
        const deleteResponse = await apiClient.deleteProject(projectId);

        expect(deleteResponse.status()).toBe(204);
      }
    }
  });
  test('returns not found for a non-existent project', async ({ apiClient }) => {
    const response = await apiClient.getProjectById(999999999);

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body._type).toBe('Error');
    expect(body.errorIdentifier).toBe('urn:openproject-org:api:v3:errors:NotFound');
    expect(body.message).toBeTruthy();
  });
});
