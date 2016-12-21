const MARGIN = 30;
const HEIGHT = 600;
const WIDTH = 900;
const INNER_WIDTH = WIDTH - 2*MARGIN;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;

var _xScale,_yScale;

var createSvg = function(data){
	d3.select('svg').remove();
	d3.select('body')
		.append('svg')
		.attr('width',WIDTH)
		.attr('height',HEIGHT);	
	var sortAccordingToValue = data.sort(function(a,b){ return a.y - b.y});
	console.log("sortAccordingToValue",sortAccordingToValue)
	var lowestValue = sortAccordingToValue[0].y>0 ? 0:sortAccordingToValue[0].y;
	var heighestValue = sortAccordingToValue[data.length-1].y > 0 ? sortAccordingToValue[data.length-1].y : 0;
	console.log(lowestValue)
	console.log("Heighest Value", heighestValue)

	_xScale = d3.scaleLinear().domain([0,10]).range([0,INNER_WIDTH]);
	_yScale = d3.scaleLinear().domain([lowestValue, heighestValue]).range([INNER_HEIGHT,0]);

	var xAxis = d3.axisBottom(_xScale).ticks(10);
	console.log("height-->",HEIGHT);
	console.log("margin-->",MARGIN);
	console.log("yScale ",_yScale(0));
	console.log("height - margin-->",HEIGHT - MARGIN)
		
	d3.select('svg')
		.append('g')
		.attr('transform', 'translate('+MARGIN+', '+(_yScale(0)+MARGIN)+')')
		.call(xAxis);

	var yAxis =  d3.axisLeft(_yScale).ticks(10);
	d3.select('svg')
		.append('g')
		.attr('transform', 'translate('+MARGIN+','+MARGIN+')')
		.call(yAxis);
}

var drawLineGraph = function(data){
	var graph = d3.select('svg')
		.append('g')
		.classed('graph',true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');

	var sinPath = d3.line()
		.x(function(d){return _xScale(d.x)})
		.y(function(d){ return _yScale((d.y))})
		.curve(d3.curveBasis);
	graph.append('path').classed('sin',true).attr('d',sinPath(data));
}

var createCircle = function(selection,dataSet){
	selection
		.append('g')
		.selectAll('circle')
		.data(dataSet)
		.enter()
		.append('circle')
		.attr('cx',function(d){return _xScale(d.x)})
		.attr('cy',function(d){return _yScale(d.y)})
		.attr('r',2);
}

var drawScatterPlot = function(data){
	var circle = d3.select('svg')
		.append('g')
		.classed('hollow-circle',true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');

	createCircle(circle,data);
}

var show = function(data){
	createSvg(data);
	drawLineGraph(data);
	drawScatterPlot(data);
}