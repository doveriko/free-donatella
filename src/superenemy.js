'use strict';
function Superenemy (canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 30;
  this.x = x; // random width position
  this.y = 0 + this.size;
  this.speed = speed;
};

Superenemy.prototype.draw = function() {
  this.ctx.fillStyle = 'black';
  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

Superenemy.prototype.updatePosition = function() {
  this.y = this.y + this.speed;
};

Superenemy.prototype.isInsideScreen = function() {
  return this.y + this.size / 2 > 0;  
};