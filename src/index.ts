import { RenderContent } from './components/RenderContent';
import { useContent } from './composables/useContent';
import { LexascmsSetupConfig } from './types/lexascms';

let _config: LexascmsSetupConfig = {
  spaceId: null
};

const getConfig = (): LexascmsSetupConfig => {
  return _config;
};

const setup = (config: LexascmsSetupConfig) => {
  _config = config;
};

export {
  getConfig,
  RenderContent,
  setup,
  useContent
};