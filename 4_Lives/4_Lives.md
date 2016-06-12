Giving the player a second (and third and fourth) chance
========================================================
This next section will teach you how to add a staple of many games-a lives system.

Making things clearer
---------------------
You may have noticed that the pipes appear "on top" of the score, making it harder to see. When we add the lives the same  will happen, and its pretty important that we see how many lives we have left! So to solve this we are going to add a bar at the top of the screen for all this information.

First of all we have to make some space for everything and that involves extending the width of the screen ,and moving everything on the screen down by . First change the "`400`" in  `var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);` to 450, making the screen wider by 50 pixels.

In `function generatePipe()` change the line `addPipeBlock(750, count * 50);` to `addPipeBlock(750, 50+count * 50);`, so that the pipe block is created 50 pixels lower. Changing `if(player.world.y<0 ||player.world.y>350 ){gameOver()}` to `if(player.world.y<50 ||player.world.y>400  ){gameOver()}` moves the Boundaries 50 pixels lower

Hiding the magic
----------------
Now the pipes have been moved down, their tops are visible, which ruins the effect that the player needs to go through the gaps- why not just jump over the very top? By drawing  a rectangle with 800 by 50 will cover the gap and by changing it to a colour differing to the background, a roof is created and the illusion that the player is traveling down a tunnel is returned.

The roof rectangle will only be used by the gameCode() function, so we can declare it at the top of that:
```
var roof = game.add.graphics(0, 0);
```
This allows us to use the graphics drawing part of the Phaser library. Then we need to give it a colour and some points to move to:
```
graphics.beginFill(0xBADA22);
    graphics.moveTo(0,0);
    graphics.lineTo(800, 0);
    graphics.lineTo(800, 50);
    graphics.lineTo(0, 50);
    graphics.lineTo(0, 0);
    graphics.endFill();
```
graphics.beginFill(colour) tells the program we are about to draw a shape and that we want it filled with the colour given. `graphics.moveto(x,y)` moves the "pen" to a position, in this case the top left corner, but doesn't draw anything. `graphics.lineTo(x,y)` draws a line between where the pen was and the position given. `graphics.endFill();` ends the drawing and fills in the shape.Thats it!

Lives system
---------------------
##### Its a-live!(or three)
For the lives system, first declare a variable `lives` at the top of the program to keep track of the number of lives the player has.To make it easier for the player we are going to give them a few seconds of invincibility when they lose a life, so that they can get back into the "rhythm" of the game, so also declare a variable called deathDelay as well.The number of lives and the deathDelay needs to be reset at the beginning of each game, so add `lives=3` and `deathDelay=false` to the top of `function create()`. Create a new function `resetDelay()` and add `deathDelay=false` to the top of that as well. this will allow us to reset the delay in a similar way to how the click handlers worked. Then add `deathDelay=false`to the top of `function gameOver()` for cases where the player crosses the top or bottom boundary while invincible.

Next a new function is needed for lowering the lives left by one and should look like this:
```
function loseLife(){
    if (deathDelay==false){
    lives=lives-1
    deathDelay=true
    game.time.events.add(Phaser.Timer.SECOND * 3, resetDelay, this);
    }
```
The entire contents of this function is placed in an if statement that checks the deathDelay variable, so that a life is only lost if the player isn't invincible, and then removes a life. The last line is similar to something you met when creating the pipes, a timed event. That event was looped, and so began `game.time.events.loop`. we only want the delay to happen once after each death, so  `game.time.events.add();`
is used instead. To complete this, in `function overlap` change where we call gameOver() to loselife(), so the function is:
```
function overlap(){
    game.physics.arcade
                .overlap(player,    
                 pipes,    
                 loseLife);
```

The last function needed for your lives system is one that checks if there are zero lives left, and if so ends the game. this function will be extended later, but for now only needs to be:
```
function lifeCheck(){
  if(lives==0){
      Heart1.visible=false
      Heart2.visible=false
      Heart3.visible=false
      gameOver()}
   }
```  
The only place where the number of lives changes is during the loseLife() function, so after the if statement add `lifeCheck()` to this function When you run the program you will notice that the game doesn't end after hitting a pipe, but will if you hit 3.   
