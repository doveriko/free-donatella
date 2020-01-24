# Free Donatella

## Description
This is a game to raise awareness about the threat that pollution represents for the planet. Donatella is a turtle that tries to survive in the ocean, surrounded by an increasing amount of rubbish that will put her life in danger. This is my first project of Ironhack Barcelona web development bootcamp (January 2020).


## MVP (DOM - CANVAS)



## Backlog


## Data structure

### index.html

### style.css

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
- this.pollution -> Empty array that will "push" random rubbish into the canvas. Various images will be used and all of them substract 1 life from the player (turtle).
- this.food -> Empty array that will "push" random food into the canvas. Various images will be used, and every type of food will have a different value (in points).
- this.gameIsOver: Will check if game is over.
- this.gameScreen: Will check the screen to display.
- this.score: Starts with 0 and only increases when the player (turtle) collapses with a food element.

#### Game.prototype.(...):
- start: Initialize the game and canvas, generate a new player and add keydown event listeners
- startLoop: Update the score, generate random enemies (pollution) and random food, check collisions between the turtle and enemies & food, check collisions of turtle with the frame of the screen and check if enemies (pollution) and food are out of the screen (to remove them from the array), draw the elements (turtle, rubbish and food), terminate the loop if the game is over.
- gameOver: Check if game is over and starts again.
- checkCollisions
- passGameOverCallback

### turtle.js
function buildDom(htmlString)

### food.js
function buildDom(htmlString)

### pollution.js
function Pollution () // Define its random appearence in canvas
Pollution.prototype.draw = function() //

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen


## Task
Task definition in order of priority


## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
