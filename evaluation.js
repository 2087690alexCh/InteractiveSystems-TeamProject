$(document).ready(function(){
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