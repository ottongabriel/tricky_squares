/**
 * scripts.js
 *
 * Computer Science 50
 * Tricky Squares
 *
 * JavaScript for game
 */

function testing(){
  console.log("Hello");
  startGame();
}

// variable definitions
// NOTE: squares[] and level are being passed in
var right_answers = 0,
    wrong_answers = 0,
    // regular 4000
    long_timeout = 4000,
    //regular 2000
    short_timeout = 2000,
    sound_ding = new Audio('sounds/right.mp3'),
    sound_buzzer = new Audio('sounds/wrong.mp3'),
    sound_tick = new Audio('sounds/click.mp3');



// show results
function results(){
  console.log("Game is over.");
  console.log("Correct answers: " + right_answers);
  console.log("Incorrect answers: " + wrong_answers);
  
  var iterations = squares.length;
  var percent_correct = Math.round((right_answers * 100) / iterations),
  change_level = "";
  console.log("Percent correct: " + percent_correct);
  
  if(percent_correct < 65 && level > 1){
    change_level = "down";
    $.post("decrease_level.php");
  }
  else if(percent_correct < 85){
    change_level = "no";
  }
  else{
    change_level = "up";
    $.post("increase_level.php");
  }
  window.location.href = "results.php?percent_correct=" + percent_correct +
                                                    "&correct_answers=" + right_answers +
                                                    "&change_level=" + change_level + 
                                                    "&iterations=" + iterations +
                                                    "&level=" + level;
}

function coverOn(){
  //slect white screen cover
  var cover = $('#cover');
  
  //start results timeline
  var rstl = new TimelineLite({onComplete: results});
  
  rstl.set(cover, {x: "0%", display: "block"})
  .to(cover, 1, {opacity: 1});
}


function startGame(){
  console.log(squares);
  console.log(level);
  var sq_tracker_val = 1,
  disp_sq_pos = 0,
  board_tracker_val = 1,
  iterations = squares.length,
  correct_square_coordinates = "",
  correct_square;
  
  (function beginning(){
    sound_tick.play();
    $("div[id=sq-tracker]").text(sq_tracker_val);
    console.log(sq_tracker_val);
    $("div[id=sq-disp]").text(squares[disp_sq_pos]);
    console.log(squares[disp_sq_pos]);
    console.log("");
    disp_sq_pos++;
    sq_tracker_val++;
    window.setTimeout(function(){
      if(disp_sq_pos < level){
        beginning();
      }
      else{
        continueGame();
      }
    }, long_timeout);
  })();
  
  //
  function continueGame(){
    sound_tick.play();
    if(board_tracker_val <= iterations){
      correct_square_coordinates = squares[board_tracker_val - 1];
      correct_square = $("div[data-square=" + correct_square_coordinates + "]");
      
      $("div[id=board-tracker]").text(board_tracker_val);
      console.log("board answer number: " + board_tracker_val);
      console.log("correct board answer: " + correct_square_coordinates);
      
      
      var timeIsUp = window.setTimeout(function(){
        // unasign previous listeners, if any
        $("div[class*=square]").off("click");
        
        sound_buzzer.play();
        
        console.log("You ran out of time");
        console.log("the correct square was: " + correct_square_coordinates);
        console.log("");
        
        // highlight correct square in red
        correct_square.addClass('highlight-red');
        window.setTimeout(function(){
          correct_square.removeClass('highlight-red');
          continueGame();
        }, short_timeout);
        wrong_answers++;
        disp_sq_pos++;
        sq_tracker_val++;
      }, long_timeout);
      
      
      
      if(disp_sq_pos < iterations){
        $("div[id=sq-tracker]").text(sq_tracker_val);
        console.log("problem number: " + sq_tracker_val);
        $("div[id=sq-disp]").text(squares[disp_sq_pos]);
        console.log("problem square: " + squares[disp_sq_pos]);
        console.log("");
      }
      else{
        $("div[id=sq-tracker]").text(" ");
        $("div[id=sq-disp]").text(" ");
      }
      
      
      
      
      
      // unasign previous listeners, if any
      $("div[class*=square]").off("click");
      
      // listen for clicks
      $("div[class*=square]").on("click", function(){
        //square clicked
        var square_clicked = $(this);
        var square_clicked_coordinates = $(this).attr('data-square');
        console.log(square_clicked_coordinates + " was clicked");
        $("div[class*=square]").off("click");
        clearTimeout(timeIsUp);
        
        // if the correct square was cliked
        if(square_clicked_coordinates == correct_square_coordinates){
          console.log("You clicked the correct square!!!");
          console.log("");
          right_answers++;
          
          sound_ding.play();
          
          // highlight the square green
          square_clicked.addClass('highlight-green');
          window.setTimeout(function(){
            square_clicked.removeClass('highlight-green');
          }, short_timeout);
          
        }
        //if a square other than the correct one was clicked
        else{
          console.log("You clicked an incorrect square...");
          console.log("You should have clicked: " + correct_square_coordinates);
          console.log("");
          wrong_answers++;
          
          sound_buzzer.play();
          
          // highlight the square clicked in red
          square_clicked.addClass('highlight-red');
          window.setTimeout(function(){
            square_clicked.removeClass('highlight-red');
          }, short_timeout);
          
          // highligh the correct square in green
          correct_square.addClass('highlight-green');
          window.setTimeout(function(){
            correct_square.removeClass('highlight-green');
          }, short_timeout);
        }
        
        disp_sq_pos++;
        sq_tracker_val++;
        
        window.setTimeout(continueGame, short_timeout);
        

      });
      
      
      
      
      
      
      board_tracker_val++;
      
    }
    else{
      $("div[id=board-tracker]").text(" ");
      clearTimeout(timeIsUp);
      coverOn();
    }
  }
}

function countdown(){
  
  //select counter element
  var head = $("h1");
  
  //slect white screen cover
  var cover = $('#cover');
  
  //start countdown timeline
  var cdtl = new TimelineLite({onComplete: testing});
  
  //countdown number
  var count = 3;
  
  // counter speed in seconds
  var c_speed = 0.6;
  
  cdtl.to(head, c_speed, {opacity: 1})
  .to(head, c_speed, {opacity: 0, onComplete: function(){
    if(count > 0){
      head.html(count);
      count -= 1;
      cdtl.restart();
    }
    else{
      cdtl.to(cover, c_speed, {opacity: 0})
      .set(cover, {x: "100%", display: "none"});
    }
  }});
}

// configuration of the chessboard will be relevant in future games
function initChessBoard() {
  // Configuration might become necessary for other games
  // var cfg = {
    //
  // };
  board = ChessBoard('board');
}


$(window).ready(function() {
  initChessBoard();
  countdown();
});

/**
 * This function resizes the board and the squares if the screen changes size.
 * The width of the board and the squares is already being changed by CSS. 
 * This function takes the new widths and changes the heigths to be the same as the new values.
 */
// resize board if the screen changes size
$( window ).resize(function() {
  var board_selector = $("#board [class*=chessboard] > [class*=board]"),
      square_selector = $("div[class*=square]"),
      board_width = board_selector.width(),
      square_width = square_selector.width();
      
  board_selector.css({
    "max-height": board_width,
    "min-height": board_width,
  });
  
  square_selector.css({
    "max-height": square_width,
    "min-height": square_width,
  });
  
});
