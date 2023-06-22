// Your bundler file
const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild.build({
  entryPoints: ['compiled/index.js'],
  bundle: true,
  platform: 'node',
  minify: true,
  minifyWhitespace: true,
  minifySyntax: true,
  minifyIdentifiers: true,
  outfile: 'build/index.js',
  plugins: [nodeExternalsPlugin()],
});