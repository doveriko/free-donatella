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
  
      //this.score++;
      this.scoreElement.innerHTML = this.score;
      this.livesElement.innerHTML = this.turtle.lives;
  
      if (Math.random() > 0.98) {
        var randomX1 = this.canvas.width * Math.random();
        var randomX2 = this.canvas.width * Math.random();
  
        var newEnemy = new Enemy(this.canvas, randomX1, 6);
        var newFood = new Food(this.canvas, randomX2, 5);

        this.enemy.push(newEnemy);
        this.food.push(newFood);
      }

      if (Math.random() > 0.99) {
        var randomX3 = this.canvas.width * Math.random();
        var randomX4 = this.canvas.width * Math.random();
        
        var newSuperfood = new Superfood(this.canvas, randomX3, 7);
        var newSuperenemy = new Superenemy(this.canvas, randomX4, 7);

        this.superfood.push(newSuperfood);
        this.superenemy.push(newSuperenemy);
      }
  
      // 2. Check if the turtle had collisions with rubbish (check all of the rubbish)
      this.checkCollisions();
  
      // 3. Update the turtle and check if he is colliding the screen
      this.turtle.handleScreenCollision();
  
      // 4. Update the existing rubbish (move them)
      // 5. Check if the rubbish our out of the screen
      // [x, x, x ,x ]
  
      this.enemy = this.enemy.filter(function(enemy) {
        enemy.updatePosition(); // 4
        return enemy.isInsideScreen(); // 5
      });

      this.food = this.food.filter(function(food) {
        food.updatePosition(); // 4
        return food.isInsideScreen(); // 5
      });

      this.superfood = this.superfood.filter(function(superfood) {
        superfood.updatePosition(); // 4
        return superfood.isInsideScreen(); // 5
      });

      this.superenemy = this.superenemy.filter(function(superenemy) {
        superenemy.updatePosition(); // 4
        return superenemy.isInsideScreen(); // 5
      });
  
      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      // 3. UPDATE THE CANVAS (DRAW)
      // 1. Draw the turtle
      this.turtle.draw();
  
      // 2. Draw all of the rubbish
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
  
      // 4. TERMINATE THE LOOP IF THE GAME IS OVER
      if (!this.gameIsOver) {
        requestAnimationFrame(loop);
        
      }
    }.bind(this);
  
    // Alternative: windows.requestAnimationFrame(loop);
    loop();
  };

  Game.prototype.getScore = function() {
    return this.score;
  }

  Game.prototype.gameOver = function() {
    this.gameIsOver = true;
    console.log('GAME OVER'); // Test
    this.startOver(); //  the callback function ( gameOver ) passed from main()
  };

Game.prototype.checkCollisions = function() {
  
    this.enemy.forEach( function(enemy) {
      
      // We will implement didCollide() in the next step
      if ( this.turtle.didCollide(enemy) ) {
  
        this.turtle.removeLife();
        console.log('lives', this.turtle.lives);
        
        // Move the enemy off screen to the left
        enemy.y = 0 - enemy.size;
  
        if (this.turtle.lives === 0) {
          this.gameOver(this.score);
        }
      }
    }, this);

    this.superenemy.forEach( function(superenemy) {
      
      // We will implement didCollide() in the next step
      if ( this.turtle.didCollide(superenemy) ) {
  
        this.turtle.removeLife();
        console.log('lives', this.turtle.lives);
        
        // Move the enemy off screen to the left
        superenemy.y = 0 - superenemy.size;
  
        if (this.turtle.lives === 0) {
          this.gameOver(this.score);
        }
      }
    }, this);


    // We have to pass `this` value as the second argument
    // as array method callbacks have a default `this` of undefined.
    this.food.forEach( function(food) {
      
      // We will implement didCollide() in the next step
      if ( this.turtle.didCollide(food) ) {
        
        // Move the food off screen to the left
        food.y = 0 - food.size;
        this.score += 100;
      }
    }, this);

    this.superfood.forEach( function(superfood) {
      
      // We will implement didCollide() in the next step
      if ( this.turtle.didCollide(superfood) ) {
        
        // Move the superfood off screen to the left
        superfood.y = 0 - superfood.size;
        this.score += 150;
      }
    }, this);

  };
  

  Game.prototype.passGameOverCallback = function(gameOverFunc) {
    this.startOver = gameOverFunc;
  };
  
/* Not suposed to need these ones:
Game.prototype.updateGameStats = function() {};
Game.prototype.removeGameScreen = function() {};
*/