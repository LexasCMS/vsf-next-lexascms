import {
  getConfig,
  setup
} from './index';

describe('vsf-lexascms', () => {

  test('setup should initialise config', async () => {
    // Assert that config is at default value
    expect(getConfig()).toEqual({ spaceId: null });
    // Setup module
    setup({ spaceId: 'space-id' });
    // Assert that config is as expected
    expect(getConfig()).toEqual({ spaceId: 'space-id' });
  });

});
