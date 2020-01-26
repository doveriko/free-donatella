'use strict';

function Turtle(canvas, lives) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.lives = lives;
  this.size = 100;
  this.x = canvas.width / 2;
  this.y = 200;
  this.direction = 0;
  this.speed = 5;
}

Turtle.prototype.setDirection = function(direction) {
    // +1 down  -1 up
    if (direction === "left") this.direction = -1;
    else if (direction === "right") this.direction = 1;
    else if (direction === "stop") this.direction = 0;
  };

  Turtle.prototype.didCollide = function(enemy) {
    var playerLeft = this.x;
    var playerRight = this.x + this.size;
    var playerTop = this.y;
    var playerBottom = this.y + this.size;
  
    var enemyLeft = enemy.x;
    var enemyRight = enemy.x + enemy.size;
    var enemyTop = enemy.y;
    var enemyBottom = enemy.y + enemy.size;
  
    // Check if the enemy intersects any of the player's sides
    var crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;
      
    var crossRight = enemyRight >= playerLeft && enemyRight <= playerRight;
    
    var crossBottom = enemyBottom >= playerTop && enemyBottom <= playerBottom;
    
    var crossTop = enemyTop <= playerBottom && enemyTop >= playerTop;
  
    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    }
    return false;
  };

Turtle.prototype.handleScreenCollision = function() {
    this.updatePosition();
  
    var screenLeft = 0;
    var screenRight = this.canvas.width;
  
    if (this.x + this.size > screenRight) this.direction = -1;
    else if (this.x < screenLeft) this.direction = 1;
  };

  Turtle.prototype.removeLife = function() {
    this.lives -= 1;
};

Turtle.prototype.draw = function() {
    this.ctx.fillStyle = "lightblue";
  
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  };