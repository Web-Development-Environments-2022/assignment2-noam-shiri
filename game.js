var left;
var up;
var right;
var down;
var maxGameTime;
var monsters;
var color5points;
var color15points;
var color25points;
var colors = {"Yellow": "#FFFD98" , "Green": "#D0F3B8" , "Blue": "#B8D7F3" , "Pink": "#F3B8F1" , "Purple": "#D6B8F3"}
var addons; //for each addon: [name, x, y, isOnBoard, boardnumber]
var addonsCount;
var totalLoss;
var isLoss;
var starInfo;

function Start() {
	score = 0;
	totalLoss = 0;
	isLoss = false;
	characters = {	'pink': {direction: 'pinkUp', x:1, y:1, isOnBoard:true, prevInCell:0 },
					'blue': {direction: 'blueUp', x:1, y:28, isOnBoard:false, prevInCell:0 },
					'orange': {direction: 'orangeUp', x:13, y:1, isOnBoard:false, prevInCell:0 },
					'red': {direction: 'redUp', x:13, y:28, isOnBoard:false, prevInCell:0 } ,
					'marioStar': {direction: 'marioStarUp', x:8, y:15, isOnBoard:false, prevInCell:0 } ,
					'pacman': {direction: 'pacmanRight', x:0,y:0}
					}
	addons = {0:["candy",0,0,false,11,0],1:["marioStar",8,15,false,13],2:["clock",0,0,false,10],3:["medicine",0,0,false,12]};
	addonsCount = 1;
	var ball5 = Math.floor(food_requested*0.6);
	var ball15 = Math.floor(food_requested*0.3);
	var ball25 = Math.floor(food_requested*0.1);
	ball5+=food_requested - (ball5+ball15+ball25)
	start_time = new Date();
	board=[[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
		[4,0,0,0,0,0,0,4,0,0,0,4,4,4,4,4,4,0,0,0,4,0,0,0,0,0,0,0,0,4],
		[4,0,4,4,0,4,0,4,0,4,0,0,0,4,0,0,0,0,4,0,0,0,4,4,4,0,4,4,0,4],
		[4,0,4,4,0,4,0,0,0,4,0,4,0,0,0,4,0,4,4,0,4,0,0,0,4,0,4,4,0,4],
		[4,0,0,0,0,4,0,4,0,0,0,4,0,4,4,4,0,0,4,0,0,0,4,0,4,0,0,0,0,4],
		[4,0,4,4,4,4,0,4,0,4,0,4,0,0,0,4,4,0,4,0,4,0,4,0,4,4,4,4,0,4],
		[4,0,0,0,0,4,0,4,0,4,0,0,0,4,0,0,0,0,0,0,4,0,4,0,4,0,0,0,0,4],
		[4,0,4,4,0,4,0,0,0,4,4,4,0,4,4,4,4,0,4,4,4,0,0,0,4,0,4,4,0,4],
		[4,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,4],
		[4,0,4,4,0,0,0,0,0,4,4,0,4,4,4,4,4,4,4,0,4,0,0,0,0,0,4,4,0,4],
		[4,0,0,0,0,4,4,4,4,4,0,0,0,4,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,4],
		[4,0,4,4,0,0,0,0,0,0,0,4,0,0,0,4,0,4,4,0,0,0,0,0,0,0,4,4,0,4],
		[4,0,4,4,0,4,0,4,4,4,4,4,4,0,4,4,0,4,4,4,4,4,4,0,4,0,4,4,0,4],
		[4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,4],
		[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]];
	var emptyCell;
	setCharactersOnBoard();
	while (ball5 > 0) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		ball5--;
	}	
	while (ball15 > 0) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 2;
		ball15--;
	}	
	while (ball25 > 0) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 3;
		ball25--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 140); //140
	interval2 = setInterval(checkAddons, Math.floor(maxGameTime/10)*1000);
	interval3 = setInterval(candyOnOff, 5000); //every 5 seconds
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 14 + 1);
	var j = Math.floor(Math.random() * 29 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 14 + 1);
		j = Math.floor(Math.random() * 29 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up]) {
		return 1;
	}
	if (keysDown[down]) {
		return 2;
	}
	if (keysDown[left]) {
		return 3;
	}
	if (keysDown[right]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;

	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 30; j++) {
		  var center = new Object();
		  center.y = i * 30 + 15;
		  center.x = j * 30 + 15;
		  var img = new Image();
		  if (board[i][j] == 5) {
			var img = new Image();
			img.src = './pictures/'+characters['pacman'].direction+'.png';
			context.drawImage(img, center.x-15, center.y-15,30, 30);
			context.draw;
		} else if (board[i][j] == 1) {
			context.beginPath();
			context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
			context.fillStyle = colors[color5points]; //color food 5
			context.fill();
		} else if (board[i][j] == 2) {
			context.beginPath();
			context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
			context.fillStyle = colors[color15points]; //color food 15
			context.fill();
		} else if (board[i][j] == 3) {
			context.beginPath();
			context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
			context.fillStyle = colors[color25points]; //color food 25
			context.fill();
		} else if (board[i][j] == 4) {
			context.beginPath();
			context.rect(center.x - 15, center.y - 15, 30, 30);
			context.fillStyle = "#3E3247"; //color wall
			context.fill();
		}
		else if (board[i][j] == 6){
			img.src = './pictures/'+characters['pink'].direction+'.png';
			context.drawImage(img, center.x-15, center.y-15,30, 30);
			img.draw;
		}
		else if (board[i][j] == 7){
			img.src = './pictures/'+characters['blue'].direction+'.png';
			context.drawImage(img, center.x-15, center.y-15,30, 30);
			context.draw;
		}
		else if (board[i][j] == 8){
			img.src = './pictures/'+characters['orange'].direction+'.png';
			context.drawImage(img, center.x-15, center.y-15,30, 30);
			context.draw;
		}
		else if (board[i][j] == 9){
			img.src = './pictures/'+characters['red'].direction+'.png';
			context.drawImage(img, center.x-15, center.y-15,30, 30);
			context.draw;
		}
		else if (board[i][j] == 10){
			img.src = './pictures/clock.png';
			context.drawImage(img, center.x-15, center.y-15,30, 30);
			context.draw;
		}
		else if (board[i][j] == 11){
			img.src = './pictures/candy.png';
			context.drawImage(img, center.x-15, center.y-15,30, 30);
			context.draw;
		}
		else if (board[i][j] == 12){
			img.src = './pictures/medicine.png';
			context.drawImage(img, center.x-15, center.y-15,30, 30);
			context.draw;
		}
		else if (board[i][j] == 13){
			img.src = './pictures/'+characters['marioStar'].direction+'.png';
			context.drawImage(img, center.x-15, center.y-15,30, 30);
			context.draw;
		}
		// else if (board[i][j] == 14){
		// 	var boom = new Image();
		// 	boom.src = './pictures/boom.png';
		// 	context.drawImage(boom, center.x-15, center.y-15,30, 30);
		// 	context.draw;
		// }
		}
	  }
	}

