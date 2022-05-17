var context;
// var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

// dictionary of users and their passoword, initialize "k" user:
var users = [
	{
	username: "k",
	password: "k"
	}
];

var userLogged = false;

$(document).ready(function() {
	// hide all divs except from Welcome
	hideAllPages();
	$("#welcome").show();
	// $("#settings").show();
	//set listeners
	addSettingsListeners();
	// this is from the original code:
	context = canvas.getContext("2d");
});

function hideAllPages(){
	// this function hides all the pages
	$("#welcome").hide();
	// $("#register").hide();
	// $("#login").hide();
	$("#settings").hide();
	$("#about").hide();
	$("#gamepage").hide();
	$("#enter").hide();
}

// set hide and show functions for menu:
function showHome(){
	hideAllPages();
	document.getElementById("homeOption").disabled = true;
	if(userLogged == false)
		document.getElementById("gameOption").disabled = true;
	else
		document.getElementById("gameOption").disabled = false;
	$("#welcome").show();
}

function enterGame(){
	hideAllPages();
	document.getElementById("homeOption").disabled = false;
	if(userLogged == false)
		$("#enter").show();
	else // user logged in
		showSettings();
}

function showSettings(){
	hideAllPages();
	document.getElementById("homeOption").disabled = false;
	document.getElementById("gameOption").disabled = true;
	$("#settings").show();
}

function showAbout(){
	//hideAllPages();
	// $('#homeOption').show();
	$("#about").show();
	// Get the modal
	var modal = document.getElementById("about");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	// When the user clicks on ESC key, close modal
	$(document).keydown(function(event) { 
		if (event.keyCode == 27) { 
			modal.style.display = "none";
		}
	  });
}

function showGame(){
	hideAllPages();
	document.getElementById("homeOption").disabled = false;
	$("#gamepage").show();
	Start();
}