//webpack : convert jsx file into js
module.exports = {
  mode: "development",
  entry: {
    client: "./client/client.jsx",
    //entry point for webpack
  },
  output: {
    filename: "[name].js",
    //every file named as .js
  },
  resolve: {
    extensions: [".js", ".jsx"],
    //we write import index it will search for both .js and .jsx
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, //this file rules apply to
        exclude: /(node_modules)/, //stop for compiling node_module
        use: {
          //for plug-in to use
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
