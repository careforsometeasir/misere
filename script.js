var canvas = document.querySelector('.game');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height = width;
var grid = width/60; //Width of grid lines
var s = grid/2;
var third = width/3;
var tThird = third*2;
var size = width/4;
var sSmall = third - s;
var sBig = third + s;
//These variables are given values in start()
var player;
var finished;
var endCardDrawn;
var board; //This is where the board is stored
//Loading up images
var playerOne = new Image();
var playerTwo = new Image();
var replay = new Image();
playerOne.src = 'bluex.svg';
playerTwo.src = 'redx.svg';
replay.src = 'replay.svg';

//call the start function
start();

//function to get mouse coordinates on canvas
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

//really overcomplicated function to determine which cell has been clicked
function place(x, y, i, b){
	var n = width*(3/80); //I'm not sure where I got this ratio from, but when I first made this and all the values were static (Width, height = 600) then 22.5 looked good and I can't remember where I got it from

	if (x < sSmall && y < sSmall && b[0][0] != "x"){
		ctx.drawImage(i, n, n, size, size);
		b[0][0]="x";
		switchPlayer();
	} else if (x > third+s && x < tThird-s && y < third-s && b[0][1]!="x"){
		ctx.drawImage(i, n+third+s, n, size, size);
		b[0][1]="x";
		switchPlayer();
	} else if (x > tThird+s && y < third-s && b[0][2]!="x"){
		ctx.drawImage(i, n+tThird+s, n, size, size);
		b[0][2]="x";
		switchPlayer();
	} else if (x < third-s && y > third+s && y < tThird-s && b[1][0]!="x"){
		ctx.drawImage(i, n, n+third+s, size, size);
		b[1][0]="x";
		switchPlayer();
	} else if (x > third+s && x < tThird-s && y > third+s && y < tThird-s && b[1][1]!="x"){
		ctx.drawImage(i, n+third+s, n+third+s, size, size);
		b[1][1]="x";
		switchPlayer();
	} else if (x>tThird+s && y > third+s && y < tThird-s && b[1][2]!="x"){
		ctx.drawImage(i, n+tThird+s, n+third+s, size, size);
		b[1][2]="x";
		switchPlayer();
	} else if (x < third-s && y > tThird+s && b[2][0]!="x"){
		ctx.drawImage(i, n, n+tThird+s, size, size);
		b[2][0]="x";
		switchPlayer();
	} else if (x > sSmall && x < tThird - s && y > tThird + s && b[2][1]!="x"){
		ctx.drawImage(i, n+sBig, n+tThird+s, size, size);
		b[2][1]="x";
		switchPlayer();
	} else if (x>tThird && y>tThird && b[2][2]!="x"){
		ctx.drawImage(i, n+tThird+s, n+tThird+s, size, size);
		b[2][2]="x";
		switchPlayer();
	}
}
//here is where everything happens
canvas.addEventListener("click", function(event){
	var pos = getMousePos(canvas, event);
	//console.log(player)
	if (!finished){
		if (player == 1){
			place(pos.x, pos.y, playerOne, board);
		}
		if (player == 2){
			place(pos.x, pos.y, playerTwo, board);
		}
	}
	finished = checkIfLose(board);
	if (finished){
		if (!endCardDrawn){
			endCard();
			console.log("player "+player+" won");
		} else {
			start();
		}
	}
});

//this function looks at the board and checks to see if there are any 3 in a rows
function checkIfLose(board){
	for (i=0; i < 3; i++){
		//console.log(i);
		//console.log(board[i]);
		//Check for horizontal sets
		if (board[i][0]=="x" && board[i][1]=="x" && board[i][2]=="x"){
			return true;
		//Check for vertical sets
		}else if (board[0][i]=="x" && board[1][i]=="x" && board[2][i]=="x"){
			return true;
		}
	}
	//Check if there is an x in the middle, checking for diagonal sets
	if (board[1][1]=="x"){
		//check for top left to bottom right set
		if (board[0][0]=="x" && board[2][2]=="x"){
			return true;
		}
		//check for top right to bottom left set
		if (board[0][2]=="x" && board[2][0]=="x"){
			return true;
		}
	}
}
//function switches player
function switchPlayer(){
	if (player == 1){
		player = 2;
	} else if (player ==2 ){
		player=1;
	}
}
//function draws the end/replay screen
function endCard(){
	ctx.font = '45px Open Sans';
	var textWidth;
	ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
	ctx.fillRect(0,0,width,height);
	if (player == 1){
		ctx.fillStyle = 'rgb(61, 28, 255)';
		textWidth = ctx.measureText('Player 1 won').width;
		ctx.fillText('Player 1 won', (width/2)-(textWidth/2), third);
	} else {
		ctx.fillStyle = 'rgb(255, 25, 25)';
		textWidth = ctx.measureText('Player 2 won').width;
		console.log(textWidth);
		ctx.fillText('Player 2 won', (width/2)-(textWidth/2), third);
	}
	endCardDrawn=true;
	ctx.drawImage(replay, (width/2)-40, (width/2)-40, 80, 80);
}
//the start function draws the grid and sets the starting variables
function start(){
	player = 1;
	//empty board
	board = [["", "", ""], ["", "", ""], ["", "", ""]];
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(20, 20, 20)';
	ctx.fillRect(sSmall, 0, grid, width);
	ctx.fillRect(tThird-s, 0, grid, width);
	ctx.fillRect(0, sSmall, height, grid);
	ctx.fillRect(0, tThird-s, height, grid);
	finished = false;
	endCardDrawn = false;
}
