var left;
var up;
var right;
var down;
var maxGameTime;
var ghosts;
var color5points;
var color15points;
var color25points;
var colors = {"Yellow": "#f3d99d" , "Green": "#7AB495" , "Blue": "#88c4f8" , "Pink": "#e490c3" , "Purple": "#877FD7"}
var addons; //for each addon: {counter , [name, x, y, isOnBoard, boardnumber (,candyNumber)]
var addonsCount;
var lives;
var isLoss;
var isStarCollected;
var bgMusic;

function Start() {
	bgMusic = new Audio('pictures/files/Remix.mp3');
	bgMusic.loop = true;
	bgMusic.play();
	score = 0;
	lives = 5;
	document.getElementById("currLives").src=  "./pictures/5lives.png";
	isLoss = false;
	characters = {	'pink': {direction: 'pinkUp', x:1, y:1, isOnBoard:true, prevInCell:0 ,lastStep: null},
					'blue': {direction: 'blueUp', x:1, y:28, isOnBoard:false, prevInCell:0 ,lastStep: null},
					'orange': {direction: 'orangeUp', x:13, y:1, isOnBoard:false, prevInCell:0,lastStep: null},
					'red': {direction: 'redUp', x:13, y:28, isOnBoard:false, prevInCell:0 ,lastStep: null} ,
					'marioStar': {direction: 'marioStarUp', x:8, y:15, isOnBoard:false, prevInCell:0 ,lastStep: null} ,
					'pacman': {direction: 'pacmanRight', x:0, y:0}
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
	interval = setInterval(UpdatePosition, 200); //140
	interval2 = setInterval(checkAddons, Math.floor(maxGameTime/10)*1000);
	interval3 = setInterval(candyOnOff, 5000); //every 5 seconds
	interval4 = setInterval(UpdateGhostPosition,350); //ghosts move slower than pacman so the game will be possible to win
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
			if (board[i][j] == 0)
			continue
			if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = colors[color5points]; //color food 5
				context.fill();
			} else if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = colors[color15points]; //color food 15
				context.fill();
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
				context.fillStyle = colors[color25points]; //color food 25
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "#3E3247"; //wall color
				context.fill();
			}
			else if (board[i][j] == 5) {
				img.src = './pictures/'+characters['pacman'].direction+'.png';
				context.drawImage(img, center.x-15, center.y-15,30, 30);
				context.draw;
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
				img.src = './pictures/candy'+addons[0][5]+'.png'; // different colors for candies
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
			else{
				console.log(i,j)
			}
		}
	  }
	}
