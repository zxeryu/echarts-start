const path = require("path");
module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    filename: "build.js",
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
    port: 3000,
  },
};
