<?php

    // configuration
    require("../includes/config.php"); 
    
    // find user's current level
    $row = CS50::query("SELECT level, username FROM users WHERE id = ?", $_SESSION["id"]);
    
    // store level and username in variables
    $level = $row[0]["level"];
    $username = $row[0]["username"];

    // render home
    render("home.php", ["title" => "Home", "level" => $level, "username" => $username]);

?>
