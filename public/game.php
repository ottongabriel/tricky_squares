<?php

    // configuration
    require("../includes/config.php"); 
    
    // find user's current level
    $row = CS50::query("SELECT level, username FROM users WHERE id = ?", $_SESSION["id"]);
    
    // store level and username in variables
    $level = $row[0]["level"];
    
    // generate random squares depending on level
    // should generate 22 for one back, 26 for two back, and so on
    $number_of_squares = 18 + ($level * 4);
    $random_squares = [$number_of_squares];
    
    for ($i = 0; $i < $number_of_squares; $i++) {
        $r_square = chr(rand(97,104)) . rand(1,8);
        $random_squares[$i] = $r_square;
    }

    // render home
    render("game_view.php", ["title" => "Game", "level" => $level, "squares" => $random_squares]);

?>
