"use strict"

module.exports = function (grunt) {
  grunt.config.merge({
	copy: {
		"dev_nodes": {
			src: ["dev_test/nodes.json"],
			dest: "build/nodes.json"
		},
		"dev_config": {
			src: ["dev_test/config.js"],
			dest: "build/js/config.js"
		}
	},
	connect: {
      server: {
        options: {
          base: "build/", //TODO: once grunt-contrib-connect 0.9 is released, set index file
          livereload: true
        }
      }
    },
    watch: {
      sources: {
        options: {
          livereload: true
        },
        files: ["{css,img}/*.png", "css/*.css", "lib/*.js", "templates/*.html"],
        tasks: ["default"]
      },
      config: {
        options: {
          reload: true
        },
        files: ["Gruntfile.js", "tasks/*.js"],
        tasks: []
      }
    }
  })

  grunt.loadNpmTasks("grunt-contrib-connect")
  grunt.loadNpmTasks("grunt-contrib-watch")
}