function UpdatePosition() {
	board[characters['pacman'].x][characters['pacman'].y] = 0;
	var x = GetKeyPressed();
	var wasHereBefore = 0;
	if (x == 1) { //up
		if (characters['pacman'].x > 0 && board[characters['pacman'].x - 1][characters['pacman'].y] != 4) {
			characters['pacman'].x--;
			characters['pacman'].direction='pacmanUp'
		}
	}
	if (x == 2) { //down
		if (characters['pacman'].x < 14 && board[characters['pacman'].x + 1][characters['pacman'].y] != 4) {
			characters['pacman'].x++;
			characters['pacman'].direction='pacmanDown'
		}
	}
	if (x == 3) { //left
		if (characters['pacman'].y > 0 && board[characters['pacman'].x][characters['pacman'].y - 1] != 4) {
			characters['pacman'].y--;
			characters['pacman'].direction='pacmanLeft'
		}
	}
	if (x == 4) { //right
		if (characters['pacman'].y < 29 && board[characters['pacman'].x][characters['pacman'].y + 1] != 4) {
			characters['pacman'].y++;
			characters['pacman'].direction='pacmanRight'
		}
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 1) { 
		score+=5;
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 2) { 
		score+=15;
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 3) { 
		score+=25;
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 10) { // clock
		maxGameTime+=20;
	}

	if (board[characters['pacman'].x][characters['pacman'].y] == 11) { // candy
		//score+=30; //plus heart
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 12) { // medicine
		//score+=50;
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 13) {  // star 
		score+=50;
	}
	wasHereBefore = board[characters['pacman'].x][characters['pacman'].y]
	if(wasHereBefore >= 6 && wasHereBefore <= 9){ //monster
		isLoss = true;
	}
	if (!isLoss){
		board[characters['pacman'].x][characters['pacman'].y] = 5;
		UpdateMonsterPosition();
	}
	checkLoss();
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	var score2win = Math.floor(food_requested*0.6*5)
	if (score >= 500) { //TODO : change to correct score
		window.clearInterval(interval);
		window.clearInterval(interval2);
		window.alert("Game completed");
		document.getElementById("gameOption").disabled = false;
	}
	if(maxGameTime <= time_elapsed || totalLoss>=5){
		window.clearInterval(interval);
		window.clearInterval(interval2);
		window.alert("You lost!");
		document.getElementById("gameOption").disabled = false;
	}
	else {
		Draw();
	}
}	

