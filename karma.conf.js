module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "test/support/*.js",
      "node_modules/jquery/dist/jquery.min.js",
      "index.umd.js",
      "test/index.js"
    ],
    browsers: ["PhantomJS_Desktop"],
    customLaunchers: {
      "PhantomJS_Desktop": {
        base: "PhantomJS",
          options: {
            viewportSize: {
              width: 2880,
              height: 1800
          }
        }
      }
    },
    reporters: ["spec"]
  });
}
