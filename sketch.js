var backImage,backgr;
var player, player_running;
var ground,groundImg;

var powerGroup, powerImage;
var monsterGroup, monsterImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver; 
var score=0;
var attempts=3;

function preload(){
  backImage=loadImage("world.jpg");
  player_running = loadAnimation("sonic.gif");
  powerImage = loadImage("power.png");
  monsterImg = loadImage("monster.png"); 
  gameOverImg = loadImage("gameOver.png");
  groundImg=loadImage("ground.jpg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.5;
  
  ground = createSprite(280,540,2000,10);
  ground.x=ground.width/2;
  ground.visible=true;

  powerGroup = new Group();
  monsterGroup = new Group();
  
  score = 0;
}

function draw() { 
  background(0);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);
  
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(powerGroup.isTouching(player)){
      powerGroup.destroyEach();
      score = score + 2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
      
    spawnpower();
    spawnmonster();  
 
    if(monsterGroup.isTouching(player)){ 
        gameState = END;
    }
  }else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;
    
    powerGroup.destroyEach();
    monsterGroup.destroyEach();

    textSize(30);
    fill(0);
    text("Game Over!,Reload the page and try again", 100,220);
  }
}

function spawnpower() {
  if (frameCount % 80 === 0) {
    var power = createSprite(600,250,60,30);
    power.y = random(120,150);    
    power.addImage(powerImage);
    power.scale = 0.3;
    power.velocityX= -4; 
    
    power.lifetime = 300;
    player.depth = power.depth + 1;
    powerGroup.add(power);
  }
}

function spawnmonster() {
  if(frameCount % 250 === 0) {
    var monster = createSprite(800,490,900,40);
    monster.velocityX=-(4 + 2*score/100); 
    monster.addImage(monsterImg);
    
    monster.scale = 0.2;
    monster.lifetime = 300;
    monsterGroup.add(monster);
  }
}
