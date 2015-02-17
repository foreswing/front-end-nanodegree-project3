// Define Global Variables

// This set of variables is self-explanatory

var ENEMY_COLUMN_START = -100;
var ENEMY_ROW1_START = 63;
var ENEMY_ROW2_START = 146;
var ENEMY_ROW3_START = 229;
var rowStart = [ENEMY_ROW1_START, ENEMY_ROW2_START, ENEMY_ROW3_START];
var enemyMinSpeed = 250;
var enemyMaxSpeed = 550;
var collision = false;
var winGame = false;
var lose = false;

// These three variables are used when we pause the game upon either a
// collision or a win.  There are approximately 60 frames per second so
// we will set endPauseFrameCount to frameCount + 180 later on to provide
// a 3 second pause on a collision or a win.  The frameCount variable is 
// incremented in Engine.js in the (main) function.

var frameCount = 0;
var pauseFrameCount = false;
var endPauseFrameCount = 0;

// Define Random Number Function --- used to establish each enemy's speed

function getRandomNumber(min, max){
    return Math.random() * (max-min) + min;
}

// Enemies our player must avoid --- include variables applicable to each enemy instance

var Enemy = function(x,y) {

    this.x = x;
    this.y = y; 
    this.speed = getRandomNumber(enemyMinSpeed, enemyMaxSpeed) - 100;

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {

// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

// If our enemy moves the end of the canvas, start him over on the other side
// with a new randomly generated speed and in a randomly generated row
// Otherwise, move the enemy from left to right at the randomly generated speed
// and call a function to check for collisions with the player

    if (this.x >= ctx.canvas.width) {
        this.x = -100;
        this.y = rowStart[(Math.floor(Math.random() * rowStart.length))];
        this.speed = getRandomNumber(enemyMinSpeed, enemyMaxSpeed) - 100;
    } else {
          this.x += this.speed * dt;
          Enemy.prototype.CollisionCheck();
    }
}

// Function to check to see if any of our enemies has collided with our player

Enemy.prototype.CollisionCheck = function () {
    for (i in allEnemies) {        
        if (player.x > (allEnemies[i].x-60) && player.x < (allEnemies[i].x + 60))   {
            if (player.y >= (allEnemies[i].y +10) && player.y <= (allEnemies[i].y + 55)) {
                collision = true;
                lose = true;
                endPauseFrameCount = frameCount + 180;
            }
        }
    }
}

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 }

// Our player definition

var Player = function (x,y) {
    
    this.sprite = 'images/char-boy.png';
    this.startX = 203;
    this.startY = 405;
    this.x = x;
    this.y = y;
}

// Handle player movement based on keyboard input

Player.prototype.handleInput = function(key) {

    var X = this.x;
    var Y = this.y;

    if (key === 'left') {
        X -= 101;
    }

    if (key === 'up') {
        Y -= 83;
    }

    if (key === 'right') {
        X += 101;
    }

    if (key === 'down') {
        Y += 83;
    }

// Only move our player by setting this.x to the new X value if the player is
// still within the canvas boundaries ... boundaries derived based on trial & error

    if (X > 0 && X < (ctx.canvas.width - 80)) {
        this.x = X;
    }

    if (Y > -50 && Y < (ctx.canvas.height - 125)) {
        this.y = Y;
    }

// Check to see if our player has made it safely to the water and if so, go execute win game
// functionality by setting variables accordingly.  We set the endPauseFrameCount to enable a 
// 3 second pause when the player wins

     if (Y < -9) {
        winGame = true;
        endPauseFrameCount = frameCount + 180;
        Y += 60;
        this.y = Y;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Player.prototype.update = function(dt) {

}

// Draw the player on the screen, required method for game.
// We'll draw a different player if we've lost based on a collision
// or won based on getting to the water.  For both a win or a loss, we'll
// execute the resetGameCheck function to pause and reset all of our variables.

Player.prototype.render = function() {

    if (! lose && ! winGame){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    if (lose) {
        pauseFrameCount = true;
        ctx.drawImage(Resources.get('images/char-boyLose.jpg'), this.x, this.y);
        resetGameCheck();       
    }

    if (winGame) {
        pauseFrameCount = true;
        ctx.drawImage(Resources.get('images/char-boyWin.jpg'), this.x, this.y);
        resetGameCheck();  
    }
}

// Instantiate the player object

var player =  new Player(203, 405);

// Instantiate all enemy objects and place in an array called allEnemies

var enemy1 = new Enemy(ENEMY_COLUMN_START, ENEMY_ROW1_START);
var enemy2 = new Enemy(ENEMY_COLUMN_START, ENEMY_ROW2_START);
var enemy3 = new Enemy(ENEMY_COLUMN_START, ENEMY_ROW3_START);

var allEnemies = [enemy1, enemy2, enemy3];

// If we've paused our game due to either a win or a loss, this is where we pause for 
// 3 seconds (180 frames) and then reset all of our player and enemy variables to start
// a new game.

function resetGameCheck() {

    // ms += new Date().getTime();
    // while (new Date() < ms) {};

    if (pauseFrameCount) {
        if (frameCount > endPauseFrameCount) {
            pauseFrameCount = false;
            collision = false;
            lose = false;
            winGame = false;
            player.x = player.startX;
            player.y = player.startY;

            while (allEnemies.length > 3) {    
                allEnemies.pop();
            } 
        }
    }
}

// This is where we listen for the keypress event and call our function to move our player
// as long as we haven't had a collision (lost the game) or made it to the water (won the game).

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (! lose && ! winGame){
        player.handleInput(allowedKeys[e.keyCode]);
    }
});