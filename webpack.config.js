const path = require("path");
const packageJSON = require("./package.json");

module.exports = [
  {
    entry: {
      index: "./src/index.ts",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "[name].es.mjs",
      path: path.resolve(__dirname, "build"),
    },
  },
  {
    entry: {
      index: "./src/index.ts",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
      library: {
        name: packageJSON.name,
        type: "commonjs",
      },
    },
  },
  {
    entry: {
      index: "./src/index.ts",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "[name].umd.js",
      path: path.resolve(__dirname, "build"),
      library: {
        name: packageJSON.name,
        type: "umd",
      },
    },
  },
];
