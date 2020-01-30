'use strict';

function Turtle(canvas, lives) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.lives = lives;
  this.size = 150;
  this.width = 150;
  this.height = 150;
  this.x = canvas.width / 2;
  this.y = canvas.height - 140;
  this.direction = 0;
  this.speed = 3;
  this.collision = false;
}

Turtle.prototype.setDirection = function(direction) {
    // +1 down  -1 up
    if (direction === "left") this.direction = -1;
    else if (direction === "right") this.direction = 1;
    //else if (direction === "stop") this.direction = 0;
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
      
      this.collision = enemy.type;

      setTimeout(
        function() {
          // this.collisionType = enemy.type
          this.collision = false;
        }.bind(this),
        400
      );

      return true;
    }
      return false;
  };

  /* REDUNDANCY???????
  Turtle.prototype.didCollide = function(food) {
    var playerLeft = this.x;
    var playerRight = this.x + this.size;
    var playerTop = this.y;
    var playerBottom = this.y + this.size;
  
    var foodLeft = food.x;
    var foodRight = food.x + food.size;
    var foodTop = food.y;
    var foodBottom = food.y + food.size;
  
    // Check if the food intersects any of the player's sides
    var crossLeft = foodLeft <= playerRight && foodLeft >= playerLeft;
    var crossRight = foodRight >= playerLeft && foodRight <= playerRight;
    var crossBottom = foodBottom >= playerTop && foodBottom <= playerBottom;
    var crossTop = foodTop <= playerBottom && foodTop >= playerTop;
  
    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    }
    return false;
  };

  */

Turtle.prototype.handleScreenCollision = function() {
    //this.updatePosition();
    this.x = this.x + this.direction * this.speed;

    var screenLeft = 0;
    var screenRight = this.canvas.width;
  
    if (this.x + this.size > screenRight) this.direction = -1;
    else if (this.x < screenLeft) this.direction = 1;
  };

  Turtle.prototype.removeLife = function() {
    this.lives -= 1;
};

Turtle.prototype.draw = function() {
    this.img = new Image();
    this.img.src = "./img/turtle.png";
    
    this.turtleRight = "./img/turtleright.png";
    this.turtleLeft = "./img/turtleleft.png";
    this.turtlerRubbishRight = "./img/turtlerubbishright.png";
    this.turtleRubbishLeft = "./img/turtlerubbishleft.png";
    this.turtleFoodRight = "./img/turtlefoodright.png";
    this.turtleFoodLeft = "./img/turtlefoodleft.png";

    if (this.collision === "bad" && this.direction === 1) {
      this.img.src = this.turtlerRubbishRight;
    } else if (this.collision === "bad" && this.direction === -1) {
      this.img.src = this.turtleRubbishLeft;
    } else if (this.collision === "good" && this.direction === 1) {
      this.img.src = this.turtleFoodRight;
    } else if (this.collision === "good" && this.direction === -1) {
      this.img.src = this.turtleFoodLeft; 
    } else if (this.direction === -1 && this.collision === false) {
        this.img.src = this.turtleLeft;
      } else if (this.direction === 1 && this.collision === false) {
        this.img.src = this.turtleRight;
      }
    
    
    // this.ctx.fillStyle = "green";
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // fillRect(x, y, width, height)
    // this.ctx.fillRect(this.x, this.y, this.size, this.size);
  };