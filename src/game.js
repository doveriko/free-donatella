'use strict';

function Game() {
  this.canvas = null;
  this.ctx = null;
  this.enemy = [];
  this.food = [];
  this.superfood = [];
  this.superenemy = [];
  this.turtle = null;
  this.gameIsOver = false;
  this.gameScreen = null;
  this.score = 0;
  this.foodSFX = new Audio ("sfx/food.wav");
  this.rubbishSFX = new Audio ("sfx/rubbish.wav");
}

Game.prototype.start = function() {
    // Test -> console.log('Game start');
    // Save references to canvas and container. Create ctx
    this.canvasContainer = document.querySelector('.canvas-container');
    this.canvas = this.gameScreen.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
  
    // Save references to the score and lives elements
    this.livesElement = this.gameScreen.querySelector('.lives .value');
    this.scoreElement = this.gameScreen.querySelector('.score .value');
  
    // Set the canvas dimensions to match the parent
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute('width', this.containerWidth);
    this.canvas.setAttribute('height', this.containerHeight);
  
    // Create a new turtle for the current game
    this.turtle = new Turtle(this.canvas, 3); // 3 = Number of lives ("warnings")
  
    // Add keydown event listeners to create the movements of the turtle
    this.handleKeyDown = function(event) {
    if (event.key === "ArrowRight") {
      this.turtle.setDirection("right");
    } else if (event.key === "ArrowLeft") {
      this.turtle.setDirection("left");
    }
    };

    // Add event listener to move the turtle
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
      
    this.startLoop();
  };

Game.prototype.startLoop = function() {

  var loop = function() {
    // Push and update number of lives ("warnings") and points to the scoreboard
    this.scoreElement.innerHTML = this.score;
    this.livesElement.innerHTML = this.turtle.lives;

    // Generate plastic bottles and prawns
    if (Math.random() > 0.980) {
      var randomX1 = (this.canvas.width - 25) * Math.random();
      var randomX2 = (this.canvas.width - 20) * Math.random();

      var newEnemy = new Enemy(this.canvas, randomX1, 4);
      var newFood = new Food(this.canvas, randomX2, 2);
        this.enemy.push(newEnemy);
      this.food.push(newFood);
    }

    // Generate jelly fishes and toxic barrels 
    if (Math.random() > 0.992) {
      var randomX3 = (this.canvas.width - 20) * Math.random();
      var randomX4 = (this.canvas.width - 42) * Math.random();
      
      var newSuperfood = new Superfood(this.canvas, randomX3, 4);
      var newSuperenemy = new Superenemy(this.canvas, randomX4, 6);

      this.superfood.push(newSuperfood);
      this.superenemy.push(newSuperenemy);
    }

    // Check collisions between the turtle and the elements (enemies and food)
    this.checkCollisions();

    // Check collisions between the turtle and the borders of the screen
    this.turtle.handleScreenCollision();

    // Update the position of each element and check that they remain inside the screen
    this.enemy = this.enemy.filter(function(enemy) {
      enemy.updatePosition();
      return enemy.isInsideScreen();
    });

    this.food = this.food.filter(function(food) {
      food.updatePosition();
      return food.isInsideScreen();
    });

    this.superfood = this.superfood.filter(function(superfood) {
      superfood.updatePosition();
      return superfood.isInsideScreen();
    });

    this.superenemy = this.superenemy.filter(function(superenemy) {
      superenemy.updatePosition();
      return superenemy.isInsideScreen();
    });

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the turtle
    this.turtle.draw();

    // Draw enemies and food
    this.enemy.forEach(function(enemy) {
      enemy.draw();
    });

    this.food.forEach(function(food) {
      food.draw();
    });

    this.superfood.forEach(function(superfood) {
      superfood.draw();
    });

    this.superenemy.forEach(function(superenemy) {
      superenemy.draw();
    });

    // Terminate the loop if the game is over
    if (!this.gameIsOver) {
      requestAnimationFrame(loop);
      }
  }.bind(this);

  loop();
};

// To get the score updated
Game.prototype.getScore = function() {
    return this.score;
  }

// Callback functions to re-start the game
Game.prototype.gameOver = function() {
  this.gameIsOver = true;
  // Test -> console.log('GAME OVER');
  this.startOver(); 
};


Game.prototype.checkCollisions = function() {
  
    this.enemy.forEach( function(enemy) {
      
      if (this.turtle.didCollide(enemy) ) {
  
        // Sound effect when the turtle collides with rubbish
        if (this.turtle.lives > 0) {
          this.rubbishSFX.currentTime = 0;
          this.rubbishSFX.volume = 1;
          this.rubbishSFX.play();
        }
        else if (this.turtle.lives === 0) {
          this.gameOver(this.score);
        }

        this.turtle.removeLife();
        // Test -> console.log('lives', this.turtle.lives);
        
        // Move the enemy off screen
        enemy.y = 0 - enemy.size;
      }
    }, this);


    this.superenemy.forEach( function(superenemy) {
      
      if (this.turtle.didCollide(superenemy) ) {
  
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
        superenemy.y = 0 - superenemy.size;
      }
    }, this);


    this.food.forEach( function(food) {
      
      if (this.turtle.didCollide(food) ) {

        // Sound effect when the turtle collides with food
        this.foodSFX.currentTime = 0;
        this.foodSFX.volume = 1;
        this.foodSFX.play();

        // Move the food off screen
        food.y = 0 - food.size;

        this.score += 100;
      }
    }, this);

    this.superfood.forEach( function(superfood) {
      
      if (this.turtle.didCollide(superfood) ) {

        // Sound effect when the turtle collides with food
        this.foodSFX.currentTime = 0;
        this.foodSFX.volume = 1;
        this.foodSFX.play();
        // Move the superfood off screen
        superfood.y = 0 - superfood.size;
        this.score += 150;
      }
    }, this);
};
  

Game.prototype.passGameOverCallback = function(gameOverFunc) {
    this.startOver = gameOverFunc;
};