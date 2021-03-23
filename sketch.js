// Creating Variables;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkeyRunning, monkeyCollided;
var banana, bananaImage;
var stone, stoneImage;
var bananasGroup, stonesGroup;
var jungle, jungleImage;
var ground;
var score;
var gameOver, gameOverImg;

//Loading Images used as Sprites;
function preload(){
  monkeyRunning = loadAnimation("Monkey_01.png",
                                "Monkey_02.png",
                                "Monkey_03.png",
                                "Monkey_04.png",
                                "Monkey_05.png",
                                "Monkey_06.png",
                                "Monkey_07.png",
                                "Monkey_08.png",
                                "Monkey_09.png",
                                "Monkey_10.png");

  monkeyCollided = loadAnimation("Monkey_01.png");

  bananaImage = loadImage("banana123.png");

  stoneImage = loadImage("stone.png");

  jungleImage = loadImage("jungle123.png");

  gameOverImg = loadImage("gameOver.jpg");
}

// Creating Canvas, sprites and Groups;
function setup() {
  createCanvas(400, 400);
  
  jungle = createSprite(200,200,400,400);
  jungle.x = jungle.width /2;
  jungle.velocityX = -10;
  jungle.addImage(jungleImage);
  
  monkey = createSprite(50,320,20,50);
  monkey.addAnimation("running", monkeyRunning);
  monkey.addAnimation("collided", monkeyCollided);
  monkey.scale = 0.12;
  
  ground = createSprite(200,360,400,10);
  ground.visible = false;

  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;  

  score = 0;

  bananasGroup = new Group ();
  stonesGroup = new Group ();
}
// Giving All the conditions of the game in the draw function;
function draw() {
  text("Score: "+ score, 300,50);

//The game is in play state;
  if (gameState===PLAY){
    jungle.velocityX = -(6 + 3*score/100);
    monkey.changeAnimation("running", monkeyRunning);

    if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -20;
    }
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
    if (jungle.x < 250){
      jungle.x = jungle.width/2;
    }

    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);

    spawnBananas();
    spawnStones();

    if (bananasGroup.isTouching(monkey)){
    bananasGroup.destroyEach();

    score=score+2;
    monkey.scale+= +0.01;

  } else if (stonesGroup.isTouching(monkey)){
    gameState = END;
  } 
    
//the game is in end state;
  }else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    jungle.velocityX = 0;

    jungle.visible = false;
    gameOver.visible = true;

    stonesGroup.destroyEach();
    bananasGroup.destroyEach();

    monkey.changeAnimation("collided",monkeyCollided);

    stonesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);

  console.log(ground.velocityX);
  }
  drawSprites();
}
// function to spawn bananas(rewards) at random places
function spawnBananas (){
   if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,250));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananasGroup.add(banana);
  }
}
// function to spawn stones(obstacles) at random places;
function spawnStones (){
   if (frameCount % 60 === 0) {
    var stone = createSprite(600,350,40,10);
    stone.addImage(stoneImage);
    stone.scale = 0.1;
    stone.velocityX = -3;
    stone.lifetime = 200; 
    stonesGroup.add(stone);
  }
}
