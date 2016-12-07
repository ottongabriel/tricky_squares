<!DOCTYPE html>

<html>

    <head>
        <!-- website icon -->
        <link rel="shortcut icon" type="image/x-icon" href="public/img/favicon.ico" />
        
        <!-- http://getbootstrap.com/ -->
        <link href="/css/bootstrap.min.css" rel="stylesheet"/>
        
        <!-- Styles -->
        <link href="/css/styles.css" rel="stylesheet"/>
        
        <!-- chessboard styles -->
        <link rel="stylesheet" href="/css/chessboard-0.3.0.css">
        
        <!-- https://jquery.com/ -->
        <script src="/js/jquery-1.11.3.min.js"></script>

        <!-- http://getbootstrap.com/ -->
        <script src="/js/bootstrap.min.js"></script>
        
        <!-- http://greensock.com/timelinelite -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>

        <!-- if the title is passed in from rendering -->
        <?php if (isset($title)): ?>
            <title>Tricky Squares: <?= htmlspecialchars($title) ?></title>
            
            <!-- is it the game page? -->
            <?php if ($title == "Game"): ?>
                <!-- load the chessboard api and the game scripts -->
                <!-- chessboardjs.com -->
                <script src="/js/chessboard-0.3.0.js"></script>
                
                <!-- game scripts -->
                <script src="/js/scripts.js"></script>
            <?php endif?>    
        
        <!-- if the title is not passed in -->
        <?php else: ?>
            <title>Tricky Squares</title>
        <?php endif ?>

    </head>

    <body>

        <div class="container">

            <div id="top">
                <div>
                    <a href="/"><img alt="Tricky Chess Exercises" src="/img/logo.png"/></a>
                </div>
                <!-- render navigation only if the user is logged in and their level is available -->
                <?php if (!empty($_SESSION["id"]) && isset($level)): ?>
                    <ul class="nav nav-pills">
                        <li><a href="index.php"><strong>Home</strong></a></li>
                        <?php if (isset($title) && $title != "Game"): ?>
                        <li><a href="game.php"><strong>Play</strong></a></li>
                        <?php endif ?>
                        <li><a href="about.php"><strong>About</strong></a></li>
                        <li><a href="instructions.php"><strong>How to play</strong></a></li>
                        <li><a><strong>Level: <?= isset($new_level)? $new_level : $level ?></strong></a></li>
                        <li><a href="logout.php"><strong>Log Out</strong></a></li>
                    </ul>
                <?php endif ?>
            </div>

            <div id="middle">
