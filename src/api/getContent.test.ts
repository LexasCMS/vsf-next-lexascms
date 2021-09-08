import { Logger } from '@vue-storefront/core';
import axios from 'axios';
import base64 from 'base-64';

import { getContent } from './';

describe('useContent', () => {

  let axiosGetSpy: jest.SpyInstance;
  let base64EncodeSpy: jest.SpyInstance;

  const context = {
    config: { spaceId: 'space-id' }
  };
  const contextWithApiKey = {
    config: { spaceId: 'space-id', apiKey: 'api-key' }
  };

  beforeEach(() => {
    axiosGetSpy = jest.spyOn(axios, 'get');
    base64EncodeSpy = jest.spyOn(base64, 'encode');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('search should request a single item', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce({ data: {} });
    // Call function
    await getContent(context, {
      type: 'item',
      contentType: 'content-type',
      itemId: 'item-id'
    });
    // Assert
    expect(axiosGetSpy).toHaveBeenCalledWith('/content-type/item-id', expect.anything());
  });

  test('search should request a collection', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce({ data: {} });
    // Call function
    await getContent(context, {
      type: 'collection',
      contentType: 'content-type'
    });
    // Assert
    expect(axiosGetSpy).toHaveBeenCalledWith('/content-type', expect.anything());
  });

  test('search should include params', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce({ data: {} });
    // Call function
    await getContent(context, {
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
    axiosGetSpy.mockResolvedValueOnce({ data: {} });
    // Call function
    await getContent(contextWithApiKey, {
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
  });

  test('search should encode request context and set x-lexascms-context header', async () => {
    // Mock Axios call
    axiosGetSpy.mockResolvedValueOnce({ data: {} });
    // Call function
    await getContent(context, {
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
    axiosGetSpy.mockResolvedValueOnce({ data: {} });
    // Call function
    await getContent(context, {
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

  test('search should log error if request fails', async () => {
    // Mock Axios call
    axiosGetSpy.mockRejectedValueOnce({
      response: {
        data: 'test error'
      }
    });
    // Mock Logger call
    const errorLogSpy = jest.spyOn(Logger, 'error').mockImplementationOnce(() => true);
    // Call function
    const content = await getContent(context, {
      type: 'collection',
      contentType: 'content-type'
    });
    // Assert
    expect(errorLogSpy).toHaveBeenCalledWith('Failed to load content from LexasCMS', '"test error"');
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
    // Call function
    const content = await getContent(context, {
      type: 'collection',
      contentType: 'content-type'
    });
    // Assert
    expect(content).toEqual([{
      type: 'content-type',
      id: '1234',
      foo: 'bar'
    }]);
  });

});
