import { integrationPlugin } from 'vsf-lexascms';

export default integrationPlugin(({ integration }) => {
  // Get module options
  const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');
  // Setup LexasCMS module
  integration.configure({ ...moduleOptions });
});
