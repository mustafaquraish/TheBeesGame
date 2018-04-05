// Init Global Variables

// Graphics
var img;
var beeImg;

// Screen Size in pixels for the VGA
// Used to keep same sizes as original
let rows = 120;
let cols = 160;

// Player x and y positions with lives
let px;
let py;
let lives = 3;

// Array that holds bee objects
let bees = [];
let nbees = 1;

// Used to keep track of game 
let gameOver = false;
let score = 0;
let highscore = 0;

// Constants for the game boundaries
let TOP;
let LEFT;
let RIGHT;
let BOTTOM;

function setup() {
  frameRate(60);
  // Makes sure rectangles drawn with (x, y, width, height)
  rectMode(CORNER);
  
  // Offset that's used as size of single pixel
  // On the VGA display when using the DE2 Board
  off = windowHeight / rows;
  
  // Initialize user to middle of the screen
  px = 80*off;
  py = 60*off;
  
  // Set boundaries
  TOP = 24*off;
  LEFT = 4*off;
  RIGHT = 152*off;
  BOTTOM = 112*off;
  
  // Add 6 bees
  for (let i = 0; i < 6; i++) {
    bees.push(new Bee());
  }
  
  // Load background and bee sprite
  img = loadImage("background.png"); 
  beeImg = loadImage("bee.png");
  
  // Make canvas 160x120 virtual pixels
  createCanvas(off*cols, off*rows);
  // Make sure images don't get smooth, we want the pixelated look.
  noSmooth();
}

// Handles events for resetting the game, and 
// Updating the number of bees based on input
function keyPressed() {
  if (key == ' ' && gameOver) {
    gameOver = false;
    lives = 3;
    px = 80*off;
    py = 60*off;
  } else if (key == '1') {
    nbees = 1;
  } else if (key == '2') {
    nbees = 2;
  } else if (key == '3') {
    nbees = 3;
  } else if (key == '4') {
    nbees = 4;
  } else if (key == '5') {
    nbees = 5;
  } else if (key == '6') {
    nbees = 6;
  } else if (key == '§') {
    nbees = 0;
  } else if (key == '0') {
    nbees = 0;
  }
}

// Called everytime player dies.
function died() {
  if (lives == 1) {
    gameOver = true;
    score = 0;
  } else {
    lives--;
    px = 80*off;
    py = 60*off;
  }
}

// Main draw loop. Happens once every frame of animation.
function draw() {
  // Draw Background
  image(img, 0, 0, img.width * off, img.height * off);
  // None of the shapes here have strokes
  noStroke();
  
  // Every 2 seconds (120 frames) increment score if needed
  if (frameCount % 120 == 0 && !gameOver && !(nbees == 0)) {
    score++;
  }
  
  if (highscore < score) {
    highscore = score;
  }

  // Select color for player based on lives
  if (lives == 3) {
    fill(0,0,255);
  } else if (lives == 2) {
    fill(255,0,255);
  } else {
    fill(255,0,0);
  }
  // Boolean to see if collided with a bee this frame
  let stillAlive = true;
  
  if (!gameOver) {
    // Draw Player
    rect(px, py, off*4, off*4);
    
    // Draw number of bees selected, and check collisions with them
    for (let b = 0; b < nbees; b++) {
      let bee = bees[b];
      
      // collision check
      if (bee.check(px, py)) {
        stillAlive = false;
      }
      bee.draw();       // Class handles drawing bee
      bee.update();     // Each bee updates it's own location/direction
    }
  }

  // Movement takes place here
  if (keyIsDown(LEFT_ARROW)) {
    px-=off;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    px+=off;
  }
  if (keyIsDown(DOWN_ARROW)) {
    py+=off;
  }
  if (keyIsDown(UP_ARROW)) {
    py-=off;
  }

  // Player died if collided with wall or bees
  if (px >= RIGHT || px <= LEFT || py >= BOTTOM || py <= TOP || !stillAlive) {
    died();
  }
  
  // Displaying Score
  fill(0);
  textSize(20);
  textFont("Courier")
  text("Highest : " + highscore, 10,20,400,80)
  text("Score   : " + score, 10,60,400,110)

  // Drawing the red boxes for lives 
  fill(255,0,0);
  if (gameOver) {
    return;
  }
  if (lives >= 1) {
    rect(144*off,12*off,4*off,4*off);
  }
  if (lives >= 2) {
    rect(136*off,12*off,4*off,4*off);
  }
  if (lives >= 3) {
    rect(128*off,12*off,4*off,4*off);
  }
}

// Each bee has it's own class that handles it's position,
// direction, and collision detection.
class Bee {  
  constructor() {
    // start off at random spot
    this.x = random(6,150)*off;
    this.y = random(26,110)*off;
    this.dir = [0,0,1,1]; // direction doesn't matter as much, bounces
  }
  
  update() {
    // If you hit a wall, bounce
    if (this.x >= RIGHT) {
      this.dir[0] = 1;
      this.dir[3] = 0; 
    }
    if (this.x <= LEFT) {
      this.dir[0] = 0;
      this.dir[3] = 1; 
    }
    if (this.y >= BOTTOM) {
      this.dir[1] = 0;
      this.dir[2] = 1; 
    }
    if (this.y <= TOP) {
      this.dir[1] = 1;
      this.dir[2] = 0; 
    }
    
    // Move position in direction of movement
    if (this.dir[0] == 1) {
      this.x-=off;
    }
    if (this.dir[1] == 1) {
      this.y+=off;
    }
    if (this.dir[2] == 1) {
      this.y-=off;
    }
    if (this.dir[3] == 1) {
      this.x+=off;
    }
  }
  
  // Draw the bee sprite at the current location
  draw() {
    image(beeImg, this.x, this.y, off*4, off*4);
  }
  
  // Check given x and y values for possible collision
  check(x, y) {
    if (x >= this.x - off*3 && x <= this.x + off*3 
      && y >= this.y - off*3 && y <= this.y + off*3) {
      return true;
    } else {
      return false;
    }
  }
}
