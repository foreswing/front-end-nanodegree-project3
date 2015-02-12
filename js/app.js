// Define Global Variables

colStart = -100;
row1 = 63;
row2 = 146;
row3 = 229;
rowStart = [row1, row2, row3];
enemyMinSpeed = 250;
enemyMaxSpeed = 550;
collision = false;
win = false;

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
// and call function to check for collisions with the player

    if (this.x >= ctx.canvas.width) {
        this.x = -100;
        this.y = rowStart[(Math.floor(Math.random() * rowStart.length))];
        this.speed = getRandomNumber(enemyMinSpeed, enemyMaxSpeed) - 100;
    } else {
          this.x += this.speed * dt;
          Enemy.prototype.CollisionCheck();
    }
}

// Check to see if any of our enemies has collided with our player

Enemy.prototype.CollisionCheck = function () {
    for (i in allEnemies) {        
        if (player.x > (allEnemies[i].x-60) && player.x < (allEnemies[i].x + 60))   {
            if (player.y >= (allEnemies[i].y +10) && player.y <= (allEnemies[i].y + 55)) {
                collision = true;
                pauseResetGame(collision, 3000);
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
        console.log(Y);
    }
    if (key === 'right') {
        X += 101;
    }
    if (key === 'down') {
        Y += 83;
        // console.log(Y);
    }
    if (X > 0 && X < (ctx.canvas.width - 80)) {
        this.x = X;
    }
    if (Y > -50 && Y < (ctx.canvas.height - 125)) {
        this.y = Y;
    }
}

// function checkForWin(y) {
//     console.log(y);
//     if (y < -9) {
//         player.render();
//         collision = false;
//         console.log("I'm going to reset game because of a win")
//         pauseResetGame(collision, 1000);
//     }
// }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Player.prototype.update = function(dt) {

// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

    this.x * dt; 
    this.y * dt;

    if (collision) {
        console.log("Oh Man");
        ctx.fillStyle = "black";
        ctx.font = "bold 30px Calibri";
        ctx.fillText(" Oh Man ", 300, 300);
    } else {
        // console.log("Winner, Winner - Chicken Dinner");
    }
}

// Draw the player on the screen, required method for game
// and check to see if we have won the game by getting to the water
// We'll pause, display a message and reset the game if we've won

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y === -10) {
        win = true;
        console.log("I'm going to reset game because of a win");
        this.sprite = 'images/char-cat-girl.png';
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        pauseResetGame(collision, 3000);
    }
}

// Instantiate the player object

var player =  new Player(203, 405);

// Instantiate all enemy objects and place in an array called allEnemies

var enemy1 = new Enemy(colStart, row1);
var enemy2 = new Enemy(colStart, row2);
var enemy3 = new Enemy(colStart, row3);

var allEnemies = [enemy1, enemy2, enemy3];

// Upon a win or a collision pause to display message and then reset game

function pauseResetGame(collision, ms) {
    
    // if (collision) {
    //     console.log("Oh Man");
    //     ctx.fillStyle = "black";
    //     ctx.font = "bold 30px Calibri";
    //     ctx.fillText(" Oh Man ", 300, 300);
    // } else {
    //     // console.log("Winner, Winner - Chicken Dinner");
    // }

    ms += new Date().getTime();
    while (new Date() < ms) { }
    collision = false;
    win = false;
    player.x = player.startX;
    player.y = player.startY;

    while (allEnemies.length > 3) {    
        allEnemies.pop(); 
    } 
} 

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