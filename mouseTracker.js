var mouseClicks = [];
var correctClicks = [];
var incorrectClicks = [];
var lastcoords = [0,0];

var lastClickDate = Date.now();

// old browsers don't support log2()
Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LOG2E;
};

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
			addClick(e, isCorrect);
		}
	});
	
});

function fittsid(e){
    var coords = [e.pageX, e.pageY];
    var dist = Math.sqrt((coords[0]-lastcoords[0])*(coords[0]-lastcoords[0])+(coords[1]-lastcoords[1])*(coords[1]-lastcoords[1]));
    var w = (parseInt($(e.target).css('width'),10));
    var h = (parseInt($(e.target).css('height'),10));
    var dimension = Math.sqrt(w*w+h*h);
    lastcoords = coords;
    return Math.log2(1+ dist/dimension);
}

function addClick(event, isCorrect) {
	var clickInterval = (Date.now() - lastClickDate) / 1000;
	lastClickDate = Date.now();

	var clicks = isCorrect
		? correctClicks
		: incorrectClicks;


	var click = {x: event.pageX, y: event.pageY, id:fittsid(event), time: clickInterval};
	//var click = clickInterval;

	clicks.push(click);
	localStorage.setItem(isCorrect ? 'correctClicks' : 'incorrectClicks', JSON.stringify(clicks));

	mouseClicks.push(click);
	localStorage.setItem('mouseClicks', JSON.stringify(mouseClicks));
}
