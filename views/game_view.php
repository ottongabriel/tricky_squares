<!-- making information generated in game.php useable -->
<script>
    var squares = <?php echo json_encode($squares); ?>;
    var level = <?php echo json_encode($level); ?>;
</script>
<div id="game-area">
    <div id="left">
        <div class="inner-box">
            <p>Problem:</p>
            <div id="board-tracker" class="tracker"></div>
            <div id="board"></div>
        </div>
    </div>
    <div id="right">
        <div class="inner-box">
            <p>Problem:</p>
            <div id="sq-tracker" class="tracker"></div>
            <p>Square:</p>
            <div id="sq-disp" class="tracker"></div>
            <p>Level:</p>
            <div id="level" class="tracker"><?= $level ?></div>
        </div>
    </div>
</div>
<div id="cover">
    <h1>Are you ready?</h1>
</div>
