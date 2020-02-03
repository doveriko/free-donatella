'use strict';
class Enemy {
  constructor (canvas, x, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 25;
  this.width = 25;
  this.height = 45;
  this.x = x; // random width position
  this.y = 0 + this.size;
  this.speed = speed;
  this.type = "bad";
  }

  draw() {
    this.img = new Image(); 
    this.img.src = "./img/bottle.png";
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  updatePosition() {
    this.y = this.y + this.speed;
  }

  isInsideScreen() {
    return this.y + this.size / 2 > 0;  
  }
}