<?php

    // configuration
    require("../includes/config.php"); 
    
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        CS50::query("UPDATE users SET level = level - 1 WHERE id = ?", $_SESSION["id"]);
    }

?>