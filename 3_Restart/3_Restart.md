Getting things (re)started right
================================
Once you've lost you are placed back at the start screen. This allows you to get straight back into the game, but doesn't allow you the chance to show of you're score so you can boast to your friends. To allow this you need a way of stopping the score from being updated when you die (so you cant cheat and pretend you scored better than you did ) but that also allows you to get back to the start screen. For this we need a restart button.

Find or create a restart button image and load it as you did the start button: declare a varible for its sprite (for example "end"), and load it in the preload function (game.load.image("restart","restart.png");) . as this button will be clicked and will restart the game we need a click handler called restart:
 ```
 function restart(){
      score=0
       game.state.restart()
}

 ```
`game.state.restart()` only needs to be in this function, and so you should remove it from `function gameOver()` replacing it with three lines, one creating a sprite of the restart button with the end variable, the next enabling input on it, and the last having an on-click event that calls the restart function (these three lines will be very similar to the code you wrote for the start button). Have a go at this without looking at the code below first, then check to make sure.
```
end = game.add.sprite(250, 150, "Restart");
end.inputEnabled=true;
end.events.onInputDown.add(restart,this)
```
Remove `score=0` from `function gameOver()`, as we want the score to be kept untill the game restarts- which we added in the restart function. Then add to top of `function gameOver()` the line `clicked =false`(this will make sense in a moment). Finally put the contents of `function changeScore()` inside of an if statement that only runs if clicked is true. It should look like this:
```
function changeScore() {
	if(ClickCheck==1){
	score = score + 1;
	labelScore.setText(score.toString());
}
}
```
This if statement means that the score is not updated once the player loses so that they know how well they have done.  
