import { env } from '../src/config/env';
import { test as setup } from '../src/fixtures/base';

const authFile = 'playwright/.auth/user.json';

setup('authenticate OpenProject user', async ({
  page,
  loginPage,
  homePage,
}) => {
  await loginPage.open();
  await loginPage.expectLoginFormVisible();
  await loginPage.login(env.username, env.password);

  await homePage.expectLoaded();

  await page.context().storageState({
    path: authFile,
  });
});