<div>
    <p>Hello, <?= $username?>!</p>
    <?php if($level == 1): ?>
        <!--how to play video needs to be tested-->
        <object data="https://www.youtube.com/embed/-tdi-9CQU-o" width="560" height="315"></object>
        </br>
        <p>Click here for an explanation of <a href="n_back.php?n=1"><b>1 Back</b></a></p>
        <p>Or <a href="game.php">Play <b>Tricky Squares</b></a></p>
    <?php else: ?>
        <p>Your current level in <b>Tricky Squares</b> is: </p>
        <h1><?= $level?></h1>
        <p><a href="game.php">Play <b>Tricky Squares</b></a></p>
    <?php endif ?>
</div>