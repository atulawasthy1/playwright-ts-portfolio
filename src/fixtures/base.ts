import { test as base } from '@playwright/test';
import { OpenProjectApiClient } from '../api/OpenProjectApiClient';
import { CreateProjectPage } from '../pages/CreateProjectPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectSettingsPage } from '../pages/ProjectSettingsPage';
import { WorkPackagesPage } from '../pages/WorkPackagesPage';

type AppFixtures = {
  apiClient: OpenProjectApiClient;
  homePage: HomePage;
  loginPage: LoginPage;
  projectsPage: ProjectsPage;
  createProjectPage: CreateProjectPage;
  projectSettingsPage: ProjectSettingsPage;
  workPackagesPage: WorkPackagesPage;
};

export const test = base.extend<AppFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new OpenProjectApiClient(request));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },

  createProjectPage: async ({ page }, use) => {
    await use(new CreateProjectPage(page));
  },

  projectSettingsPage: async ({ page }, use) => {
    await use(new ProjectSettingsPage(page));
  },

  workPackagesPage: async ({ page }, use) => {
    await use(new WorkPackagesPage(page));
  },
});

export { expect } from '@playwright/test';
