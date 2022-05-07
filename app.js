var context;
var shape = new Object();
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
	$('#homeOption').hide();
	$("#gameOption").hide();
	//set listeners
	addSettingsListeners();
	// this is from the original code:
	context = canvas.getContext("2d");
});

function hideAllPages(){
	// this function hides all the pages
	$("#welcome").hide();
	$("#register").hide();
	$("#login").hide();
	$("#settings").hide();
	$("#about").hide();
	$("#game").hide();
}

// set hide and show functions for menu:
function showHome(){
	hideAllPages();
	$('#homeOption').hide();
	if(userLogged == false)
		$("#gameOption").hide();
	else
		$("#gameOption").show();
	$("#welcome").show();
}

function showRegister(){
	hideAllPages();
	$('#homeOption').show();
	$("#register").show();
	$("#register").find('span,select').each(function(){$(this).hide();}); //hide error messages on fields as default
}

function showLogin(){
	hideAllPages();
	$('#homeOption').show();
	$("#login").show();
}

function showSettings(){
	hideAllPages();
	$('#homeOption').show();
	$("#settings").show();
}

function showAbout(){
	//hideAllPages();
	$('#homeOption').show();
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
	$('#homeOption').show();
	$("#game").show();
	Start();
}