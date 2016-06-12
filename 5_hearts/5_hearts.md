
Giving your game some heart: Implementing the visible Life counter
---------------------------

the player now has three lives, but no way of knowing correctly how many they have left. For that we are going to use a series of hearts.

Like the pipe blocks, for the hearts you are going to have 3 sprites of the same image. We wont be storing them in an array though, as there is only three of them. Find an image of a heart, and add it to your assets, then load it in preload, giving it a reference of "heart". Then add the three sprites inside of `function gameCode()`:
```
Heart1=game.add.sprite(600, 20, "Heart");
Heart2=game.add.sprite(615, 20, "Heart");
Heart3=game.add.sprite(630, 20, "Heart");

```
Each sprite is placed at the same height, but next to each other, and will all look the same. Next we need to edit `function lifeCheck()` to make the heart sprites appear and disappear. edit the function to look like so ,making sure that the each line is correct:

```
function lifeCheck(){
else if(lives==0){
    Heart1.visible=false
    Heart2.visible=false
    Heart3.visible=false
    gameOver()
  }
else if(lives==3){
    Heart1.visible=true
    Heart2.visible=true
    Heart3.visible=true

 }
  else if(lives==2){
    Heart1.visible=false
    Heart2.visible=true
    Heart3.visible=true
 }
  else if(lives==1){
    Heart1.visible=false
    Heart2.visible=false
    Heart3.visible=true
 }
 }
```
In this, `.visible` is known as a property of each sprite. Setting it to false makes the sprite invisible, setting it true makes it visible. When you run the program now, each time the player loses a life one of the the hearts dissapears, showing how many lives they have left.

Refilling the lives counter
================
So far the player has only been able to lose life which is better than instant death, but doesnt reward them for playing as long as possible. With only a handfull of lines, your game will be able to givce the player back some life after passing a certain number of pipes- you can make this number as small (making the game easier) or large (making it harder) as you want. simply add to the end of`function changeScore()`:

```
if(score%X==0){lives=3;
    LifeCheck();
}
```
X is the number of pipes they must pass through, and you can change it to whatever number you want (as long as it is a number). This is foolowed by a modulo function, that looks at the remainder of the division. if the score (the number of pipes passed) is a factor of X, then its remainder will be zero and the lives are refilled.
