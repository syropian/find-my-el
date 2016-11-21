import { rollup } from "rollup"
import babel from "rollup-plugin-babel"
import uglify from "rollup-plugin-uglify"
import fs from "fs"

const env = process.env.BUILD_ENV
const dest = env === "cjs" ? "index.js" : "index.umd.js"
const plugins = [babel({
  exclude: "node_modules/**"
})]
const pkg = JSON.parse(fs.readFileSync("./package.json"))
const banner = `/*!
* ${pkg.name} - ${pkg.description}
* @version ${pkg.version}
*
* @copyright ${pkg.author.name} <${pkg.author.email}>
* @license ${pkg.license}
*/`

if (env === "umd") {
  plugins.push(uglify({
    output: {
      comments: function(node, comment) {
          var text = comment.value;
          var type = comment.type;
          if (type == "comment2") {
              // multiline comment
              return /@preserve|@license|@cc_on/i.test(text);
          }
      }
    }
  }))
}

export default {
  entry: "./src/index.js",
  plugins: plugins,
  dest,
  format: env,
  banner: banner,
  moduleName: "findMyEl"
}
