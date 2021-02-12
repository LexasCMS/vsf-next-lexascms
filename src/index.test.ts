import { createApiClient } from './index';

describe('vsf-lexascms', () => {

  test('should create an api client', async () => {
    // Create API Client
    const apiClient = createApiClient({
      spaceId: 'space-id'
    });
    // Assert
    expect(apiClient).toMatchObject({
      client: undefined,
      settings: {
        spaceId: 'space-id'
      }
    });
  });

});
