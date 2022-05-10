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
var points5radio;
var points15radio;
var points25radio;
var pacmanDirection='pacmanRight';
var colors = {"Yellow": "#FFFD98" , "Green": "#D0F3B8" , "Blue": "#B8D7F3" , "Pink": "#F3B8F1" , "Purple": "#D6B8F3"}
function Start() {
	console.log(color5points, color15points ,color25points)
	console.log(points5radio, points15radio ,points25radio)
	score = 0;
	var food_remain = food_requested;
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
	var emptyCell = findRandomEmptyCell(board);
	console.log(emptyCell);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 5;
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
		  if (board[i][j] == 5) {
			var pacmanimg = new Image();
			pacmanimg.src = './pictures/'+pacmanDirection+'.png';
			context.drawImage(pacmanimg, center.x-15, center.y-15,30, 30);
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
	board[shape.i][shape.j] = 5;
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