var img;
var beeImg;

let rows = 120;
let cols = 160;

let px;
let py;
let lives = 3;

let bees = [];
let nbees = 0;

let gameOver = false;

let score = 0;
let highscore = 0;

let TOP;
let LEFT;
let RIGHT;
let BOTTOM;

function setup() {
  frameRate(60);
  rectMode(CORNER);
  off = windowHeight / rows;

  px = 80*off;
  py = 60*off;

  TOP = 24*off;
  LEFT = 4*off;
  RIGHT = 152*off;
  BOTTOM = 112*off;

  for (let i = 0; i < 6; i++) {
    bees.push(new Bee());
  }

  img = loadImage("background.png"); 
  beeImg = loadImage("bee.png");
  createCanvas(off*cols, off*rows);
  noSmooth();
}

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

function draw() {
  image(img, 0, 0, img.width * off, img.height * off);

  noStroke();

  if (frameCount % 120 == 0 && !gameOver && !(nbees == 0)) {
    score++;
  }

  if (highscore < score) {
    highscore = score;
  }

  // Draw Player
  if (lives == 3) {
    fill(0,0,255);
  } else if (lives == 2) {
    fill(255,0,255);
  } else {
    fill(255,0,0);
  }
  let stillAlive = true;
  if (!gameOver) {
    rect(px, py, off*4, off*4);
    for (let b = 0; b < nbees; b++) {
      let bee = bees[b];
      if (bee.check(px, py)) {
        stillAlive = false;
      }
      bee.draw();
      bee.update();
    }
  }

  /////////////// MOVEMENT ////////////////
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

  // Wall collision
  if (px >= RIGHT || px <= LEFT || py >= BOTTOM || py <= TOP || !stillAlive) {
    died();
  }
  fill(0);
  textSize(20);
  textFont("Courier")
  text("Highest : " + highscore, 10,20,400,80)
  text("Score   : " + score, 10,60,400,110)

  // lives 
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

class Bee {  
  constructor() {
    this.x = random(6,150)*off;
    this.y = random(26,110)*off;
    this.dir = [0,0,1,1];
  }
  update() {
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

  draw() {
    image(beeImg, this.x, this.y, off*4, off*4);
  }

  check(x, y) {
    if (x >= this.x - off*3 && x <= this.x + off*3 
      && y >= this.y - off*3 && y <= this.y + off*3) {
      return true;
    } else {
      return false;
    }
  }

}