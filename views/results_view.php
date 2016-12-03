<div>
    <h1>RESULTS</h1>
    <p>You answered <?= $correct_answers ?> out of <?= $iterations ?> correctly.</p>
    <p>That's <?= $percent_correct ?>% correct</p>
    
    <?php if($level == 1 && $change_level == "no"): ?>
        <?php if($percent_correct < 65): ?>
        <p>You don't seem to quite get it. Don't give up! Try again!</p>
        <p>Here is the explanation for "1 Back" again, in case you need it:</p>
        <!--One back explanation-->
        <iframe src="https://www.youtube.com/embed/PX_u4uCoeHI"
        width="560" height="315" frameborder="0" allowfullscreen></iframe>
        <?php else: ?>
        <p>You are almost there! Keep trying!</p>
        <?php endif ?>
        
    <?php elseif($level == 1 && $change_level == "up"): ?>
        <p>Congratulations! You go up a level!</p>
        <p>Next time you play you will be doing 2 back exercises.</p>
        <h2>2-BACK</h2>
        <!--Two back explanation vid-->
        <iframe src="https://www.youtube.com/embed/8TDwdY3Cy6Q"
        width="560" height="315" frameborder="0" allowfullscreen></iframe>
        
    <?php elseif($level == 2 && $change_level == "up"): ?>
        <p>Congratulations! You go up a level!</p>
        <p>Now here is an explanation for:</p>
        <h2>LEVELS</h2>
        <!--levels explanation video-->
        <iframe src="https://www.youtube.com/embed/YlQabNIzTMU"
        
    <?php elseif($percent_correct == 100): ?>
        <p>Amazing! You answered all of them correctly! And so, you go up a level!</p>
    
    <?php elseif($change_level == "no"): ?>
        <?php if($percent_correct >= 75): ?>
            <p>You answered less than 85% of them correctly. And so, you stay at the same level.</p>
        <?php else: ?>
            <p>You answered 65% ot more of them correctly. And so, you stay at the same level.</p>
        <?php endif ?>
    
    <?php elseif($change_level == "down"): ?>
        <p>You answered less than 65% of them correctly. And so, you go down a level.</p>
    
    <?php elseif($change_level == "up"): ?>
        <p>You answered more than 85% of them correctly! You go up a level!</p>
        
    <?php else: ?>
        <p>Something seems to have gone wrong...</p>
    
    <?php endif ?>
    
    <h2>Level <?= $level ?> &rarr; Level <?= $new_level ?></h2>
    
    <h2><a href="game.php">Play again!</a></h2>
</div>