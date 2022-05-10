var left;
var up;
var right;
var down;
var food_requested;
var maxGameTime;
var monsters;
var color5points;
var color15points;
var color25points;
var pacmanDirection='pacmanRight'
function Start() {
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = food_requested;
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
	var emptyCell = findRandomEmptyCell(board);
	console.log(emptyCell);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2;
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 30; j++) {
			var randomNum = Math.random();
			if ((randomNum <= (1.0 * food_remain) / cnt)&&(board[i][j] == 0)) { // randomNum <= 0.5-0.9
				food_remain--;
				board[i][j] = 1;
			}
			cnt--;
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
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
	interval = setInterval(UpdatePosition, 140);
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
		  if (board[i][j] == 2) {
			var pacmanimg = new Image();
			pacmanimg.src = './pictures/'+pacmanDirection+'.png';
			context.drawImage(pacmanimg, center.x-15, center.y-15,30, 30);
			context.draw
		  } else if (board[i][j] == 1) {
			context.beginPath();
			context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			context.fillStyle = "black"; //color food
			context.fill();
		  } else if (board[i][j] == 4) {
			context.beginPath();
			context.rect(center.x - 15, center.y - 15, 30, 30);
			context.fillStyle = "grey"; //color wall
			context.fill();
		  }
		}
	  }
	}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //up
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			pacmanDirection='pacmanUp'
		}
	}
	if (x == 2) { //down
		if (shape.i < 14 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			pacmanDirection='pacmanDown'
		}
	}
	if (x == 3) { //left
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			pacmanDirection='pacmanLeft'
		}
	}
	if (x == 4) { //right
		if (shape.j < 29 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			pacmanDirection='pacmanRight'
		}
	}
	if (board[shape.i][shape.j] == 1) { //TODO : change score according to food
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score == 100) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	if(maxGameTime <= time_elapsed){
		window.clearInterval(interval);
		window.alert("You lost!");
	}
	else {
		Draw();
	}
}