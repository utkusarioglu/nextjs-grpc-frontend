const path = require("path");

const appRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "../..");
const packagesRoot = path.resolve(workspaceRoot, "packages");

module.exports = {
  // resolver: {
  //   extraNodeModules: require("node-libs-react-native"),
  // },
  watchFolders: [
    appRoot,
    path.resolve(workspaceRoot, "node_modules"),
    packagesRoot,
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