function checkAddons(){ //for each addon: [name, x, y, isOnBoard, boardnumber]
	if(addons[addonsCount][3]==false){
		addCharacter(addonsCount);
	}
	else{
		removeCharacter(addonsCount);
	}
	addonsCount++;
	if (addonsCount>=(Object.entries(addons).length))
		addonsCount=1;
}

function candyOnOff(){
	if(addons[0][3]==false){
		num = getRandomInt(1,6);
		addCharacter(0);
		addons[0][5]=num;
	}
	else{
		removeCharacter(0);
	}
}

function addCharacter(addonsCount){ //for each addon: [name, x, y, isOnBoard, boardnumber]
	addons[addonsCount][3]=true;
	if (addonsCount==1){
		characters['marioStar'].prevInCell = board[addons[1][1]][addons[1][2]];
		board[addons[1][1]][addons[1][2]] = 13; //star number
		characters['marioStar']isOnBoard = true;
	}
	else{
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = addons[addonsCount][4];
		addons[addonsCount][1]=emptyCell[0];
		addons[addonsCount][2]=emptyCell[1];
	}
}

function removeCharacter(addonsCount){ //for each addon: [name, x, y, isOnBoard, boardnumber]
	if (addonsCount!=1){
		addons[addonsCount][3]=false;
		board[addons[addonsCount][1]][addons[addonsCount][2]]=0;
	}
}
function setCharactersOnBoard(){
	//pacman
	var emptyCell = findRandomEmptyCell(board);
	characters['pacman'].x = emptyCell[0];
	characters['pacman'].y = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 5;
	//monsters
	board [characters['pink'].x][characters['pink'].y] = characters['pink'].prevInCell;
	characters['pink'].x = 1;
	characters['pink'].y = 1;
	characters['pink'].prevInCell = board[1][1];
	board[1][1] = 6; //pink monster
	if (monsters >= 2){
		board [characters['blue'].x][characters['blue'].y] = characters['blue'].prevInCell;
		characters['blue'].x = 1;
		characters['blue'].y = board[0].length-2;
		characters['blue'].prevInCell = board[1][board[0].length-2] ;
		board[1][board[0].length-2] = 7; //blue monster
		characters['blue'].isOnBoard = true;
	}
	if (monsters >= 3){
		board [characters['orange'].x][characters['orange'].y] = characters['orange'].prevInCell;
		characters['orange'].x = board.length-2;
		characters['orange'].y = 1;
		characters['orange'].prevInCell = board[board.length-2][1];
		board[board.length-2][1] = 8; //orange monster
		characters['orange'].isOnBoard = true;
		}
	if (monsters == 4){
		board [characters['red'].x][characters['red'].y] = characters['red'].prevInCell;
		characters['red'].x = board.length-2;
		characters['red'].y = board[0].length-2;
		characters['red'].prevInCell = board[board.length-2][board[0].length-2] ;
		board[board.length-2][board[0].length-2] = 9; //red monster
		characters['red'].isOnBoard = true;
		}
}

