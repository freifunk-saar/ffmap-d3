"use strict"

module.exports = function (grunt) {
  grunt.config.merge({
    local: grunt.file.readJSON("config.json")
  })

  grunt.loadTasks("tasks")

  grunt.loadNpmTasks("grunt-newer")

  grunt.registerTask("default", ["checkDependencies", "eslint", "newer:copy", "newer:uglify"])
  grunt.registerTask("lint", ["eslint"])
  grunt.registerTask("dev", function() {
	grunt.task.run(["default"])
	grunt.log.writeln("copy test files to build")
	grunt.file.copy("dev_test/nodes.json", "build/nodes.json")
	grunt.file.copy("dev_test/config.js", "build/js/config.js")
	grunt.task.run(["connect:server", "watch"])
  })
}
