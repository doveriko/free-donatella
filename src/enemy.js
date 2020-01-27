'use strict';
function Enemy (canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 20;
  this.x = x; // random width position
  this.y = 0 + this.size;
  this.speed = speed;
};

Enemy.prototype.draw = function() {
  this.ctx.fillStyle = 'grey';
  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

Enemy.prototype.updatePosition = function() {
  this.y = this.y + this.speed;
};

Enemy.prototype.isInsideScreen = function() {
  return this.y + this.size / 2 > 0;  
};