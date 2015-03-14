(function () {
  "use strict"

  require.config({
    shim: {
      "jquery": ["lib/jquery"]
    }
  })

}())

define("nodeOnlineCount", [
  "lib/d3",
  "lib/jquery",
  "loader",
  "config"
], function (d3, $, loadNodes, ffmapConfig) {

	"use strict"

	function onlineNodes(nodesTarget, fn) {
		function updateNodes(data) {
			var onlineNodeCount = data.nodes.filter(function (d) { return !d.flags.gateway && d.flags.online})
			nodesTarget.text(onlineNodeCount.length)
		}

		var nodesStream = loadNodes(fn)

		nodesStream.take(1).onValue(updateNodes)
	}

	function allNodes(nodesTarget, fn) {
		function updateNodes(data) {
			var onlineNodeCount = data.nodes.filter(function (d) { return !d.flags.gateway})
			nodesTarget.text(onlineNodeCount.length)
		}

		var nodesStream = loadNodes(fn)

		nodesStream.take(1).onValue(updateNodes)
	}

	function gatewaysNodes(nodesTarget, fn) {
		function updateNodes(data) {
			var onlineNodeCount = data.nodes.filter(function (d) { return d.flags.gateway})
			nodesTarget.text(onlineNodeCount.length)
		}

		var nodesStream = loadNodes(fn)

		nodesStream.take(1).onValue(updateNodes)
	}

	onlineNodes(d3.select("#nodecount"), ffmapConfig.nodesJSON)
	allNodes(d3.select("#allnodecount"), ffmapConfig.nodesJSON)
	gatewaysNodes(d3.select("#gatewayscount"), ffmapConfig.nodesJSON)
})
