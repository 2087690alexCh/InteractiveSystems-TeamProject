$(document).ready(function(){
	mouseClicks = JSON.parse(localStorage.getItem("mouseClicks"));
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.width = screen.width;
	ctx.height = screen.height;

	
	for (var i=0;i<mouseClicks.length;i++){
		ctx.beginPath();
		ctx.arc(mouseClicks[i].x, mouseClicks[i].y,10,0,2*Math.PI);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.stroke();
	}
});