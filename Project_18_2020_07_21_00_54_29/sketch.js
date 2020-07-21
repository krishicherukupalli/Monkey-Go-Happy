//Global Variables
var monkey, backgroundImage;
var ground, invisibleGround, groundImage;
var bananaGroup, bananaImage;
var obstacleGroup, obstacleImage;

var score = 0;

function preload() {
  monkey = loadAnimation("Monkey_03.png", "Monkey_02.png",
    "Monkey_01.png", "Monkey_10.png", "Monkey_08.png", "Monkey_09.png", "Monkey_07.png", "Monkey_05.png", "Monkey_06.png", "Monkey_04.png");

  bananaImage = loadImage("Banana.png");

  groundImage = loadImage("ground.png");

  obstacleImage = loadImage("stone.png");

  backgroundImage = loadImage("jungle.png");

}

function setup() {
  createCanvas(600, 200);

  monkey = createSprite(50, 180, 20, 50);
  monkey.addAnimation(monkey);
  monkey.scale = 0.1;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -7;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  background = createSprite(300, 100, 600, 200);
  bakground.addImage(backgroundImage);

  bananaGroup = new Group();
  obstacleGroup = new Group();


}

function draw() {
  background(180);
  score = score + Math.round(getFrameRate() / 60);
  text("Score: " + score, 500, 50);


  if (keyDown("space")) {
    monkey.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.2;
  }

  monkey.collide(invisibleGround);

  spawnClouds();
  spawnObstacles();

  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = random(80, 120);
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
  }

}

function spawnObstacle() {
  if (frameCount % 300 === 0) {
    var stone = createSprite(600, 165, 10, 40);
    stone.velocityX = -7;
    stone.addImage(obstacleImage);

    //generate random obstacles
    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;

      default: break;
    }


    //assign scale and lifetime to the obstacle           
    stone.scale = 0.5;
    stone.lifetime = 100;
    obstacleGroup.add(stone);
  }
}