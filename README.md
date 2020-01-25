# Free Donatella

## Description
This is a game to raise awareness about the threat that pollution represents for the planet. Donatella is a turtle that tries to survive in the ocean, surrounded by an increasing amount of rubbish that will put her life in danger. This is my first project of Ironhack Barcelona web development bootcamp (January 2020).


## MVP (DOM - CANVAS)

## Backlog
Done in paper

## Data structure

### index.html
```<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Canvas Code Along</title>
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <script src="./src/main.js"></script>
  <script src="./src/game.js"></script>
  <script src="./src/player.js"></script>
  <script src="./src/enemy.js"></script>
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

#### function Game():
- this.canvas: Will call the canvas
- this.ctx: Will set the canvas as "2d" (2 dimensions)
- this.rubbish -> Empty array that will "push" random rubbish into the canvas. Various images will be used and all of them substract 1 life from the player (turtle).
- this.food -> Empty array that will "push" random food into the canvas. Various images will be used, and every type of food will have a different value (in points).
- this.gameIsOver: Will check if game is over.
- this.gameScreen: Will check the screen to display.
- this.score: Starts with 0 and only increases when the player (turtle) collapses with a food element.

#### Game.prototype.(...):
- start: Initialize the game and canvas, generate a new player and add keydown event listeners
- startLoop: Update the score, generate random enemies (rubbish) and random food, check collisions between the turtle and enemies & food, check collisions of turtle with the frame of the screen and check if enemies (rubbish) and food are out of the screen (to remove them from the array), draw the elements (turtle, rubbish and food), terminate the loop if the game is over.
- gameOver: Check if game is over and starts again.
- checkCollisions: Activa la función 'gameOver' cuando la vidas llegan a 0.
- passGameOverCallback: Callback function to restart the game from startGame() in main.js.

### turtle.js
- function Turtle: canvas, ctx, size, x, y, direction, speed
- Turtle.prototype.setDirection: Only left and right
- Player.prototype.didCollide: With rubbish & and food
- Turtle.prototype.updatePosition
- Turtle.prototype.handleScreenCollision
- Turtle.prototype.removeLife
- Turtle.prototype.draw

### food.js
- function Food: canvas, ctx, size, x, y, speed
- Food.prototype.draw:
- Food.prototype.updatePosition
- Food.prototype.isInsideScreen

### rubbish.js
- function Rubbish: canvas, ctx, size, x, y, speed
- Rubbish.prototype.draw
- Rubbish.prototype.updatePosition
- Rubbish.prototype.isInsideScreen

## States y States Transitions
- splashScreen: Title, mission, movement instructions and start button.
- gameScreen: Scoreboard with number of lives and points, enemies (rubbish) amount increases until it is impossible for the turtle to avoid collision and looses the 3 lives.
- gameoverScreen: Shows a message with environmental awareness content and 2 buttons: one to play again (back to splashScreen) and another button with a "call to action" that includes a link to some website about the topic (e.g. https://www.worldwildlife.org/species/sea-turtle)

## Tasks
- Create proyect and HTML, CSS and JS files and link them.
- Inspect the HTML elements and style them in CSS.
- Create loop in JS to iteration between screens (splash, game and game over).
- Shape the properties of turtle, rubbish and food.
- Implement the structure of main.js and game.js.

## Links

### Trello
[Link url](https://trello.com/b/XiuTiErU)

### Git
[Link Repo](https://github.com/doveriko/free-donatella)
(Deploy)


### Slides
(Slides)
