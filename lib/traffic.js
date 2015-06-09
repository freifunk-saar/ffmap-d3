require(["lib/Chart", "lib/jquery", "nodeOnlineCount"], function(Chart){
  "use strict"

	Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %> GiB"
	Chart.defaults.global.responsive = true

	function sortOnKeys(dict) {
		var sorted = []
		for(var key in dict) {
			sorted[sorted.length] = key
		}
		sorted.sort()

		var tempDict = {}
		for(var i = 0; i < sorted.length; i++)
			tempDict[sorted[i]] = dict[sorted[i]]

		return tempDict
	}

	$.getJSON( "https://saar.freifunk.net/map/traffic.json", function( data ) {

		//****************** Month ********************/
		var allMonthData = {}

		$.each( data, function( key, val ) {
			$.each(val.month, function(key, val){
				var dataKey = val.year + val.month
				if(typeof allMonthData[dataKey] === "undefined")
					allMonthData[dataKey] = {
						traffic: 0,
						title: val.month + " (" + val.year + ")"
					}
				allMonthData[dataKey].traffic =  parseInt(allMonthData[dataKey].traffic) + parseInt(val.rx) + parseInt(val.tx)
			})
		})

		var allMonthDataLabels = []
		var allMonthDataValues = []

		allMonthData = sortOnKeys(allMonthData)

		$.each(allMonthData, function( key, val ) {
			allMonthDataLabels.push(val.title)
			allMonthDataValues.push((val.traffic / 1024 / 1024).toFixed(3)) // traffik in KiB / 1024 -> MiB / 1024 -> GiB
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

		//****************** Day ********************/
		var allDayData = {}

		$.each( data, function( key, val ) {
			$.each(val.day, function(key, val){
				var dataKey = val.month + val.day
				if(typeof allDayData[dataKey] === "undefined")
					allDayData[dataKey] = {
						traffic: 0,
						title: val.day + "." + val.month
					}
				allDayData[dataKey].traffic =  parseInt(allDayData[dataKey].traffic) + parseInt(val.rx) + parseInt(val.tx)
			})
		})

		var allDayDataLabels = []
		var allDayDataValues = []

		allDayData = sortOnKeys(allDayData)

		$.each( allDayData, function( key, val ) {
			allDayDataLabels.push(val.title)
			allDayDataValues.push((val.traffic / 1024 / 1024).toFixed(3)) // traffik in KiB / 1024 -> MiB / 1024 -> GiB
		})

		var dayChartData = {
			labels: allDayDataLabels,
			datasets: [
				{
					label: "Tageswerte in (GiB)",
					fillColor: "rgba(151,187,205,0.5)",
					strokeColor: "rgba(151,187,205,0.8)",
					highlightFill: "rgba(151,187,205,0.75)",
					highlightStroke: "rgba(151,187,205,1)",
					data: allDayDataValues
				}
			]
		}

		var allGatewaysDayCtx = document.getElementById("allGatewaysDay").getContext("2d")
		var gatewayDayTrafficChart = new Chart(allGatewaysDayCtx)
		gatewayDayTrafficChart.Bar(dayChartData)
		Chart.noConflict()
	})
})
