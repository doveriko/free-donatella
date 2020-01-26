'use strict';

function Game() {
  this.canvas = null;
  this.ctx = null;
  this.rubbish = [];
  this.food = [];
  this.turtle = null;
  this.gameIsOver = false;
  this.gameScreen = null;
  this.score = 0;
}


// Create `ctx`, a `turtle` and start the Canvas loop
Game.prototype.start = function() {
    console.log('in game starts'); //Test
    // Save reference to canvas and container. Create ctx
    this.canvasContainer = document.querySelector('.canvas-container');
    this.canvas = this.gameScreen.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
  
    // Save reference to the score and lives elements
    this.livesElement = this.gameScreen.querySelector('.lives .value');
    this.scoreElement = this.gameScreen.querySelector('.score .value');
  
    // Set the canvas dimensions to match the parent
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute('width', this.containerWidth);
    this.canvas.setAttribute('height', this.containerHeight);
  
  
    // Create a new turtle for the current game
    this.turtle = new Turtle(this.canvas, 3, 100);
  
      // Add keydown event listeners
    this.handleKeyDown = function(event) {
    if (event.key === "ArrowRight") {
      this.turtle.setDirection("right");
    } else if (event.key === "ArrowLeft") {
      this.turtle.setDirection("left");
    }
  };
      
    // Add event listener for moving the turtle
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    // document.body.addEventListener
      
    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  };

  Game.prototype.startLoop = function() {
    var loop = function() {
      // 1. UPDATE THE STATE (game, turtle, enemy)
  
      // 0. turtle was created already
  
      // 1. Create rubbish randomly
  
      this.score++;
      this.scoreElement.innerHTML = this.score;
  
      if (Math.random() > 0.98) {
        var randomX = this.canvas.width * Math.random();
        var newRubbish = new Rubbish(this.canvas, randomX, 6);
        var newFood = new Food(this.canvas, randomX, 5);

        this.rubbish.push(newRubbish);
        this.food.push(newFood);
      }
  
      // 2. Check if the turtle had collisions with rubbish (check all of the rubbish)
      this.checkCollisions();
  
      // 3. Update the turtle and check if he is colliding the screen
      this.turtle.handleScreenCollision();
  
      // 4. Update the existing rubbish (move them)
      // 5. Check if the rubbish our out of the screen
      // [x, x, x ,x ]
  
      this.rubbish = this.rubbish.filter(function(enemy) {
        enemy.updatePosition(); // 4
        return enemy.isInsideScreen(); // 5
      });
  
      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      // 3. UPDATE THE CANVAS (DRAW)
      // 1. Draw the turtle
      this.turtle.draw();
  
      // 2. Draw all of the rubbish
      this.rubbish.forEach(function(enemy) {
        enemy.draw();
      });
  
      // 4. TERMINATE THE LOOP IF THE GAME IS OVER
      if (!this.gameIsOver) {
        requestAnimationFrame(loop);
        
      }
    }.bind(this);
  
    // Alternative: windows.requestAnimationFrame(loop);
    loop();
  };

  Game.prototype.gameOver = function() {
    this.gameIsOver = true;
    console.log('GAME OVER'); // Test
    this.startOver(); //  the callback function ( gameOver ) passed from main()
  };

Game.prototype.checkCollisions = function() {
  
    this.rubbish.forEach( function(enemy) {
      
      // We will implement didCollide() in the next step
      if ( this.turtle.didCollide(enemy) ) {
  
        this.turtle.removeLife();
        console.log('lives', this.turtle.lives);
        
        // Move the enemy off screen to the left
        enemy.y = 0 - enemy.size;
  
        if (this.turtle.lives === 0) {
          this.gameOver();
        }
      }
    }, this);
    // We have to pass `this` value as the second argument
    // as array method callbacks have a default `this` of undefined.
  };
  

  Game.prototype.passGameOverCallback = function(gameOverFunc) {
    this.startOver = gameOverFunc;
  };
  
/* Not suposed to need these ones:
Game.prototype.updateGameStats = function() {};
Game.prototype.removeGameScreen = function() {};
*/