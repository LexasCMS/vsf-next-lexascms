import {
  getConfig,
  getRequestContext,
  setRequestContext,
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

  test('setRequestContext should update global request context', async () => {
    // Assert that request context is at default value
    expect(getRequestContext()).toEqual(null);
    // Setup module
    setRequestContext({
      audienceAttributes: { location: 'GB' }
    });
    // Assert that request context is as expected
    expect(getRequestContext()).toEqual({
      audienceAttributes: { location: 'GB' }
    });
  });

});
