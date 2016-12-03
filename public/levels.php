<?php

    // configuration
    require("../includes/config.php"); 
    
    // find user's current level
    $row = CS50::query("SELECT level, username FROM users WHERE id = ?", $_SESSION["id"]);
    
    // store level in variable
    $level = $row[0]["level"];

    // render Levels page
    render("levels_view.php", ["title" => "Levels", "level" => $level]);

?>
