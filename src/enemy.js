'use strict';
function Enemy (canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 25;
  this.width = 25;
  this.height = 45;
  this.x = x; // random width position
  this.y = 0 + this.size;
  this.speed = speed;
  this.type = "bad";
};

Enemy.prototype.draw = function() {
  this.img = new Image(); 
  this.img.src = "./img/bottle.png";
  // fillRect(x, y, width, height)
  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Enemy.prototype.updatePosition = function() {
  this.y = this.y + this.speed;
};

Enemy.prototype.isInsideScreen = function() {
  return this.y + this.size / 2 > 0;  
};