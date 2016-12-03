<?php

    // configuration
    require("../includes/config.php"); 
    
    // ensure the request comes in the right way
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        // level up
        if ($_POST["change"] == "up")
        {
            CS50::query("UPDATE users SET level = level + 1 WHERE id = ?", $_SESSION["id"]);
        }
        //level down
        if ($_POST["change"] == "down")
        {
            CS50::query("UPDATE users SET level = level - 1 WHERE id = ?", $_SESSION["id"]);
        }
    } 
?>