# Free Donatella

## Description
<video src="/Users/Abel/Desktop/Ironhack/W3/Project1/donatella.mov"></video>

This is a game to raise awareness about the threat that pollution represents for the planet. Donatella is a turtle that tries to survive in the ocean, surrounded by an increasing amount of rubbish that will put her life in danger.  The game combines ES6, DOM manipulation, canvas and OOP.


## MVP (DOM - CANVAS)

## Backlog
- Increase speed of enemies and food when the turtle interacts with them.
- Add different types of enemies (rubbish) that can substract more than 1 life.
- Add different types of food that can give a different amount of points.
- Set the possibility to "win" if the turtle manages to reach a finish lane.
- Show random messages in the game over screen instead of just one.

## Data structure

### index.html
```<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Free Donatella</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <script src="./src/main.js"></script>
  <script src="./src/game.js"></script>
  <script src="./src/turtle.js"></script>
  <script src="./src/elements.js"></script>
</body>
</html>
```

### style.css
Typography, layout, components.

### main.js

#### function buildDom()
#### function main()
- function createSplashScreen(): Includes a "start" button (leads to startGame()).
- function removeSplashScreen()
- function createGameScreen()
- function removeGameScreen()
- function createGameOverScreen(): Includes a "game over" button(leads to startGame() and a "call to action" button with an external link.
- function removeGameOverScreen()
- function startGame()
- function gameOver()

### game.js

#### Constructor:
- this.canvas: Will call the canvas
- this.ctx: Will set the canvas as "2d" (2 dimensions)
- this.rubbish -> Empty array that will "push" random rubbish into the canvas. Various images will be used and all of them substract 1 life from the player (turtle).
- this.food -> Empty array that will "push" random food into the canvas. Various images will be used, and every type of food will have a different value (in points).
- this.gameIsOver: Will check if game is over.
- this.gameScreen: Will check the screen to display.
- this.score: Starts with 0 and only increases when the player (turtle) collapses with a food element.

#### Methods:
- **start()**: Initialize the game and canvas, generate a new player and add keydown event listeners
- **startLoop()**: Update the score, generate random enemies (rubbish) and random food, check collisions between the turtle and enemies & food, check collisions of turtle with the frame of the screen and check if enemies (rubbish) and food are out of the screen (to remove them from the array), draw the elements (turtle, rubbish and food), terminate the loop if the game is over.
- **gameOver()**: Check if game is over and starts again.
- **checkCollisions()**: Activa la función 'gameOver' cuando la vidas llegan a 0.
- **passGameOverCallback()**: Callback function to restart the game from startGame() in main.js.

### turtle.js
- Constructor: **Turtle**: canvas, ctx, size, x, y, direction, speed
- Method: **setDirection():** Left and right
- Method: **didCollide():** Check collision with all elements
- Method: **updatePosition():** Track movement
- Method: **handleScreenCollision():** Remain in the limits of the canvas
- Method: **removeLife():** Every interaction with any type of rubbish subtracts one live from turtle
- Method: **draw()** a new turtle

### elements.js
- Constructor: **Elements**: canvas, ctx (canvas.getContext("2d")), x (initial random position), speed

- Method: **updatePosition()**

- Method: **isInsideScreen()**

  ##### Extension of prototype: 

- **Food**: Constructor: size, width, height, y (position), type ("good") | Method: draw()
- **Superfood:** Constructor: size, width, height, y (position), type ("good") | Method: draw()

- **Enemy:** Constructor: size, width, height, y (position), type ("bad") | Method: draw()

- **Superenemy:** Constructor: size, width, height, y (position), type ("bad") | Method: draw()

## States
- splashScreen: Title, mission, movement instructions and start button.
- gameScreen: Scoreboard with number of lives and points, enemies (rubbish) amount increases until it is impossible for the turtle to avoid collision and looses the 3 lives.
- gameoverScreen: Shows a message with environmental awareness content and 2 buttons: one to play again (back to splashScreen) and another button with a "call to action" that includes a link to some website about the topic (e.g. https://www.worldwildlife.org/species/sea-turtle)

## Links

### Git
[Repo](https://github.com/doveriko/free-donatella)

[Deployment](https://doveriko.github.io/free-donatella/) 