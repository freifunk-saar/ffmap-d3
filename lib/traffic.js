require(["lib/Chart", "lib/JQuery"], function(Chart){
  "use strict"

	$.getJSON( "https://saar.freifunk.net/map/traffic.json", function( data ) {
		var allMonthData = {}

		$.each( data, function( key, val ) {
			$.each(val.month, function(key, val){
				var dataKey = val.year+val.month
				if(typeof allMonthData[dataKey] == 'undefined'){
					allMonthData[dataKey] = {
						traffic: 0,
						title: val.month + " (" + val.year + ")"
					}
				}
				allMonthData[dataKey].traffic =  parseInt(allMonthData[dataKey].traffic) + parseInt(val.rx) + parseInt(val.tx)
			})
		})

		var allMonthDataLabels = []
		var allMonthDataValues = []

		$.each( allMonthData, function( key, val ) {
			console.log(key)
			console.log(val.title);
			console.log(val.traffic)
			allMonthDataLabels.push(val.title)
			allMonthDataValues.push(val.traffic / 1024 / 1024) // traffik in KiB / 1024 -> MiB / 1024 -> GiB
		})

		var monthChartData = {
			labels: allMonthDataLabels,
			datasets: [
				{
					label: "Monatswerte in (GiB)",
					fillColor: "rgba(151,187,205,0.5)",
					strokeColor: "rgba(151,187,205,0.8)",
					highlightFill: "rgba(151,187,205,0.75)",
					highlightStroke: "rgba(151,187,205,1)",
					data: allMonthDataValues
				}
			]
		}

		var allGatewaysMonthCtx = document.getElementById("allGatewaysMonth").getContext("2d")
		var gatewayMontTrafficChart = new Chart(allGatewaysMonthCtx)
		gatewayMontTrafficChart.Bar(monthChartData)

		// Chart.noConflict restores the Chart global variable to it's previous owner
		// The function returns what was previously Chart, allowing you to reassign.
		Chart.noConflict()
	});
})
