$(document).ready(function(){

var human = 'X';
var computer = 'O';

//Used to hilight winning position
var winLine = [];

var computerMove, wait;

//Tracks occupied spaces for each player
//0 = unoccupied, 1 = human, 2 = computer
var boardState = [0, 0, 0,
                  0, 0, 0,
                  0, 0, 0];

//The various ways to win TicTacToe
var winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], //Horizontal Wins
                   [0, 3, 6], [1, 4, 7], [2, 5, 8], //Veritcal Wins
                   [0, 4, 8], [2, 4, 6]];           //Diagonal Wins


//Check for end-game states
function checkWin(board){
  var winner = 0;

  //Check for possible tie
  if (board.indexOf(0) === -1){
    winner = 3;
  }
  //Check for a winner
  winPatterns.forEach(function(value){
    if (board[value[0]] !== 0){
      if(board[value[0]] === board[value[1]] &&
         board[value[1]] === board[value[2]]){
        winner = board[value[0]];
        //Store winning line for animation later
        winLine = value;
      }
    }
  });
  return winner; //1 for human, 2 for comp, 3 for tie
}

//Find valid (i.e. empty) spaces
function findMoves(board){
   var validMoves = [];
   board.forEach(function(value, index){
     if(value === 0){
       validMoves.push(index);
     }
   });
   return validMoves;
 }

//The MiniMax algorith recursively
//searches all possible moves to
//determine the best move for the computer.
function miniMax(board, player){

  if(checkWin(board) === 1){
    return -10;
  } else if(checkWin(board) === 2){
    return 10;
  } else if(checkWin(board) === 3){
    return 0;
  }

  var move = [];
  var score = [];

  findMoves(board).forEach(function(value){
    board[value] = (player === 'computer') ? 2 : 1;
    score.push(miniMax(board, (player === 'computer') ? 'human' : 'computer'));
    move.push(value);
    board[value] = 0;
  });

  if(player === 'computer'){
    computerMove = move[score.indexOf(Math.max.apply(Math, score))];
    return Math.max.apply(Math, score);
  } else {
    computerMove = move[score.indexOf(Math.min.apply(Math, score))];
    return Math.min.apply(Math, score);
  }
}

//Animate and highlight the winning squares
function showWin(){
  $('.square').css({'background' : '#BDBDBD',
                    'border-color' : '#BDBDBD',
                    'pointer-events' : 'none'});

  $('#' + winLine[0]).css({'background' : '#00E676', 'border-color' : '#00E676'});
  $('#' + winLine[0]).addClass('animated flip');
  $('#' + winLine[1]).css({'background' : '#00E676', 'border-color' : '#00E676'});
  $('#' + winLine[1]).addClass('animated flip');
  $('#' + winLine[2]).css({'background' : '#00E676', 'border-color' : '#00E676'});
  $('#' + winLine[2]).addClass('animated flip');

  wait = window.setTimeout(function(){
    $('#message').html('Computer Wins!<br>Play Again?');
    $('.board').css('opacity', 0.2);
    $('.pop-up').css({'opacity' : '1', 'pointer-events' : 'auto'});
  }, 2000);
}

//Draw the computer's move, check for a win
function makeMove(){
    miniMax(boardState, 'computer');
    boardState[computerMove] = 2;
    $('#p' + computerMove).html(computer);
    $('#' + computerMove).css('pointer-events', 'none');
    if(checkWin(boardState) === 2){
        showWin();
      } else if(checkWin(boardState) === 3){
        $('.square').css({'background' : '#BDBDBD', 'border-color' : '#BDBDBD'});
        wait = window.setTimeout(function(){
          $('#message').html('Tie! <br>Play Again?');
          $('.board').css('opacity', 0.2);
          $('.pop-up').css({'opacity' : '1', 'pointer-events' : 'auto'});
        }, 1000);
      }
  }

//Clear the board
function resetBoard(){
   $('.square p').html('');
   $('.square').css({'pointer-events' : 'auto',
                     'background' : '#2196F3',
                     'border-color' : '#2196F3'});
   $('.square').removeClass('flip');
   $('.pop-up').css({'opacity' : '0', 'pointer-events' : 'none'});
   $('.board').css({'opacity' : '1', 'pointer-events' : 'auto'});
   boardState = [0, 0, 0,
                 0, 0, 0,
                 0, 0, 0];
  if(computer === 'X'){
      makeMove();
  }
}

//X goes first
//Human plays as O
$('.o').click(function(){
  human = 'O';
  computer = 'X';
  resetBoard();
  $('.pop-up').css({'opacity' : '0', 'pointer-events' : 'none'});
  $('.board').css({'opacity' : 1, 'pointer-events' : 'auto'});
});

//Human plays as X
$('.x').click(function(){
  human = 'X';
  computer = 'O';
  resetBoard();
  $('.pop-up').css({'opacity' : '0', 'pointer-events' : 'none'});
  $('.board').css({'opacity' : 1, 'pointer-events' : 'auto'});
});

$('.play').click(function(){
  resetBoard()
});

  //Click square for player's turn
  //Draw the move, check for wins, then make computer's move
    $('.square').click(function(){
      $('#p' + $(this).attr('id')).html(human);
      boardState[$(this).attr('id')] = 1;
      $(this).css('pointer-events', 'none');
      if(checkWin(boardState) === 1){
        showWin();
      } else if(checkWin(boardState) === 3){
        $('.square').css({'background' : '#BDBDBD', 'border-color' : '#BDBDBD'});
        wait = window.setTimeout(function(){
          $('#message').html('Tie!<br>Play Again?');
          $('.board').css('opacity', 0.2);
          $('.pop-up').css({'opacity' : '1', 'pointer-events' : 'auto'});
        }, 1000);
      } else {
        $('body').css('cursor', 'none');
        wait = window.setTimeout(function(){
          $('body').css('cursor', 'auto');
          makeMove();
        }, 500);
      }
    });
});

