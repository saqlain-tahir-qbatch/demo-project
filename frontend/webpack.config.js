const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path"); 

const port = process.env.PORT || 3000;
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname,"/src/index.js"),
  output: {
    filename: "[bundle].[hash].js",
    path: path.resolve(__dirname,"dist"),
    publicPath: "/",
    pathinfo: false,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: { localIdentName: "[name]__[local]___[hash:base64:5]" },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].ext"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    open: true,
  },
};
