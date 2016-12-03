<?php

    // configuration
    require("../includes/config.php"); 
    
    // find user's current level
    $row = CS50::query("SELECT level, username FROM users WHERE id = ?", $_SESSION["id"]);
    
    // store level in variable
    $level = $row[0]["level"];
    
    // GET information into variables
    $n = $_GET["n"];
    
    // render N-Back
    render("n_back_view.php", ["title" => $n + " Back", "level" => $level, "n" => $n]);

?>
