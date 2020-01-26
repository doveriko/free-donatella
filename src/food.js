'use strict';
function Food (canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 20;
  this.x = x; // random width position
  this.y = this.canvas.height + this.size;
  this.speed = speed;
}
Food.prototype.draw = function() {
  this.ctx.fillStyle = 'green';
  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}
Food.prototype.updatePosition = function() {
  this.y = this.y - this.speed;
}
Food.prototype.isInsideScreen = function() {
  return this.y + this.size / 2 > 0;  
}