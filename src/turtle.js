'use strict';

class Turtle {
  constructor(canvas, lives) {
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

  setDirection(direction) {
      if (direction === "left") this.direction = -1;
      else if (direction === "right") this.direction = 1;
    };

  didCollide(element) {

    var playerLeft = this.x;
    var playerRight = this.x + this.size;
    var playerTop = this.y;
    var playerBottom = this.y + this.size;

    var elementLeft = element.x;
    var elementRight = element.x + element.size;
    var elementTop = element.y;
    var elementBottom = element.y + element.size;

    // Check if the element intersects any of the player's sides
    var crossLeft = elementLeft <= playerRight && elementLeft >= playerLeft;
    var crossRight = elementRight >= playerLeft && elementRight <= playerRight;
    var crossBottom = elementBottom >= playerTop && elementBottom <= playerBottom;
    var crossTop = elementTop <= playerBottom && elementTop >= playerTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      
      /* Associate the element's collisions to their type ("good" or "bad")
      to have a different effect in their interaction with the turtle */
      this.collision = element.type;

      /* Set the time (in milliseconds) we want the state of "collision = true" to last
      in order to change the image of the turtle provisionally when it collides */
      setTimeout(
        function() {
          this.collision = false;
        }.bind(this),
        400
      );

      return true;
    }
      return false;
  };

  handleScreenCollision() {

      this.x = this.x + this.direction * this.speed;

      var screenLeft = 0;
      var screenRight = this.canvas.width;
    
      if (this.x + this.size > screenRight) this.direction = -1;
      else if (this.x < screenLeft) this.direction = 1;
    };


    removeLife() {
      this.lives -= 1;
  };


  draw() {
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
      
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

}