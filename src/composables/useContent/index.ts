import { useContentFactory } from '@vue-storefront/core';
import axios, { AxiosRequestConfig } from 'axios';
import base64 from 'base-64';
import Jsona from 'jsona';
import * as qs from 'qs';

import { LexascmsContent, LexascmsContextSearchParams } from '../../types/lexascms/index';
import { getConfig, getRequestContext } from '../../index';

export const useContent = useContentFactory<LexascmsContent, LexascmsContextSearchParams>({
  
  async search (args: LexascmsContextSearchParams): Promise<LexascmsContent> {
    // Get space ID
    const { spaceId } = getConfig();
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
    // Get request context
    const requestContext = args.context !== undefined ? args.context : getRequestContext();
    // Add LexasCMS Request Context if required
    if (requestContext !== null) {
      requestOptions.headers['x-lexascms-context'] = base64.encode(
        JSON.stringify(requestContext)
      );
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
