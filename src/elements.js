"use strict";
class Elements {
  constructor(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x; // random width position
    this.speed = speed;
  }

  updatePosition() {
    this.y = this.y + this.speed;
  }

  isInsideScreen() {
    return this.y + this.size / 2 > 0;
  }
}

class Food extends Elements {
  constructor(canvas, x, speed) {
    super(canvas, x, speed);
    this.size = 20;
    this.width = 20;
    this.height = 40;
    this.y = 0 + this.size;
    this.type = "good";
  }

  draw() {
    this.img = new Image();
    this.img.src = "./img/gamba.png";
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Superfood extends Elements {
  constructor(canvas, x, speed) {
    super(canvas, x, speed);
    this.size = 20;
    this.width = 20;
    this.height = 37;
    this.y = 0 + this.size;
    this.type = "good";
  }

  draw() {
    this.img = new Image();
    this.img.src = "./img/jelly.png";
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Enemy extends Elements {
  constructor(canvas, x, speed) {
    super(canvas, x, speed);
    this.size = 25;
    this.width = 25;
    this.height = 45;
    this.y = 0 + this.size;
    this.type = "bad";
  }

  draw() {
    this.img = new Image();
    this.img.src = "./img/bottle.png";
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Superenemy extends Elements {
  constructor(canvas, x, speed) {
    super(canvas, x, speed);
    this.size = 42;
    this.width = 42;
    this.height = 55;
    this.y = 0 + this.size;
    this.type = "bad";
  }
  draw() {
    this.img = new Image();
    this.img.src = "./img/toxic.png";
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
