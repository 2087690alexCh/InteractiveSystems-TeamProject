var mouseClicks = [];
var correctClicks = [];
var incorrectClicks = [];

var lastClickDate = Date.now();

$(document).ready(function(){
		
	$("#main").click(function(e) {
		var $target = $(e.target);
		var id = $target.attr('id');
		var isCorrect = false;

		if (id === 'previous' || id === 'next' || id === 'find' || id === 'terms_value') {
			isCorrect = true;
		}

		if (wasAMarkerJustClicked) {
			wasAMarkerJustClicked = false;
			isCorrect = true;
		}

		if(e.button==0){
			addClick(e.pageX, e.pageY, isCorrect);
		}
	});
	
});

function addClick(pageX, pageY, isCorrect) {
	var clickInterval = (Date.now() - lastClickDate) / 1000;
	lastClickDate = Date.now();

	var clicks = isCorrect
		? correctClicks
		: incorrectClicks;

	var click = {x: pageX, y: pageY, time: clickInterval};
	//var click = clickInterval;

	clicks.push(click);
	localStorage.setItem(isCorrect ? 'correctClicks' : 'incorrectClicks', JSON.stringify(clicks));

	mouseClicks.push(click);
	localStorage.setItem('mouseClicks', JSON.stringify(mouseClicks));
}
