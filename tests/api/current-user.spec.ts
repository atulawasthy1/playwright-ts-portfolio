import { expect, test } from '../../src/fixtures/base';

test.describe('OpenProject API - Current User', () => {
  test('authenticated user can retrieve own profile', async ({ apiClient }) => {
    const response = await apiClient.getCurrentUser();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body._type).toBe('User');
    expect(body.id).toBeTruthy();
    expect(body.name).toBeTruthy();
  });
});
