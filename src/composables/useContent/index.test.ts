import CompositionApi from '@vue/composition-api';
import axios from 'axios';
import base64 from 'base-64';
import Vue from 'vue';

import { setup, useContent } from '../../index';

describe('useContent', () => {

  let axiosGetSpy: jest.SpyInstance;
  let base64EncodeSpy: jest.SpyInstance;

  beforeAll(() => {
    // Setup vsf-lexascms
    setup({ spaceId: 'space-id' });
    // Setup Vue
    Vue.use(CompositionApi);
  });

  beforeEach(() => {
    axiosGetSpy = jest.spyOn(axios, 'get');
    base64EncodeSpy = jest.spyOn(base64, 'encode');
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  test('search should include Authorization header if provided', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce(true);
    // Call setup with api key
    setup({
      apiKey: 'api-key',
      spaceId: 'space-id'
    });
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
        'Authorization': 'Bearer api-key',
        'Content-Type': 'application/vnd.api+json'
      }
    }));
    // Revert setup to exclude api key
    setup({ spaceId: 'space-id' });
  });

  test('search should encode request context and set x-lexascms-context header', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce(true);
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
    expect(base64EncodeSpy).toHaveBeenCalled();
    expect(axiosGetSpy).toHaveBeenCalledWith('/content-type', expect.objectContaining({
      baseURL: `https://space-id.spaces.lexascms.com/delivery/jsonapi`,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'x-lexascms-context': base64.encode(JSON.stringify({ audienceAttributes: { location: 'DE' } }))
      }
    }));
  });

  test('search should set x-lexascms-context header with pre-encoded value', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce(true);
    // Get search method
    const { search } = useContent('content-ref-id');
    // Call search method
    await search({
      type: 'collection',
      contentType: 'content-type',
      context: 'eyJhdWRpZW5jZUF0dHJpYnV0ZXMiOnsibG9jYXRpb24iOiJERSJ9fQ=='
    });
    // Assert
    expect(base64EncodeSpy).not.toHaveBeenCalled();
    expect(axiosGetSpy).toHaveBeenCalledWith('/content-type', expect.objectContaining({
      baseURL: `https://space-id.spaces.lexascms.com/delivery/jsonapi`,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'x-lexascms-context': 'eyJhdWRpZW5jZUF0dHJpYnV0ZXMiOnsibG9jYXRpb24iOiJERSJ9fQ=='
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
