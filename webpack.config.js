const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require("node-sass-glob-importer");
const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);
const pugData = require("./src/data/data");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  watch: true,
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  resolve: {
    extensions: [".js", ".scss"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      data: pugData,
      template: "./src/index.pug",
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              importer: globImporter(),
              functions: {
                "get($keys)": function(keys) {
                  keys = keys.getValue().split(".");
                  let result = pugData;
                  let i;
                  for (i = 0; i < keys.length; i++) {
                    result = result[keys[i]];
                  }
                  result = sassUtils.castToSass(result);
                  return result;
                }
              }
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      }
    ]
  }
};
