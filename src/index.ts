import { useContent } from './composables/useContent';
import { LexascmsSetupConfig, LexascmsRequestContext } from './types/lexascms';

let _config: LexascmsSetupConfig = {
  spaceId: null
};

let _requestContext: LexascmsRequestContext | null = null;

const getConfig = (): LexascmsSetupConfig => {
  return _config;
};

const getRequestContext = (): LexascmsRequestContext | null => {
  return _requestContext;
}

const setRequestContext = (requestContext: LexascmsRequestContext | null): void => {
  _requestContext = requestContext;
}

const setup = (config: LexascmsSetupConfig) => {
  _config = config;
};

export {
  getConfig,
  getRequestContext,
  setRequestContext,
  setup,
  useContent
};