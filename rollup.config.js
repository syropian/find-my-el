import { rollup } from "rollup"
import babel from "rollup-plugin-babel"
import uglify from 'rollup-plugin-uglify';

const env = process.env.BUILD_ENV
const dest = env === "cjs" ? "index.js" : "index.umd.js"

const plugins = [babel({
  exclude: "node_modules/**"
})]
if (env === "umd") {
  plugins.push(uglify())
}

export default {
  entry: "./src/index.js",
  plugins: plugins,
  dest,
  format: env,
  moduleName: "findMyEl"
}
