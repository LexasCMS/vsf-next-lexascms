import CompositionApi from '@vue/composition-api';
import axios from 'axios';
import base64 from 'base-64';
import Vue from 'vue';

import { setRequestContext, setup, useContent } from '../../index';

describe('useContent', () => {

  const axiosGetSpy = jest.spyOn(axios, 'get');

  beforeAll(() => {
    // Setup vsf-lexascms
    setup({ spaceId: 'space-id' });
    // Setup Vue
    Vue.use(CompositionApi);
  });

  afterEach(() => {
    // Reset global request context
    setRequestContext(null);
  });

  test('search should request a single item', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce(true);
    // Get search method
    const { search } = useContent('content-ref-id');
    // Call search method
    await search({
      type: 'item',
      contentType: 'content-type',
      itemId: 'item-id'
    });
    // Assert
    expect(axiosGetSpy).toHaveBeenCalledWith('/content-type/item-id', expect.anything());
  });

  test('search should request a collection', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce(true);
    // Get search method
    const { search } = useContent('content-ref-id');
    // Call search method
    await search({
      type: 'collection',
      contentType: 'content-type'
    });
    // Assert
    expect(axiosGetSpy).toHaveBeenCalledWith('/content-type', expect.anything());
  });

  test('search should include params', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce(true);
    // Get search method
    const { search } = useContent('content-ref-id');
    // Call search method
    await search({
      type: 'collection',
      contentType: 'content-type',
      params: {
        localeCode: 'de-DE'
      }
    });
    // Assert
    expect(axiosGetSpy).toHaveBeenCalledWith('/content-type', expect.objectContaining({
      baseURL: `https://space-id.spaces.lexascms.com/delivery/jsonapi`,
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      params: {
        localeCode: 'de-DE'
      }
    }));
  });

  test('search should use global request context', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce(true);
    // Define global request context
    const globalRequestContext = {
      audienceAttributes: { location: 'GB' }
    };
    // Set global request context
    setRequestContext(globalRequestContext);
    // Get search method
    const { search } = useContent('content-ref-id');
    // Call search method
    await search({
      type: 'collection',
      contentType: 'content-type'
    });
    // Assert
    expect(axiosGetSpy).toHaveBeenCalledWith('/content-type', expect.objectContaining({
      baseURL: `https://space-id.spaces.lexascms.com/delivery/jsonapi`,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'x-lexascms-context': base64.encode(JSON.stringify(globalRequestContext))
      }
    }));
  });

  test('search should prefer provided context over global request context', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce(true);
    // Set global request context
    setRequestContext({
      audienceAttributes: { location: 'GB' }
    });
    // Get search method
    const { search } = useContent('content-ref-id');
    // Call search method
    await search({
      type: 'collection',
      contentType: 'content-type',
      context: {
        audienceAttributes: { location: 'DE' }
      }
    });
    // Assert
    expect(axiosGetSpy).toHaveBeenCalledWith('/content-type', expect.objectContaining({
      baseURL: `https://space-id.spaces.lexascms.com/delivery/jsonapi`,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'x-lexascms-context': base64.encode(JSON.stringify({ audienceAttributes: { location: 'DE' } }))
      }
    }));
  });

  test('search should return deserialised JSON:API response', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce({
      data: {
        data: [{
          id: '1234',
          type: 'content-type',
          attributes: {
            foo: 'bar'
          }
        }]
      }
    });
    // Get search method
    const { content, search } = useContent('content-ref-id');
    // Call search method
    await search({
      type: 'collection',
      contentType: 'content-type'
    });
    // Assert
    expect(content).toEqual({
      value: [{
        type: 'content-type',
        id: '1234',
        foo: 'bar'
      }]
    });
  });

});
