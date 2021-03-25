import { apiClientFactory } from '@vue-storefront/core';

import { getContent } from './api';
import { LexascmsSetupConfig, LexascmsApiContext } from './types/lexascms';

// Define setup method
const setup = (config: LexascmsSetupConfig): LexascmsApiContext => {
  return {
    config: { ...config }
  }
}

// Create API Client
const { createApiClient } = apiClientFactory({
  onCreate: setup as any,

  api: {
    getContent,
  }
});

export { createApiClient };