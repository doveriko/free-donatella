"use strict";

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.elements = [];
    this.turtle = null;
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
    this.foodSFX = new Audio("sfx/food.wav");
    this.rubbishSFX = new Audio("sfx/rubbish.wav");
  }

  start() {
    // Test -> console.log('Game start');
    // Save references to canvas and container. Create ctx
    this.canvasContainer = document.querySelector(".canvas-container");
    this.canvas = this.gameScreen.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Save references to the score and lives elements
    this.livesElement = this.gameScreen.querySelector(".lives .value");
    this.scoreElement = this.gameScreen.querySelector(".score .value");

    // Set the canvas dimensions to match the parent
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute("width", this.containerWidth);
    this.canvas.setAttribute("height", this.containerHeight);

    // Create a new turtle for the current game
    this.turtle = new Turtle(this.canvas, 3); // 3 = Number of lives ("warnings")

    // Add keydown event listeners
    this.handleKeyDown = event => {
      if (event.key === "ArrowRight") {
        this.turtle.setDirection("right");
      } else if (event.key === "ArrowLeft") {
        this.turtle.setDirection("left");
      }
    };

    // Add event listener for moving the turtle
    window.addEventListener("keydown", this.handleKeyDown);

    this.startLoop();
  }

  startLoop() {
    var loop = () => {
      // Push and update number of lives ("warnings") and points to the scoreboard
      this.scoreElement.innerHTML = this.score;
      this.livesElement.innerHTML = this.turtle.lives;

      // Generate plastic bottles and prawns
      if (Math.random() > 0.98) {
        var randomX1 = (this.canvas.width - 25) * Math.random();
        var randomX2 = (this.canvas.width - 20) * Math.random();

        var newEnemy = new Enemy(this.canvas, randomX1, 4);
        var newFood = new Food(this.canvas, randomX2, 2);

        this.elements.push(newEnemy, newFood);
      }

      // Generate jelly fishes and toxic barrels
      if (Math.random() > 0.992) {
        var randomX3 = (this.canvas.width - 20) * Math.random();
        var randomX4 = (this.canvas.width - 42) * Math.random();

        var newSuperfood = new Superfood(this.canvas, randomX3, 4);
        var newSuperenemy = new Superenemy(this.canvas, randomX4, 6);

        this.elements.push(newSuperfood, newSuperenemy);
      }

      // Check collisions between the turtle and the elements
      this.checkCollisions();

      // Check collisions between the turtle and the borders of the screen
      this.turtle.handleScreenCollision();

      // Update the position of each element and check that they remain inside the screen
      this.elements = this.elements.filter(element => {
        element.updatePosition();
        return element.isInsideScreen();
      });

      // Clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw the turtle
      this.turtle.draw();

      // Draw enemies and food
      this.elements.forEach(element => element.draw());

      // Terminate the loop if the game is over
      if (!this.gameIsOver) {
        requestAnimationFrame(loop);
      }
    };

    loop();
  }

  // To get the score updated
  getScore() {
    return this.score;
  }

  // Callback functions to re-start the game
  gameOver() {
    this.gameIsOver = true;
    // Test -> console.log('GAME OVER');
    this.startOver();
  }

  checkCollisions() {
    for (let i = 0; i < this.elements.length; i++) {
      switch (this.elements[i].__proto__.constructor.name) {

        case "Superfood":
          if (this.turtle.didCollide(this.elements[i])) {
            // Sound effect when the turtle collides with superfood
            this.foodSFX.currentTime = 0;
            this.foodSFX.volume = 1;
            this.foodSFX.play();

            // Move the superfood off screen
            this.elements[i].y = 0 - this.elements[i].size;

            this.score += 150;
          }

          break;

        case "Food":
          if (this.turtle.didCollide(this.elements[i])) {
            // Sound effect when the turtle collides with superfood
            this.foodSFX.currentTime = 0;
            this.foodSFX.volume = 1;
            this.foodSFX.play();

            // Move the superfood off screen
            this.elements[i].y = 0 - this.elements[i].size;

            this.score += 100;
          }

          break;

        case "Enemy":
        case "Superenemy":
          if (this.turtle.didCollide(this.elements[i])) {
            // Sound effect when the turtle collides with rubbish
            if (this.turtle.lives > 0) {
              this.rubbishSFX.currentTime = 0;
              this.rubbishSFX.volume = 1;
              this.rubbishSFX.play();
            } else if (this.turtle.lives === 0) {
              this.gameOver(this.score);
            }

            this.turtle.removeLife();
            // Test -> console.log('lives', this.turtle.lives);

            // Move the enemy off screen
            this.elements[i].y = 0 - this.elements[i].size;
          }

          break;
      }
    }
  }

  passGameOverCallback(gameOverFunc) {
    this.startOver = gameOverFunc;
  }
}
