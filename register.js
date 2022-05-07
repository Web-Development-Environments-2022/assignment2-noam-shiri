//register check inputs validation:
function registerCheck(){
	//console.log("TEST AGAIN");
	$("#register").find('span,select').each(function(){$(this).hide();});
	var isValid = true;
	$("#registerForm").find('input,select').each(function(){ // check if all inputs contain data
		if($(this).val() ===""){
			isValid = false;
			$("#errormissing").show();
		}
	})
	if(checkPassword($('#regPassword').val()) == false)  {  
		isValid = false;
		$("#errorpassword").show();
	}
	if(checkFullName($('#regFullName').val()) == false){
		isValid = false;
		$("#errorname").show();
	}
	if(checkEmail($('#regEmail').val()) == false){
		isValid = false;
		$("#erroremail").show();
	}
	if(isValid){ 
		users.push({
			username: $('#regUsername').val(),
			password: $('#regPassword').val()
			});
		alert("successful");
        $("#registerForm").find('input,select').each(function(){ $(this).val("")});
        showHome();

	}
}

function checkPassword(password){
	var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
	if(passwordPattern.test(password))
		return true;
	return false;
	}

function checkFullName(fullName){
	var usernamePattern = /^[A-Za-z ]{1,20}$/;
	if(usernamePattern.test(fullName))
		return true;
	return false;
	}

function checkEmail(email){
	var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	if(emailPattern.test(email))
		return true;
	return false;
}