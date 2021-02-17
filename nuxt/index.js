import path from 'path';

export default function VsfLexascmsModule(moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
};
