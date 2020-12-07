import { useContentFactory } from '@vue-storefront/core';
import axios, { AxiosRequestConfig } from 'axios';
import base64 from 'base-64';
import Jsona from 'jsona';
import * as qs from 'qs';

import { LexascmsContent, LexascmsContextSearchParams } from '../../types/lexascms/index';
import { getConfig } from '../../index';
import { config } from 'vue/types/umd';

export const useContent = useContentFactory<LexascmsContent, LexascmsContextSearchParams>({
  
  async search (args: LexascmsContextSearchParams): Promise<LexascmsContent> {
    // Get space ID
    const { apiKey, spaceId } = getConfig();
    // Define request path
    let requestPath;
    if (args.type === 'item') {
      requestPath = `/${args.contentType}/${args.itemId}`;
    } else {
      requestPath = `/${args.contentType}`;
    }
    // Prepare request options
    const requestOptions: AxiosRequestConfig = {
      baseURL: `https://${spaceId}.spaces.lexascms.com/delivery/jsonapi`,
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      params: args.params,
      paramsSerializer: /* istanbul ignore next */ (params: any) => qs.stringify(params)
    };
    // Add LexasCMS auth header if required
    if (apiKey !== undefined) {
      requestOptions.headers['Authorization'] = `Bearer ${apiKey}`;
    }
    // Add LexasCMS Request Context if required
    if (args.context !== undefined) {
      // Get request context
      let requestContext = args.context;
      // Encode request context if required
      if (typeof requestContext !== 'string') {
        requestContext = base64.encode(JSON.stringify(args.context));
      }
      // Set request context header
      requestOptions.headers['x-lexascms-context'] = requestContext;
    }
    // Send request
    const response = await axios.get(requestPath, requestOptions);
    // Deserialize JSON:API response
    const dataFormatter = new Jsona();
    const data = dataFormatter.deserialize(response.data) as LexascmsContent;
    // Return
    return data;
  }

});
