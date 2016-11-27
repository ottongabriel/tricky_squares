<div>
    <h1><?= $n ?>-Back</h1>
    </br>
    <?php if($n == 1): ?>
        <!--1 back video needs to be tested-->
        <object data="https://www.youtube.com/embed/PX_u4uCoeHI"
        width="560" height="315"></object>
        <p><a href="n_back.php?n=2">2 Back Example</a> &emsp; <a href="levels.php">Levels</a></p>
    <?php else: ?>
        <!--2 back video needs to be tested-->
        <object data="https://www.youtube.com/embed/8TDwdY3Cy6Q"
        width="560" height="315"></object>
        <p><a href="n_back.php?n=1">1 Back Example</a> &emsp; <a href="levels.php">Levels</a></p>
    <?php endif ?>
    </br>
    <p><a href="game.php">Play <b>Tricky Squares</b></a></p>
</div>