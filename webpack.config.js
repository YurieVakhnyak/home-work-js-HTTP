const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    // main: path.resolve(__dirname, "./src/js/02-timer.js"),
    main: path.resolve(__dirname, "./src/js/03-promises.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      // template: path.resolve(__dirname, "./src/02-timer.html"), // template file
      template: path.resolve(__dirname, "./src/03-promises.html"), // template file
      filename: "index.html", // output file
    }),
  ],
  module: {
    rules: [
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
