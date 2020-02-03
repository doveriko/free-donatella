'use strict';
class Food {
  constructor(canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 20;
  this.width = 20;
  this.height = 40;
  this.x = x; // random width position
  this.y = 0 + this.size;
  this.speed = speed;
  this.type = "good";
  };

  draw() {
    this.img = new Image(); 
    this.img.src = "./img/gamba.png";
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  updatePosition() {
    this.y = this.y + this.speed;
  };

  isInsideScreen() {
    return this.y + this.size / 2 > 0;  
  };

}