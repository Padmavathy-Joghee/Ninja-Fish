var PLAY = 1;
var END = 0;
var gameState = PLAY;

var fish, fish_swimming, fish_collided;
var ground, invisibleGround, groundImage,overlay,ig1,underlay;

var sfishGroup, sfishImage, sfish;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var sun,sunAni, fly, flyAni, flyGroup;
var score=0;

var gameOver, restart;


function preload(){
  fish_swimming =   loadAnimation("f1.png","f2.png");
  fish_collided = loadAnimation("fc.png");
  
  groundImage = loadImage("g1.jpg");
  
  sfishImage = loadImage("f3.png");
  
  obstacle1 = loadImage("ob1.png");
  obstacle2 = loadImage("ob2.png");
  
  sunAni= loadAnimation("sun1.png","sun2.png");
  flyAni= loadAnimation("fly1.png","fly2.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 600);
  
  ground = createSprite(0,0,600,100);
  ground.addImage("ground",groundImage);
  ground.scale=0.6 ;
  //ground.x = ground.width /2;
  ground.velocityX = 6;
  
  underlay = createSprite(300,540,600,250);
  underlay.visible = true;
  underlay.shapeColor="#809cf7";
  
  fish = createSprite(550,480,20,30);
  
  fish.addAnimation("swimming", fish_swimming);
  //fish.addAnimation("collided", fish_collided);
  fish.scale = 1.5;
  
  gameOver = createSprite(300,120);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,150);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(300,540,600,20);
  invisibleGround.visible = false;
  
  ig1 = createSprite(590,500,20,600);
  ig1.visible = false;
  
  sun=createSprite(50,50);
  sun.addAnimation("sun",sunAni)
  sun.scale=0.4;
  
  sfishGroup = new Group();
  obstaclesGroup = new Group();
  flyGroup=new Group();
}

function draw() {
  
 // text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/61);
    ground.velocityX = -10;
    //change the trex animation
    fish.changeAnimation("swimming", fish_swimming);
    
    if(keyDown("space") && fish.y >= 400) {
      fish.velocityY = -18;
      fish.velocityX = -7;
    }
  
    fish.velocityY = fish.velocityY + 0.8;
    fish.velocityX = fish.velocityX + 0.1;
  
    if (ground.x < 0){
      ground.x = ground.width/4 ;
    }
  
    fish.collide(invisibleGround);
    fish.collide(ig1);
    spawnSfish();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(fish)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    fish.velocityY = 0;
     fish.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    sfishGroup.setVelocityXEach(0);
    flyGroup.setVelocityXEach(0);  
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    sfishGroup.setLifetimeEach(-1);
    flyGroup.setLifetimeEach(-1);
    
    if (fish.isTouching(sfishGroup)) {
      sfishGroup.destroyEach();
    }
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  overlay = createSprite(300,560,600,160);
  overlay.visible = true;
  overlay.shapeColor="#809cf7";
  
  spawnfly();
  
  drawSprites();
  fill("black");
  textSize(18);
  text("Score: "+ score, 460,70);
}

function spawnSfish() {
  //write code here to spawn the small fish
  var num=Math.round(random(80,100));
  if (frameCount % num === 0) {
    sfish = createSprite(10,483);
    //sfish.y = Math.round(random(80,120));
    sfish.addImage(sfishImage);
    sfish.scale = 0.7;
    sfish.velocityX = 3;
    
     //assign lifetime to the variable
    sfish.lifetime = 138;
    
    //adjust the depth
    sfish.depth = fish.depth;
    sfish.depth = sfish.depth + 1;
    
    //add each cloud to the group
    sfishGroup.add(sfish);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  sfishGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 220 === 0) {
    var obstacle = createSprite(0,480,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = 8;
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    //obstacle.debug=true;
    obstacle.setCollider("rectangle",0,0,50,50)
  }
}

function spawnfly() {
  var num=Math.round(random(60,120));
  if (frameCount % num === 0) {
    fly=createSprite(650,80);
    fly.addAnimation("sun",flyAni)
    fly.y=Math.round(random(60,120));
    fly.scale=0.15;
  
    fly.velocityX = -3;
    
     //assign lifetime to the variable
    fly.lifetime = 210;
    
    //adjust the depth
    //sfish.depth = fish.depth;
    //sfish.depth = sfish.depth + 1;
    
    //add each cloud to the group
    flyGroup.add(fly);
  }
  
}
