// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);
var score;
var pipes = [];
var player;
var labelScore;
var score=0
var start
var clicked =false
function changeScore() {
	score = score + 1;
	labelScore.setText(score.toString());

}
function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
}
function preload() {
    game.load.image("playerImg", "square.png");
    game.load.audio("score", "point.ogg");
    game.load.image("pipe","pipe.png");
	game.load.image("start","start.png");
}
function clickHandler(){
    clicked=true;
    start.destroy();
        gameCode();
}
function generatePipe() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count <8; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(750, count * 50);
        }
    }
changeScore();

}

 function playerJump() {
	 player.body.velocity.y = -200;
}

function create(){
	game.stage.setBackgroundColor("#A3D3A3");
	start = game.add.sprite(250, 150, "start");
	start.inputEnabled=true;
	clicked=false
	start.events.onInputDown.add(clickHandler,this);
}

function gameCode(){
      game.physics.startSystem(Phaser.Physics.ARCADE);
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

function update() {
	if (clicked==true){
    if(player.world.y<0 ||player.world.y>350 ){gameOver()}

      game.physics.arcade
                .overlap(player,
                 pipes,
                 gameOver);
}
}
function gameOver(){
    game.state.restart()
}
