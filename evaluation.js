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
	drawD3(incorrectClicks, '#incorrectClicks');
    
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