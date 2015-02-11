// Global Variables
row1 = 63;
row2 = 146;
row3 = 229;
rowStart = [row1, row2, row3];
enemyMinSpeed = 150;
enemyMaxSpeed = 400;
// Enemies our player must avoid

function getRandomNumber(min, max){
    return Math.random() * (max-min) + min;
}

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y; 
    this.speed = getRandomNumber(enemyMinSpeed, enemyMaxSpeed) - 100;
    // this.speed = enemySpeeds[(Math.floor(Math.random() * enemySpeeds.length))] - 100;
    this.sprite = 'images/enemy-bug.png';
    // this.x = (Math.random() * 500) * 1000;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    


// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

    if (this.x >= ctx.canvas.width) {
       // this.x = -(Math.round(Math.random()*500));
        this.x = -100;
        this.y = rowStart[(Math.floor(Math.random() * rowStart.length))];
    } else {
        // this.x += Math.round(Math.random() * 500) * dt;
        // this.x += Math.round(Math.random() * 400) * dt;
        this.x += this.speed * dt;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function (x,y) {
    
    this.sprite = 'images/char-boy.png';
    this.startX = 203;
    this.startY = 405;
    this.x = x;
    this.y = y;
}

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
    if (X > 0 && X < (ctx.canvas.width - 80)) {
      this.x = X;
    }
    if (Y > -50 && Y < (ctx.canvas.height - 125)) {
      this.y = Y;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}


Player.prototype.render = function() {
    console.log(this.sprite, this.x, this.y);    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player =  new Player(203, 405);

var enemy = new Enemy(-100, row1);
var enemy2 = new Enemy(-100, row2);
var enemy3 = new Enemy(-100, row3);

var allEnemies = [enemy, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
