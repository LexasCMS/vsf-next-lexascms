import { configureContext, useVSFContext } from '@vue-storefront/core';
import CompositionApi from '@vue/composition-api';
import Vue from 'vue';

import { useContent } from '../../index';

describe('useContent', () => {

  beforeAll(() => {
    // Setup Vue
    Vue.use(CompositionApi);
  });

  test('search should call $lexascms getContent api function', async () => {
    // Mock context
    const mockGetContent = jest.fn();
    configureContext({
      useVSFContext: () => ({
        $sharedRefsMap: new Map(),
        $vsf: {
          $lexascms: {
            api: {
              getContent: mockGetContent
            }
          }
        }
      })
    });
    // Get search method
    const { search } = useContent('content-ref-id');
    // Define search arguments
    const searchArgs = {
      type: 'item',
      contentType: 'content-type',
      itemId: 'item-id'
    } as any;
    // Call search method
    await search(searchArgs);
    // Assert
    expect(mockGetContent).toHaveBeenCalledWith(searchArgs);
  });

});
