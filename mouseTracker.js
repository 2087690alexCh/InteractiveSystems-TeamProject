var mouseClicks = [];
sessionStorage.mouseClicks=[];

$(document).ready(function(){
	
	
	$("#main").click(function(e) {
		if(e.button==0){
			mouseClicks.push({x:e.pageX, y:e.pageY});
			localStorage.setItem("mouseClicks", JSON.stringify(mouseClicks));
			
		}
	});
	
});