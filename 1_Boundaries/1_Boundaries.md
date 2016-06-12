Adding Boundaries
=================
Now you've added the pipe overlap we have another end game situation to add: going off the edge of the screen. This is really simple, and requires only a single line of code.



Find your `function update()` and under the overlap code you added earlier (`game.physics.arcade.overlap(player, pipes, gameOver)`) add the following:
```
if(player.world.y<0 ||player.world.y>350 ){
  gameOver()
}
```
This uses an if statement, which you have used earlier for generating the pipe. It also uses a logical operation "OR", which in javascript looks like `||`. What this allows us to do is in one statement check to see if the player has gone of the top *OR* bottom of the screen, meaning less for us to write.
