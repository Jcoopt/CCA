// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 450, Phaser.AUTO, 'game', stateActions);
var score;
var pipes = [];
var player;
var start;
var end;
var labelScore;
var ClickCheck;
var lives;
var Heart1;
var Heart2;
var Heart3;
var deathDelay;

ClickCheck=0;
score=0;
lives=3;
//lastScore="0"
deathDelay=0;
function changeScore() {
	if(ClickCheck==1){
	score = score + 1;
	labelScore.setText(score.toString());
	if(score%6==0){lives=3;
	    LifeCheck();
	}
	}
}
function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
}
function preload() {
    game.load.image("playerImg", "square,png");
    game.load.audio("score", "point.ogg");
    game.load.image("pipe","pipe.png");
    game.load.image("start","start.png");
    game.load.image("Restart","restart.png");
    game.load.image("Heart","Heart.gif");

}


function generatePipe() {

    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count <8; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(750, 50+count * 50);
        }
    }
changeScore();

}

 function playerJump() {
    player.body.velocity.y = -200;
}
function GameCode(){
    var graphics = game.add.graphics(0, 00);
    graphics.beginFill(0xBADA22);
    graphics.moveTo(0,0);
    graphics.lineTo(800, 0);
    graphics.lineTo(800, 50);
    graphics.lineTo(0, 50);
    graphics.lineTo(0, 0);
    graphics.endFill();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.setBackgroundColor("#A3D3A3");
   // game.add.text(20, 20, "Welcome to my game",
  //  {font: "30px Arial", fill: "#FFFFFF"});
    Heart1=game.add.sprite(600, 20, "Heart");
    Heart2=game.add.sprite(615, 20, "Heart");
    Heart3=game.add.sprite(630, 20, "Heart");

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
  // labelLives= game.add.text(100, 20, "0");
  // labelLives.setText("last score was "+ lastScore)
   ClickCheck=0
   score=0
   lives=3;
   deathDelay=false;
    game.stage.setBackgroundColor("#A3D3A3");
    start = game.add.sprite(250, 150, "start");
    start.inputEnabled=true;

    start.events.onInputDown.add(Clicked,this);
    }


function Clicked(){
    ClickCheck=1;
    start.destroy();
        GameCode();
}
function update() {
  //ClickCheck=0
 // Heart1.bringToTop()
  if (ClickCheck==1){
    // labelLives.setText(lives.toString());
    if(player.world.y<50||player.world.y>430 ){gameOver()}

    overlap()

}
}
function overlap(){
    game.physics.arcade
                .overlap(player,
                 pipes,
                 LoseLife);
}
function resetDelay(){
    deathDelay=false
}
function LoseLife(){
    if (deathDelay==false){
    lives=lives-1
    deathDelay=true
    game.time.events.add(Phaser.Timer.SECOND * 3, resetDelay, this);
    }LifeCheck()
}
function LifeCheck(){

    if(lives==3){
     Heart1.visible=true
     Heart2.visible=true
     Heart3.visible=true

 }
  if(lives==2){
    Heart1.visible=false
     Heart2.visible=true
     Heart3.visible=true
 }
  if(lives==1){
    Heart1.visible=false
     Heart2.visible=false
     Heart3.visible=true
 }
 else if(lives==0){
      Heart1.visible=false
     Heart2.visible=false
     Heart3.visible=false
     gameOver()

 }
}
function restart(){
       game.state.restart()
}
function gameOver(){
   ClickCheck=0;
   //score=0;
    deathDelay=false
    end = game.add.sprite(250, 150, "Restart");
    end.inputEnabled=true;
    end.events.onInputDown.add(restart,this)

}