function UpdateMonsterPosition(){
	var currMonster = 6;
	for ([monsterColor, monsterDetails] of Object.entries(characters)) {
		var isStar = false;
		if (!monsterDetails.isOnBoard) //if monster is not on board
			continue;
		var i = monsterDetails.x;
		var j=monsterDetails.y;
		if (monsterColor=='marioStar'){
			isStar = true;
			x = getRandomInt(1,5);
		}
		else{
			x = getBestDirection(i,j); // TODO : change to smart x
		}
		if (x == 1) { //up
			if (i > 0 && board[i - 1][j] != 4 && (board[i - 1][j]<=5 || board[i - 1][j] >= 10)) {
				board[i][j] = monsterDetails.prevInCell;
				characters[monsterColor].prevInCell = board[i-1][j];
				characters[monsterColor].x--;
				characters[monsterColor].direction=monsterColor+'Up'
				}
			}
		if (x == 2) { //down
			if (i < 14 && board[i + 1][j] != 4 && (board[i + 1][j]<=5 || board[i + 1][j] >= 10)) {
				board[i][j] = monsterDetails.prevInCell;
				characters[monsterColor].prevInCell = board[i+1][j];
				characters[monsterColor].x++;
				characters[monsterColor].direction=monsterColor+'Down'
				}
				
			}
		if (x == 3) { //left
			if (j > 0 && board[i][j - 1] != 4 && (board[i][j - 1]<=5 || board[i][j - 1] >= 10)) {
				board[i][j] = monsterDetails.prevInCell;
				characters[monsterColor].prevInCell = board[i][j-1];
				characters[monsterColor].y--;
				characters[monsterColor].direction=monsterColor+'Left'
				}

			}
		if (x == 4) { //right
			if (j < 29 && board[i][j + 1] != 4 && (board[i][j + 1]<=5 || board[i][j + 1] >= 10)) {
				board[i][j] = monsterDetails.prevInCell;
				characters[monsterColor].prevInCell = board[i][j+1];
				characters[monsterColor].y++;
				characters[monsterColor].direction=monsterColor+'Right'
				}
			}
		if(board[characters[monsterColor].x][characters[monsterColor].y]==5 && !isStar){ //pacman met monster -> 1 loss
			characters[monsterColor].prevInCell = 0;
			isLoss = true;
		}
		if(board[characters[monsterColor].x][characters[monsterColor].y]==5 && isStar){ //pacman met star -> 50 points
			board[i][j]=characters[monsterColor].prevInCell;
			characters[monsterColor].prevInCell=0;
			characters[monsterColor].isOnBoard = false;
			score+=50;
		} 
		else{
			if (isStar)
				board[characters[monsterColor].x][characters[monsterColor].y] = 13; //update monster location on board
			else
				board[characters[monsterColor].x][characters[monsterColor].y] = currMonster; //update monster location on board
			currMonster++; //next monster sirial number
		}
	// TO DO:  check if collapsed and if so decrease points and restart
	}
}

function getBestDirection(x,y){
	number = getRandomInt(1,5);
	return number;
}

function checkLoss(){
	if(!isLoss)
		return;
	totalLoss++;
	score-=10;
	board[characters['pacman'].x][characters['pacman'].y] = 0;
	setCharactersOnBoard();
	isLoss = false;
}