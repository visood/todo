var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './ui/entry.js',
  output: {
    path: __dirname + '/public/compiled',
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: /ui/,
        query: {
          presets: [
            //'babel-preset-stage-0',
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
}
