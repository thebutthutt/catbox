const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /native_modules[/\\].+\.node$/,
        use: "node-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      react: path.join(__dirname, "./node_modules/react"),
      src: path.join(__dirname, "./src"),
    },
  },
  plugins: [
    // new CopyWebpackPlugin({
    //   patterns: [{ from: "src/assets/images", to: "images" }],
    // }),
  ],
};
