'use strict';
function Superfood (canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 30;
  this.x = x; // random width position
  this.y = 0 + this.size;
  this.speed = speed;
}
Superfood.prototype.draw = function() {
  this.ctx.fillStyle = 'red';
  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}
Superfood.prototype.updatePosition = function() {
  this.y = this.y + this.speed;
}
Superfood.prototype.isInsideScreen = function() {
  return this.y + this.size / 2 > 0;  
}