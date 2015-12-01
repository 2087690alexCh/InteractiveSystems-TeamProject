function getMaxTime(arr) {
	if (!arr.length) return null;

	var maxTime = arr[0].time;
	for (var i = 0; i < arr.length; ++i) {
		var time = arr[i].time;
		if (time > maxTime) maxTime = time;
	}

	return maxTime;
}

// Done with the awesome help of: http://bost.ocks.org/mike/bar/
function drawD3(data, selector) {
	var x = d3.scale.linear()
    	.domain([0, getMaxTime(data)])
    	.range([0, 420]);

	d3.select(selector)
  		.selectAll('div')
    		.data(data)
  		.enter().append('div')
    		.style('width', function(d) { return x(d.time) + 'px'; })
    		.text(function(d) { return '{ x: ' + d.x + ', y: ' + d.y + ' }'; });
}

function showchart(dddd, dddd2, selector){
    // ADAPTED FROM http://bl.ocks.org/bunkat/2595950
    var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 600 - margin.left - margin.right
      , height = 400 - margin.top - margin.bottom;
    
    var combo;
    if(dddd2 != null)
	 combo=dddd.concat(dddd2);
    else
	 combo=dddd;

    var x = d3.scale.linear()
              .domain([0, (d3.max(combo, function(d) { return d.id; }))])
              .range([ 0, width ]);
    
    var y = d3.scale.linear()
    	      .domain([0, (d3.max(combo, function(d) { return d.time; }))])
    	      .range([ height, 0 ]);

 
    var chart = d3.select(selector)
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

    var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')   
        
    // draw the x axis
    var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

    main.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height + 32)
    .text("ID");

    main.append("text")
    .attr("text-anchor", "end")
    .attr("x", -height/2)
    .attr("y", -48)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("time (ms)");

    main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

    // draw the y axis
    var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

    main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

    var g = main.append("svg:g"); 
    
    g.selectAll("scatter-dots")
      .data(dddd)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return x(d.id); } )
          .attr("cy", function (d) { return y(d.time); } )
          .attr("r", 8);

    g.selectAll("scatter-dots")
      .data(dddd2)
      .enter().append("svg:circle")
	  .attr('class', 'circlered')
          .attr("cx", function (d,i) { return x(d.id); } )
          .attr("cy", function (d) { return y(d.time); } )
          .attr("r", 8);
}

$(document).ready(function(){

	try {
		var correctClicks = JSON.parse(localStorage.getItem('correctClicks'));
	} catch (e) {
		var correctClicks = [];
	}

	try {
		var incorrectClicks = JSON.parse(localStorage.getItem('incorrectClicks'));
	} catch (e) {
		var incorrectClicks = [];
	}

	drawD3(correctClicks, '#correctClicks');
	try{
		drawD3(incorrectClicks, '#incorrectClicks');
	} catch (e) {
		// whatever
	}
	showchart(correctClicks, incorrectClicks, '#fitts');
    
    /*
    var x = d3.scale.linear()
    	.domain([0, d3.max(correctClicks)])
    	.range([0, 420]);

    d3.select('#correctClicks')
        .selectAll('div')
            .data(correctClicks)
    	.enter().append('div')
      		.style('width', function(d) { return x(d) + 'px'; })
      		.text(function(d) { return correctClicksTexts.shift() + ' (' + d + 's)'; });

  	var y = d3.scale.linear()
    	.domain([0, d3.max(incorrectClicks)])
    	.range([0, 420]);

  	d3.select('#incorrectClicks')
    	.selectAll('div')
      		.data(incorrectClicks)
    	.enter().append('div')
      		.style('width', function(d) { return y(d) + 'px'; })
      		.text(function(d) { return incorrectClicksTexts.shift() + ' (' + d + 's)'; });
     */

	mouseClicks = JSON.parse(localStorage.getItem("mouseClicks"));
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.width = screen.width;
	ctx.height = screen.height;
	
	
	ctx.beginPath();
	ctx.arc(mouseClicks[0].x, mouseClicks[0].y,10,0,2*Math.PI);
	ctx.fillStyle = '#44FF44';
	ctx.fill();
	ctx.stroke();
	
	for (var i=1;i<mouseClicks.length;i++){
		ctx.beginPath();
		ctx.arc(mouseClicks[i].x, mouseClicks[i].y,10,0,2*Math.PI);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		canvas_arrow(ctx,mouseClicks[i-1].x,mouseClicks[i-1].y,mouseClicks[i].x,mouseClicks[i].y);
		ctx.stroke();
//		ctx.beginPath();
//		ctx.moveTo(mouseClicks[i].x,mouseClicks[i].y);
//		ctx.lineTo(mouseClicks[i+1].x,mouseClicks[i+1].y);
//		ctx.stroke();
	}
});



function canvas_arrow(context, fromx, fromy, tox, toy){
    var headlen = 20;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
}