const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    main: "./resevation/src/mainpage.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
};