function UpdatePosition() {
	movePacman();
	if (board[characters['pacman'].x][characters['pacman'].y] == 1) { // 5 points
		score+=5;
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 2) { // 15 points
		score+=15;
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 3) { // 25 points
		score+=25;
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 10) { // clock
		maxGameTime+=20;
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 11) { // candy
		score+=30;
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 12) { // medicine
		if(lives<5){
			lives++;
			updateLivesImg();
		}
	}
	if (board[characters['pacman'].x][characters['pacman'].y] == 13) {  // star 
		// will update the score later
		isStarCollected = true;
	}
	var wasHereBefore = board[characters['pacman'].x][characters['pacman'].y] //before moving pacman, check if there's a ghost there
	if(wasHereBefore >= 6 && wasHereBefore <= 9){ //ghost
		isLoss = true;
	}
	if (!isLoss){ // move pacman if game continues
		board[characters['pacman'].x][characters['pacman'].y] = 5;
		//UpdateGhostPosition(); // isLoss can be updated here to true
	}
	checkLoss();
	checkStar();
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (maxGameTime <= time_elapsed || lives <= 0) { // end game senarios
		gameStop();
		bgMusic.currentTime = 0;
		if (lives<=0){
			bgMusic1 = new Audio('pictures/files/Lose.mp3');
			window.alert("Loser!");}
		else if (maxGameTime <= time_elapsed){
			if	(score < 100){
				bgMusic1 = new Audio('pictures/files/Lose.mp3');
				window.alert("You are better than " + score + " points!");}
			else{ // score >= 100
				bgMusic1 = new Audio('pictures/files/Win.mp3');
				window.alert("Winner!!!");}
		}
		if (!bgMusic.muted)
			bgMusic1.play();
		document.getElementById("gameOption").disabled = false;
	}
	else {
		Draw();
	}
}	
function checkAddons(){ 
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
function addCharacter(addonsCount){ //addes the addons (candy star clock and medicine)
	addons[addonsCount][3]=true;
	if (addonsCount==1){
		characters['marioStar'].prevInCell = board[addons[1][1]][addons[1][2]];
		board[addons[1][1]][addons[1][2]] = 13; //star number
		characters['marioStar'].isOnBoard = true;
	}
	else{
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = addons[addonsCount][4]; //addon board number
		addons[addonsCount][1]=emptyCell[0];
		addons[addonsCount][2]=emptyCell[1];
	}
}
function removeCharacter(addonsCount){ 
	if (addonsCount!=1){
		addons[addonsCount][3]=false;
		board[addons[addonsCount][1]][addons[addonsCount][2]]=0;
	}
}
function restartCharacter(cName, newx, newy, boardVal){
	if (boardVal != 5){ //not pacman: keep the value that was in the cell before. pacman: 0
		board [characters[cName].x][characters[cName].y] = characters[cName].prevInCell;
		characters[cName].prevInCell = board[newx][newy];
		characters[cName].isOnBoard = true;
	}
	characters[cName].x = newx;
	characters[cName].y = newy;
	board[newx][newy] = boardVal;
}
function setCharactersOnBoard(){
	//pacman
	var emptyCell = findRandomEmptyCell(board);
	restartCharacter('pacman', emptyCell[0], emptyCell[1], 5);
	//ghosts
	restartCharacter('pink', 1, 1, 6);
	if (ghosts >= 2){
		restartCharacter('blue', 1, board[0].length-2, 7);
	}
	if (ghosts >= 3){
		restartCharacter('orange', board.length-2, 1, 8);
		}
	if (ghosts == 4){
		restartCharacter('red', board.length-2, board[0].length-2, 9);
		}
}
function UpdateGhostPosition(){
	var currGhost = 6;
	for ([ghostColor, ghostDetails] of Object.entries(characters)) {
		var isStar = false;
		if (!ghostDetails.isOnBoard || ghostColor === 'pacman') //if ghost is not on board or it's a pacman (was updated already)
			continue;
		var i = ghostDetails.x;
		var j = ghostDetails.y;
		var x; // direction
		if (ghostColor=='marioStar'){
			isStar = true;
			x = getRandomInt(1,5); //gets a number between 1 to 4 represents direction
		}
		else{
			moves = getBestMovement(ghostColor,i,j,characters['pacman'].x ,characters['pacman'].y ) //gets smart direction
			x=moves[0];
		}
		if (x == 1) { //up
			if (i > 0 && board[i - 1][j] != 4 && (board[i - 1][j]<=5 || board[i - 1][j] >= 10) && board[i - 1][j] != 13) {
				board[i][j] = ghostDetails.prevInCell;
				characters[ghostColor].prevInCell = board[i-1][j];
				characters[ghostColor].lastStep=1;
				characters[ghostColor].x--;
				characters[ghostColor].direction=ghostColor+'Up'
				}
			}
		if (x == 2) { //down
			if (i < 14 && board[i + 1][j] != 4 && (board[i + 1][j]<=5 || board[i + 1][j] >= 10) && board[i + 1][j] != 13) {
				board[i][j] = ghostDetails.prevInCell;
				characters[ghostColor].prevInCell = board[i+1][j];
				characters[ghostColor].lastStep=2;
				characters[ghostColor].x++;
				characters[ghostColor].direction=ghostColor+'Down'
				}
			}
		if (x == 3) { //left
			if (j > 0 && board[i][j - 1] != 4 && (board[i][j - 1]<=5 || board[i][j - 1] >= 10) && board[i][j - 1] != 13) {
				board[i][j] = ghostDetails.prevInCell;
				characters[ghostColor].prevInCell = board[i][j-1];
				characters[ghostColor].lastStep=3;
				characters[ghostColor].y--;
				characters[ghostColor].direction=ghostColor+'Left'
				}
			}
		if (x == 4) { //right
			if (j < 29 && board[i][j + 1] != 4 && (board[i][j + 1]<=5 || board[i][j + 1] >= 10) && board[i][j + 1] != 13) {
				board[i][j] = ghostDetails.prevInCell;
				characters[ghostColor].prevInCell = board[i][j+1];
				characters[ghostColor].lastStep=4;
				characters[ghostColor].y++;
				characters[ghostColor].direction=ghostColor+'Right'
				}
			}
		if(board[characters[ghostColor].x][characters[ghostColor].y]==5 && !isStar){ // pacman met ghost -> 1 loss
			characters[ghostColor].prevInCell = 0;
			isLoss = true;
		}
		if(board[characters[ghostColor].x][characters[ghostColor].y]==5 && isStar){ // pacman met star -> 50 points
			isStarCollected = true;
		} 
		if (isStar)
			board[characters[ghostColor].x][characters[ghostColor].y] = 13; //update ghost location on board
		if (!isStar){
			board[characters[ghostColor].x][characters[ghostColor].y] = currGhost; //update ghost location on board
			currGhost++; //next ghost sirial number
		} 
	}
}
function getNeighbors(ghost_name, xindex, yindex){
	// in each "if" check if the next step is not a wall or a ghost
	neighbors=[]
	if (board[xindex - 1][yindex]!=4 && (board[xindex - 1][yindex]<=5 || board[xindex - 1][yindex] >= 10))
		neighbors.push(1)
	if (board[xindex + 1][yindex]!=4 && (board[xindex + 1][yindex]<=5 || board[xindex + 1][yindex] >= 10))
		neighbors.push(2)
	if (board[xindex][yindex - 1]!=4 && (board[xindex][yindex - 1]<=5 || board[xindex][yindex - 1] >= 10))
		neighbors.push(3)
	if (board[xindex][yindex + 1]!=4 && (board[xindex][yindex + 1]<=5 || board[xindex][yindex + 1] >= 10))
		neighbors.push(4)
	return neighbors
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
	return (array)
}
function getBestMovement(ghost_name , ghost_i, ghost_j, pac_i, pac_j ){
	// trying to move the ghost towards the pacman without hitting a wall or a ghost an without moving back and fourth.
	movements=[]
	delta_x  = ghost_i-pac_i;
	delta_y = ghost_j-pac_j;
	if(delta_x<0 && characters[ghost_name].lastStep!=1 && board[ghost_i + 1][ghost_j]!=4 && (board[ghost_i + 1][ghost_j]<=5 || board[ghost_i + 1][ghost_j] >= 10))
		movements.push(2)
	if(delta_x>0 && characters[ghost_name].lastStep!=2 && board[ghost_i - 1][ghost_j]!=4 && (board[ghost_i - 1][ghost_j]<=5 || board[ghost_i - 1][ghost_j] >= 10) )
		movements.push(1)
	if(delta_y>0 && characters[ghost_name].lastStep!=4 && board[ghost_i][ghost_j - 1]!=4 && (board[ghost_i][ghost_j - 1]<=5 || board[ghost_i][ghost_j - 1] >= 10))
		movements.push(3)
	if(delta_y<0 && characters[ghost_name].lastStep!=3 && board[ghost_i][ghost_j + 1]!=4 && (board[ghost_i][ghost_j + 1]<=5 || board[ghost_i][ghost_j + 1] >= 10))
		movements.push(4)
	if (movements.length==0){
		movements=getNeighbors(ghost_name, ghost_i, ghost_j);
	}
	movements_shuffled = shuffleArray(movements)	
	return movements_shuffled;
}
function checkLoss(){ 
	if(!isLoss)
		return;
	lives--;
	score -= 10;
	board[characters['pacman'].x][characters['pacman'].y] = 0;
	setCharactersOnBoard();
	isLoss = false;
	updateLivesImg();
	if (!bgMusic.muted){
		bgMusic2 = new Audio('pictures/files/nomnom.mp3');
		bgMusic2.play();}
}
function updateLivesImg(){
	document.getElementById("currLives").src=  "./pictures/" + lives + "lives.png";
}
function checkStar(){
	if(!isStarCollected)
		return;
	board[characters['marioStar'].x][characters['marioStar'].y]=characters['marioStar'].prevInCell;
	characters['marioStar'].prevInCell=0;
	characters['marioStar'].isOnBoard = false;
	score+=50;
	isStarCollected = false;
}
function movePacman(){
	board[characters['pacman'].x][characters['pacman'].y] = 0;
	var x = GetKeyPressed();
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
}
function gameStop() {
	bgMusic.pause();
	window.clearInterval(interval);
	window.clearInterval(interval2);
	window.clearInterval(interval3);
	window.clearInterval(interval4);
	document.body.style.overflow = 'visible'; //show scrollbar when game ends
}