import buble from "rollup-plugin-buble"; // convert ES2015 with buble
import flow from "rollup-plugin-flow-no-whitespace"; // remove flow types, without leaving whitespace
import commonjs from "rollup-plugin-commonjs";
import node from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

const LIBRARY_NAME = require("./package.json").name;
const path = require("path");
const resolve = _path => path.resolve(__dirname, "./", _path);
const version = process.env.VERSION || require("./package.json").version;
const banner =
  "/*!\n" +
  ` * ${LIBRARY_NAME}.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} JaxBBLL\n` +
  " * Released under the MIT License.\n" +
  " */";

const outputs = [
  {
    file: resolve(`dist/${LIBRARY_NAME}.js`),
    format: "umd",
    env: "development"
  },
  {
    file: resolve(`dist/${LIBRARY_NAME}.min.js`),
    format: "umd",
    env: "production"
  }
];

function buildRollupConfig(output) {
  let config = {
    input: resolve("src/script/index.js"),
    plugins: [
      flow(),
      node(),
      commonjs(),
      replace({
        __VERSION__: version
      }),
      buble(),
      babel({
        extensions: [".js"],
        runtimeHelpers: true,
        exclude: ["node_modules/**"]
      })
    ],
    output: {
      file: output.file,
      format: output.format,
      banner,
      name: LIBRARY_NAME
    }
  };

  if (output.env) {
    config.plugins.unshift(
      replace({
        "process.env.NODE_ENV": JSON.stringify(output.env)
      })
    );
    if (output.env.includes("prod")) {
      config.plugins.push(uglify());
    }
  }

  return config;
}

export default outputs.map(buildRollupConfig);
