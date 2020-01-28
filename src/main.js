'use strict';

// Creates DOM elements from a string representation
function buildDom(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.children[0];
  };

// Runs on initial start and contains calls all other functions that manage the game
function main() {
  var game; // instance of the Game
  var splashScreen; // Start Screen
  var gameOverScreen;

    
  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main>
      <h1>FREE DONATELLA</h1>
      <p class="prueba">Help our lovely turtle to survive another day in the ocean</p>
      <button>Start</button>
    </main>
  `);
      
    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', function() {
        startGame();
        console.log('You clicked Start!'); // PROVISIONAL
        
      // Here we start the game 
    });
  };

  function removeSplashScreen() {
    splashScreen.remove(); // remove() is an HTML method that removes the element entirely
  }

    
  // -- game screen

  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">LIVES:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">SCORE:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas-container">
        <canvas></canvas>
      </div>
    </main>
  `);

    document.body.appendChild(gameScreen);
    return gameScreen;
  }

  function removeGameScreen() {
    game.gameScreen.remove(); // We will implement it in the game object
  }
    
  // -- game over screen

  function createGameOverScreen() {
    gameOverScreen = buildDom(`
      <main>
        <h1>Game over</h1>
        <p>Your score: <span></span></p>
        <button>Restart</button>
        <button>Call to action</button>
        </main>
    `);
  
    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);
  
    var span = gameOverScreen.querySelector('span');
    span.innerText = game.getScore();
  
    document.body.appendChild(gameOverScreen);
  }

  function removeGameOverScreen() {
    if (gameOverScreen !== undefined) { // if it exists saved in a variable
      gameOverScreen.remove();
    }
  }

    
  // -- Setting the game state 

  // SETTING GAME STATE
  function startGame() {
    removeSplashScreen();
    removeGameOverScreen();

    game = new Game();
    game.gameScreen = createGameScreen();

    // Start the game
    game.start();

    // End the game
    game.passGameOverCallback(gameOver);
    /* Alternative:
    game.passGameOverCallback( function() {	
    gameOver(game.score);
    */
  }

  function gameOver() { // score as an argument?
    removeGameScreen();
    createGameOverScreen(); // <--(score) ??

    console.log("GAME OVER IN MAIN");
  }

    
  // -- initialize Splash screen on initial start
  createSplashScreen();
}

// Runs the function `main` once all resources are loaded
window.addEventListener('load', main);