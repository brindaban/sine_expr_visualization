// var parser = require("../parser.js");

const MARGIN = 30;
const HEIGHT = 730;
const WIDTH = 1000;
const INNER_WIDTH = WIDTH - 2*MARGIN;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;

var _xScale,_yScale;

var createSvg = function(data){
	d3.select('body')
		.append('svg')
		.attr('width',WIDTH)
		.attr('height',HEIGHT);
	var sortAccordingToValue = data.sort(function(a,b){ return a.y - b.y});

	_xScale = d3.scaleLinear().domain([0,10]).range([0,INNER_WIDTH]);
	_yScale = d3.scaleLinear().domain([sortAccordingToValue[0].y, sortAccordingToValue[data.length-1].y]).range([INNER_HEIGHT,0]);

	var xAxis = d3.axisBottom(_xScale).ticks(10);
	d3.select('svg')
		.append('g')
		.attr('transform', 'translate('+MARGIN+', '+(HEIGHT - MARGIN)+')')
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
		.x(function(d){ return _xScale(d.x)})
		.y(function(d){ return _yScale((d.y))});
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
		.attr('r',5);
}

var drawScatterPlot = function(data){
	var circle = d3.select('svg')
		.append('g')
		.classed('hollow-circle',true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');

	createCircle(circle,data);
}

var show = function(){
	var box = d3.select('#expression-box').node().value;
	// data = parser(box);
	// console.log(box=="");
	var data = [{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:3},{x:4,y:4},{x:5,y:5},{x:6,y:6},{x:7,y:7},{x:8,y:8},{x:9,y:9}]
	createSvg(data);
	drawLineGraph(data);
	drawScatterPlot(data);
}

window.onload = show; 
