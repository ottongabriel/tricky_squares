<?php

    // configuration
    require("../includes/config.php"); 
    
    $percent_correct = $_GET["percent_correct"];
    $change_level = $_GET["change_level"];
    $correct_answers = $_GET["correct_answers"];
    $level = $_GET["level"];
    $iterations = $_GET["iterations"];
    $new_level = $level;
    
    if ($change_level == "up")
    {
        $new_level++;
    }
    else if($change_level == "down")
    {
        $new_level--;
    }
    
    // render results page
    render("results_view.php", ["title" => "Results", 
                                "percent_correct" => $percent_correct, 
                                "change_level" => $change_level,
                                "correct_answers" => $correct_answers,
                                "level" => $level,
                                "iterations" => $iterations,
                                "new_level" => $new_level
                                ]);

?>