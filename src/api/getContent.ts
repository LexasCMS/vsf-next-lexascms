import { Logger } from '@vue-storefront/core';
import axios, { AxiosRequestConfig } from 'axios';
import base64 from 'base-64';
import Jsona from 'jsona';
import * as qs from 'qs';

import {
  LexascmsApiContext,
  LexascmsContent,
  LexascmsContextSearchParams
} from '../types/lexascms';

export const getContent = async (context: LexascmsApiContext, args: LexascmsContextSearchParams): Promise<LexascmsContent | null> => {
  // Get config
  const { apiKey, spaceId } = context.config;
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
  let data = null;
  try {
    // Send request
    const response = await axios.get(requestPath, requestOptions);
    // Deserialize JSON:API response
    const dataFormatter = new Jsona();
    data = dataFormatter.deserialize(response.data) as LexascmsContent;
  } catch (error) {
    Logger.error(
      'Failed to load content from LexasCMS',
      JSON.stringify(error.response.data, null, 2)
    );
  }
  // Return
  return data;
};
