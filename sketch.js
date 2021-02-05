
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score;
var survive;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(80,315);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  console.log(ground.x);

  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  score=0
}


function draw() {
createCanvas(400,400);
  
  background("lightblue");
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,50,50);
  
  
    
  
  
  if(keyDown("space") && monkey.y>305 ){
     monkey.velocityY=-14;
    
     }
  monkey.velocityY=monkey.velocityY+0.7;
  monkey.collide(ground);
  
  
  food();
  obstacles();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
       
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
  }
  else
    {
      stroke("black");
  textSize(20);
  fill("black");
  survive=Math.ceil(frameCount/frameRate());
  text("Survival time: "+survive,200,50);
    }
  
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
    
  }
  
  if(ground.x<0){
  ground.x=ground.width/2;
    
  }
  
  monkey.setCollider("circle",0,0,300);
  obstacleGroup.setColliderEach("circle",0,0,200);
  obstacleGroup.debugEach=true;
  drawSprites();
  
}

function food() {
  if(frameCount%80===0){
    banana=createSprite(500,250);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
    banana.velocityX=-5;
    banana.scale=0.1;
    banana.lifetime=300;
    banana.depth=monkey.depth;
    monkey.depth=banana.depth+1;
    FoodGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount%80===0){
    obstacle=createSprite(500,315);
    obstacle.addImage(obstacleImage);
    
    obstacle.velocityX=-6;
    obstacle.scale=0.15;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
  }
}




