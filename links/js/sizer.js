function resize(){
	"use strict";
	var linksWidth = window.getComputedStyle(document.getElementById("links"))['width'];
	document.getElementById("cal").width = linksWidth;
}

window.onload = function (){
	"use strict";
	resize();	
};