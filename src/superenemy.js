'use strict';
function Superenemy (canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 42;
  this.width = 42;
  this.height = 55;
  this.x = x; // random width position
  this.y = 0 + this.size;
  this.speed = speed;
  this.type = "bad";
};

Superenemy.prototype.draw = function() {
    this.img = new Image(); 
    this.img.src = "./img/toxic.png";
    // fillRect(x, y, width, height)
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Superenemy.prototype.updatePosition = function() {
  this.y = this.y + this.speed;
};

Superenemy.prototype.isInsideScreen = function() {
  return this.y + this.size / 2 > 0;  
};