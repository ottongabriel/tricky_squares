<?php

    // configuration
    require("../includes/config.php"); 
    
    // find user's current level
    $row = CS50::query("SELECT level, username FROM users WHERE id = ?", $_SESSION["id"]);
    
    // store level and username in variables
    $level = $row[0]["level"];

    // render How to play page
    render("instructions_view.php", ["title" => "Learn to Play!", "level" => $level]);

?>
