var canvas = document.querySelector('.game');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height = width;
var grid = width/60;
var s = grid/2;
var third = width/3;
var tThird = third*2;
var size = width/4;
var sSmall = third - s;
var sBig = third + s;
var player = 1;
var finished = false;
var endCardDrawn = false;
var board = [["", "", ""], ["", "", ""], ["", "", ""]];

var playerOne = new Image();
var playerTwo = new Image();
var replay = new Image();
playerOne.src = 'bluex.svg';
playerTwo.src = 'redx.svg';
replay.src = 'replay.svg';
start();
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}
function place(x, y, i, b){
	var n = width*(3/80);
	
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
	finished = checkIfLose(board)
	if (finished){
		if (!endCardDrawn){
			endCard();
			console.log("player "+player+" won");
		} else {
			start();
		}
	}
});
function checkIfLose(board){
	for (i=0; i < 3; i++){
		console.log(i);
		console.log(board[i]);
		if (board[i][0]=="x" && board[i][1]=="x" && board[i][2]=="x"){
			return true;
		}else if (board[0][i]=="x" && board[1][i]=="x" && board[2][i]=="x"){
			return true;
		}
	}
	if (board[1][1]=="x"){
		if (board[0][0]=="x" && board[2][2]=="x"){
			return true;
		}
		if (board[0][2]=="x" && board[2][0]=="x"){
			return true;
		}
	}
}
function switchPlayer(){
	if (player == 1){
		player = 2;
	} else if (player ==2 ){
		player=1;
	}
}
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
function start(){
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