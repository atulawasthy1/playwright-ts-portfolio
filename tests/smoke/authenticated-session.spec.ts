import { test } from '../../src/fixtures/base';

test.describe('OpenProject - Authenticated Session', () => {
  test('user can access OpenProject using saved authentication state', async ({
    page,
    homePage,
  }) => {
    await page.goto('/');

    await homePage.expectLoaded();
  });
});
