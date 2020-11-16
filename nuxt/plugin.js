import { setup } from 'vsf-lexascms';

export default function init() {
  // Get module options
  const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');
  // Setup LexasCMS module
  setup(moduleOptions);
}