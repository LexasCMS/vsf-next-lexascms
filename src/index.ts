import { apiClientFactory, integrationPluginFactory } from '@vue-storefront/core';

import { getContent } from './api';
import { RenderContent } from './components/RenderContent';
import { useContent } from './composables/useContent';
import { LexascmsSetupConfig } from './types/lexascms';

// Define setup method
const setup = (config: LexascmsSetupConfig) => {
  return {
    config: { ...config }
  }
}

// Create API Client
const { createApiClient } = apiClientFactory({
  tag: 'lexascms',
  onSetup: setup as any,
  api: {
    getContent,
  },
});

// Create integration plugin
const integrationPlugin = integrationPluginFactory(createApiClient);

export {
  createApiClient,
  integrationPlugin,
  RenderContent,
  useContent
};
