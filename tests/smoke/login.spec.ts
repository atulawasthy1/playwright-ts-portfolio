import { env } from '../../src/config/env';
import { test } from '../../src/fixtures/base';

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.describe('OpenProject - Authentication', () => {
  test('admin can sign in successfully', async ({ loginPage, homePage }) => {
    await loginPage.open();
    await loginPage.expectLoginFormVisible();
    await loginPage.login(env.username, env.password);

    await homePage.expectLoaded();
  });
});
