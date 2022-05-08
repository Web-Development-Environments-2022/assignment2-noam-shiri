function addSettingsListeners(){
    document.getElementById("upSelect").addEventListener("keydown",function(event){
        up = event.keyCode;
        chooseKey(event,"upSelect");
    })
    document.getElementById("downSelect").addEventListener("keydown",function(event){
        down = event.keyCode;
        chooseKey(event,"downSelect");
    })
    document.getElementById("leftSelect").addEventListener("keydown",function(event){
        left = event.keyCode;
        chooseKey(event,"leftSelect");
    })
    document.getElementById("rightSelect").addEventListener("keydown",function(event){
        right = event.keyCode;
        chooseKey(event,"rightSelect");
    })
}

function chooseKey(event,id){
    let element = document.getElementById(id);
    let keyCode = event.keyCode;
    // make sure each key is presented well
    if(element.value != ""){
        element.value = "";
    }
    if (!((keyCode>=48 && keyCode<=90)|| (keyCode>=96 && keyCode<=111))) { //if there's no value to be shown for the key pressed
        element.value = event.key;
    }
}

function changeBallNum(val){
    document.getElementById('ballnumVal').innerHTML = val;
    food_requested = val;
}

function setGameTime(val){
    document.getElementById('gametimeVal').innerHTML = val + " seconds";
    maxGameTime = val;
}

function setMonsters(val){
    document.getElementById('monstersNumVal').innerHTML = val;
    monsters = val;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function setColors(color5,color15,color25){
    color5points = color5;
    color15points = color15;
    color25points = color25;
}

function randomSettings(){
    //arrows in keybord as default
    left = 37;
    document.getElementById("leftSelect").value = "ArrowLeft";
    up = 38;
    document.getElementById("upSelect").value = "ArrowUp";
    right = 39;
    document.getElementById("rightSelect").value = "ArrowRight";
    down = 40;
    document.getElementById("downSelect").value = "ArrowDown";
    //random values
    let rand = getRandomInt(50,90);
    document.getElementById("ballnumRange").value = rand;
    changeBallNum(rand);
    rand = getRandomInt(60,120)
    document.getElementById("gametime").value = rand;
    setGameTime(rand);
    rand = getRandomInt(1,4)
    document.getElementById("monstersNum").value = rand;
    setMonsters(rand);
    //default colors for food
    var rand1, rand2, rand3;
    while(rand1==rand2 || rand1==rand3 || rand2==rand3){
        rand1 = getRandomInt(1,5);
        rand2 = getRandomInt(1,5);
        rand3 = getRandomInt(1,5);
    }
    let points5 = document.getElementsByName("ballcolor5")[rand1];
    let points15 = document.getElementsByName("ballcolor15")[rand2];
    let points25 = document.getElementsByName("ballcolor25")[rand3];
    points5.checked = true;
    points15.checked = true;
    points25.checked = true;
    setColors(points5.value, points15.value, points25.value);
}

function saveSettings(){
    //check if all fields are filled
    var isValid = true;
    $("#settings").find('span,select').each(function(){$(this).hide();}); //hide all error messages
    let movementKeys = document.getElementsByClassName("movement");
    for (var i = 0; i < movementKeys.length; i++) {
        if(movementKeys[0].value==""){
            $("#errormovement").show();
            isValid = false;
            break;
        }
        $("#errormovement").hide();
    }
    var chosen5, chosen15, chosen25;
    let points5radio = document.getElementsByName("ballcolor5");
    let points15radio = document.getElementsByName("ballcolor15");
    let points25radio = document.getElementsByName("ballcolor25");
    for (var i = 0; i < points5radio.length; i++) {
        if(points5radio[i].checked){
            chosen5 = i;
        }
        if(points15radio[i].checked){
            chosen15 = i;
        }
        if(points25radio[i].checked){
            chosen25 = i;
        }
    }
    if (chosen5==chosen15 || chosen15==chosen25 || chosen5==chosen25){ //there's always something checked as default, so invalid only when at least 2 colors are the same
        $("#errorballcolors").show();
        isValid = false;
    }
    changeBallNum(document.getElementById("ballnumRange").value);
    setGameTime(document.getElementById("gametime").value);
    setMonsters(document.getElementById("monstersNum").value);
    if (isValid){
        setColors(points5radio[chosen5].value,points15radio[chosen15].value,points25radio[chosen25].value);
        showGame();
    }
}