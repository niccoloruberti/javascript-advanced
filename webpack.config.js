const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/js/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Applicazione webpack",
      template: "./src/index.html",
    }),
    new Dotenv(),
  ],
  devServer: {
    port: 8080,
    open: true,
    static: path.resolve(__dirname, "dist"),
  },
  mode: "development",
};
