//login check validation:
function loginCheck(){
	var u = $('#loginUsername').val()
	var p = $('#loginPassword').val()
	var found = false;
	$("#loginform").find('span,select').each(function(){$(this).hide();}); //hide all error messages
	if(u==="") { //if one of the fields are empty
		$("#errorloginusername").show();
	}
	if (p===""){
		$("#errorloginpassword").show();
	}
	else{ //check in database
		for (i in users){
			if(users[i].username==u){
				if(users[i].password==p){
					found = true;
					loggedIn();//GO TOGAME
				}
				if (!found){
					alert("Wrong password. Please try again.");
					return;
				}
			}
		}
		if (!found){
			alert("Username not found. Please try again.");
		}
	}
	
}

//login check validation:
function loggedIn(){
	userLogged = true;
	showSettings();
}