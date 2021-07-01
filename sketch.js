var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

function preload() {
  monkey_running = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  );

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(850, 400);

  monkey = createSprite(50, 340);
  monkey.addAnimation("Jumping Monkey", monkey_running);
  monkey.scale = 0.2;
  
  obstaclesGroup = new Group()
  bananaGroup = new Group()
  
  ground = createSprite(425,395,850,10);
  score = 0
}

function draw() {
  background("green");
  
  spawnObstacles()
  spawnBananas()
  
  if(keyDown("space")&& monkey.y >= 300)
  {
        monkey.velocityY = -18;
  }
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground)
  
  if(bananaGroup.isTouching(monkey))
  {
    bananaGroup.destroyEach()
    score = score+1
  }
  
  drawSprites();
  
  fill("yellow")
  textSize(20)
  text(score,50,50)
}

function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(800, 350, 10, 40);
    obstacle.velocityX = -3
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.25
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //add each cloud to the group
    bananaGroup.add(banana);
  }
}