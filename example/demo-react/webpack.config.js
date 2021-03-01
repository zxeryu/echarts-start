const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "build.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    historyApiFallback: true,
    port: 3000,
  },
};
