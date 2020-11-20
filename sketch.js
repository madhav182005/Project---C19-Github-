var backImage, player_running, bananaImage, obstacleImage, obstacleGroup, score; 
var bananaGroup, stoneGroup; 
var score = 0; 

var PLAY = 1; 
var END = 0; 
var gameState = PLAY; 

function preload(){ 
 backImage = loadImage("jungle.jpg");
 player_running =  loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png" , "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png"); 
  
  bananaImage = loadImage("banana.png"); 
  obstacleImage = loadImage("stone.png"); 
}

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(100,270,50,50); 
  monkey.addAnimation("monkey",player_running)
  monkey.scale = 0.2
  
  banana = createSprite(205,150,10,10); 
  banana.addAnimation("banana",bananaImage); 
  banana.scale = 0.1; 

  backImage.velocityX = -4;
  backImage.visible = false;

  bananaGroup = new Group()
  stoneGroup = new Group()
  }

function draw() {
  background(backImage);
  
  // console.log(monkey.y)
  if(keyDown("space") && monkey.y > 300) { 
    monkey.velocityY = -15; 
  } 
  if(monkey.isTouching(bananaGroup)) { 
   bananaGroup.destroyEach(); 
    score = score + 1; 
  } 
  
  
 if(bananaGroup.isTouching(monkey)) { 
 score = score+2; 
 bananaGroup.destroyEach();
 }
  
 if(stoneGroup.isTouching(monkey)) { 
   player.scale = 0.2; 
 } 
 
  else if(gameState === END) { 
     text("gameOver",200,200); 
  monkey.y = 200; 
  stoneGroup.velocityX = 0; 
  bananaGroup.velocityX = 0; 
   stoneGroup.destroyEach();
   monkey.destroy(); 
   bananaGroup.destroyEach(); 
   score = 0; 
   } 
   monkey.velocityY = monkey.velocityY + 0.8; 

 drawSprites(); 
  
  spawnStone(); 
   if(monkey.collide(stoneGroup)) { 
     gameState = END;
   } 
  spawnBanana(); 
  
  stroke("white");
  textSize(20); 
  fill("white"); 
  text("score: "+ score, 500, 50);
} 

function spawnStone() { 
   if(World.frameCount % 60 === 0) {
    var stone = createSprite(350,360,20,30);
    stone.setAnimation("Stone"); 
    stone.velocityX = - (6 + 3*score/100); 
    
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.15;
    stone.lifetime = 80;
    //add each obstacle to the group
    stoneGroup.add(stone);
  }
} 

function spawnBanana() { 
    if(World.frameCount % 60 === 0) { 
      var banana = createSprite(390,200,50,50); 
      banana.setAnimation("Banana");
      banana.scale = 0.1; 
      banana.y = randomNumber(100,300); 
      banana.velocityX = -5; 
      banana.setLifetime = 50; 
      bananaGroup.add(banana);
  }
}
