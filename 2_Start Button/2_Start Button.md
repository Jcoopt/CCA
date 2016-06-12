Getting things started right
============================
When you load up your game it will at the moment jump straight into running the game. If you're not ready for this, you may end up losing quite quickly! to rectify this we are going to add a start screen.

The start screen will be the first thing the player should see, and so we need to edit `function create()` so it sets up the start screen, and have the game loaded when the player is ready. Create a new function for for all your game code :
```
function gameCode(){

  }`
```
Then move over all of your code from `function create()` except `game.stage.setBackgroundColor("#A3D3A3")`(your colour code maybe different), as we still need to give the background of your loading screen a colour. If you really wanted you could have this line in both  `function create()` and `function gameCode()` but with a different colour code in each, making the two look slightly more distinctive, but this isn't necessary . Your final code should look a little like this:
```
function GameCode(){
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.setBackgroundColor("#A3D3A3");
      labelScore = game.add.text(20, 20, "0");
      game.input.keyboard
          .addKey(Phaser.Keyboard.SPACEBAR)
          .onDown.add(playerJump);
      generatePipe();
      player = game.add.sprite(80, 200, "playerImg");
      game.physics.arcade.enable(player);
      player.body.gravity.y = 200;
      var pipeInterval = 1.75;
      game.time.events
          .loop(pipeInterval * Phaser.Timer.SECOND,
      generatePipe);
}

function create() {
      game.stage.setBackgroundColor("#A3D3A3");
    }
```
Adding the button
---------------
If you were to to running this at this point it would be a little boring, as the game will never load, so we need to add a button. An easy way to do this is using sprites. Pick an image to represent your button (a quick Google should reveal a decent number of these) or make your own ,and add it to your assets .If you can, give it a sensible name for example "start.png" ;this will make it easier to remember what it is. Then you need to load it as you did with the over sprites- add `var start` at the top of your program with the rest of the variables, and add at the bottom of `function preload()` the line `game.load.image("start","start.png");`

Now you've loaded the image, go back to `function create() `and add the following:
```

start = game.add.sprite(250, 150, "start");
start.inputEnabled=true;
```
You should be able to guess what these two lines do. The first adds the start button image as a sprite to the centre of the game, similar to what you did with the player and pipe sprites. The second line makes interacting with the restart sprite something something that does something - allowing us for example to run a function if you click on it. Before you do this we need a click handler which you covered before with adding sprites to the game where you click and also a variable to keep track of whether or not it has been clicked, so `function update()` knows that the button has been clicked and the game has begun. This is because if you try to update the game but it hasn't actually started yet, things tend to break. Add the variable first by adding at the top of your code where you've declared the rest of your variable the line ` var clicked =false`

Next we need our click handler, `function clicked()`. it should look a little like this:
```
function Clicked(){
    clicked=true;
    start.destroy();
        gameCode();
}
```
This sets our clicked tracker to true, as the sprite has indeed been clicked. It then destroys the start button (as it isn't needed anymore and will only get in the way) and starts the game. `function update()` also needs to be changed so that it only updates the game once it has been started. As `clicked` will be `true` when the game is started, you can use this and an if statement:
```
function update() {
  if (clicked==true){
  if(player.world.y<0 ||player.world.y>350 ){gameOver()}

    game.physics.arcade
              .overlap(player,
               pipes,
               gameOver;

}
}
```
Finally, go back to `function create()` and underneath the line  `start.inputEnabled= true` add :
```
clicked=false
start.events.onInputDown.add(clicked,this);
    }
```
Now when you click on the start button it will run the clicked function, and ultimately the game itself.
