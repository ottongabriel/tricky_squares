/**
 * scripts.js
 *
 * Computer Science 50
 * Tricky Squares
 *
 * Script for Tricky Squares
 * 
 * Shows a series of problems to the player.
 * Player has to answer in the same order that the problems were shown
 * However, player doesn't have to answer the problem currently being displayed
 * Instead, the player has to answer the problem that was shown N-times back
 * Where N is equal to the player's current level
 * 
 */

// variable definitions
// NOTE: squares[] and level are being passed in
var right_answers = 0,
    wrong_answers = 0,
    // regular 4000
    long_timeout = 4000,
    //regular 2000
    short_timeout = 2000,
    
    // sounds
    sound_ding = new Audio('sounds/right.mp3'),
    sound_buzzer = new Audio('sounds/wrong.mp3'),
    sound_tick = new Audio('sounds/click.mp3');

// prapares information for results page
// ON COMPLETE navigates to results page with prepared information
function results(){
  // initialize and define variables to be passed to the results page
  var iterations = squares.length;
  var percent_correct = Math.round((right_answers * 100) / iterations),
  change_level = "";
  
  // define change_level and handle level change as necessary
  // if the number of correct answers was less than 65% go down a level
  if(percent_correct < 65 && level > 1){
    change_level = "down";
    $.post("change_level.php", {change: "down"});
  }
  // if the number of correct answers was more than 65% but less than 85% stay at the same level
  else if(percent_correct < 85){
    change_level = "no";
  }
  // if the number of correct answers is greater than 85% go up a level
  else{
    change_level = "up";
    $.post("change_level.php", {change: "up"});
  }
  
  // go to the results page sending pertinent information
  window.location.href = "results.php?percent_correct=" + percent_correct +
                                                    "&correct_answers=" + right_answers +
                                                    "&change_level=" + change_level + 
                                                    "&iterations=" + iterations +
                                                    "&level=" + level;
}

// fade to white after the game is over
// ON COMPLETE calls results function
function coverOn(){
  //slect white screen cover
  var cover = $('#cover');
  
  //start results timeline
  var rstl = new TimelineLite({onComplete: results});
  
  rstl.set(cover, {x: "0%", display: "block"})
  .to(cover, 1, {opacity: 1});
}

// start game
function startGame(){
  // variable definitions
  var sq_tracker_val = 1,
  disp_sq_pos = 0,
  board_tracker_val = 1,
  iterations = squares.length,
  correct_square_coordinates = "",
  correct_square;
  
  /**
  * 
  * Define and execute beggining function
  *
  * This function the first exercises before the player needs to start answering
  * Separated from the rest of the script for my own readability
  * 
  */
  
  (function beginning(){
    // tick whenever a new square is shown
    sound_tick.play();
    
    // display new exercise
    $("div[id=sq-tracker]").text(sq_tracker_val);
    // diplay current exercise number
    $("div[id=sq-disp]").text(squares[disp_sq_pos]);
    
    // update values
    disp_sq_pos++;
    sq_tracker_val++;
    
    // wait while player looks at exercise
    window.setTimeout(function(){
      // if before the pint the player needs to start answering
      if(disp_sq_pos < level){
        // continue to run the beggining function
        beginning();
      }
      else{
        // otherwise start the game proper
        continueGame();
      }
    }, long_timeout);
  })();
  
  /**
  * continueGame function
  *
  * Now the player needs to answer problems that were shown N-time ahead
  * while the game coninues to show problems untill there are no more
  * 
  * ONCOMPLETE: calls the fade to white function. IE: coverOn()
  */
  function continueGame(){
    // tick sound for every iteration
    sound_tick.play();
    
    // wait for answers each iteration
    // iterate until there are no more problems to be answered
    if(board_tracker_val <= iterations){
      // get the coordinates of the square for the problem to be answered
      correct_square_coordinates = squares[board_tracker_val - 1];
      // select the div for that square
      correct_square = $("div[data-square=" + correct_square_coordinates + "]");
      
      // update tracker with number of the problem that needs to be answered
      $("div[id=board-tracker]").text(board_tracker_val);
      
      // wait for answer
      var timeIsUp = window.setTimeout(function(){
        // but, if the player takes too long...
        // unasign previous listeners, if any
        $("div[class*=square]").off("click");
        
        //sound buzzer
        sound_buzzer.play();
        
        // highlight the square they should have clicked in red
        correct_square.addClass('highlight-red');
        window.setTimeout(function(){
          //remove the highlight after a second
          correct_square.removeClass('highlight-red');
          continueGame();
        }, short_timeout);
        
        // timing-out is considered a wrong answer
        wrong_answers++;
        
        // update values for next iteration
        disp_sq_pos++;
        sq_tracker_val++;
      }, long_timeout);
      
      // continue displaying problems while there are problems to display
      if(disp_sq_pos < iterations){
        // display the problem number
        $("div[id=sq-tracker]").text(sq_tracker_val);
        
        // display the problem
        $("div[id=sq-disp]").text(squares[disp_sq_pos]);
      }
      // display blank if there are no more problems,
      // while the player continues to answer previous problems
      else{
        $("div[id=sq-tracker]").text(" ");
        $("div[id=sq-disp]").text(" ");
      }
      
      // unasign previous listeners, if any
      $("div[class*=square]").off("click");
      
      // listen for clicks
      $("div[class*=square]").on("click", function(){
        // square that was clicked
        var square_clicked = $(this);
        // and its coordinates
        var square_clicked_coordinates = $(this).attr('data-square');
        
        // stop listening for clicks
        $("div[class*=square]").off("click");
        // stop waiting for an answer
        clearTimeout(timeIsUp);
        
        // if the correct square was cliked
        if(square_clicked_coordinates == correct_square_coordinates){
          // update number of correct answers
          right_answers++;
          
          //play ding sound
          sound_ding.play();
          
          // highlight the square in green
          square_clicked.addClass('highlight-green');
          window.setTimeout(function(){
            // remove the highlight after a second
            square_clicked.removeClass('highlight-green');
          }, short_timeout);
          
        }
        //if a square other than the correct one was clicked
        else{
          // update number of wrong answers
          wrong_answers++;
          
          // play buzzer
          sound_buzzer.play();
          
          // highlight the square clicked in red
          square_clicked.addClass('highlight-red');
          window.setTimeout(function(){
            // remove the highlight after a second
            square_clicked.removeClass('highlight-red');
          }, short_timeout);
          
          // highligh the square they should have clicked in green
          correct_square.addClass('highlight-green');
          window.setTimeout(function(){
            // remove highlight after a second
            correct_square.removeClass('highlight-green');
          }, short_timeout);
        }
        
        // update values for next iteration
        disp_sq_pos++;
        sq_tracker_val++;
        
        // start new iteration after a second of a square being clicked
        window.setTimeout(continueGame, short_timeout);
      });
      
      // update values for new iteration
      board_tracker_val++;
    }
    
    // after all problems have been displayed and player attempted to answer all of them
    else{
      // display "current problem to answer" as blank
      $("div[id=board-tracker]").text(" ");
      
      // stop waiting for answers
      clearTimeout(timeIsUp);
      
      // call the fade to white function
      coverOn();
    }
  }
}

// countdown before game
// ONCOMPLETE calls startGame()
function countdown(){
  
  //select counter element
  var head = $("h1");
  
  //slect white screen cover
  var cover = $('#cover');
  
  //start countdown timeline
  var cdtl = new TimelineLite({onComplete: startGame});
  
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

// start scripts when the window is ready
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
