import path from 'path';

function resolveDependency(name) {
  return require.resolve(name, { paths: [ process.cwd() ] });
}

export default function VsfLexascmsModule(moduleOptions) {
  // Define module name
  const moduleName = 'vsf-lexascms';
  // Transpile module if not already doing so
  if (this.options.build.transpile.includes(moduleName) === false) {
    // Get package.json
    const packageJsonPath = resolveDependency(`${moduleName}/package.json`);
    const packageJson = require(packageJsonPath);
    // Add package alias
    this.extendBuild(config => {
      config.resolve.alias[`${packageJson.name}$`] = resolveDependency(`${moduleName}/${packageJson.module}`);
    });
    // Add vsf-lexascms to transpile property
    this.options.build.transpile.push(moduleName);
  }
  // Add plugin
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
};
