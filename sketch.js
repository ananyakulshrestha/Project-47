var warrior;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var virusKilled = 0;
var InfectedPeople = 0;

function preload()
{
  bg = loadImage("bg3.jpg");
  virusImg = loadImage("Virus.png");
  warriorImg = loadImage("Warrior.png");
}

function setup() {
  createCanvas(1200,600);
  warrior = createSprite(600, 300, 50, 50);
  warrior.addImage("warrior", warriorImg);
  warrior.scale = 0.4;
  virusGroup = new Group();
  peopleGroup = new Group();
}

function draw() {
  background(bg);  
  textSize(20);
  text("Virus Killed = "+virusKilled, 100,50);
  text("Infected People = "+InfectedPeople, 800, 50);
  
  if(gameState === PLAY)
  {
    if(keyDown(UP_ARROW))
  {
     warrior.y = warrior.y -2;
  }

  if(keyDown(DOWN_ARROW))
  {
    warrior.y = warrior.y +2;
  }

  if(keyDown(RIGHT_ARROW))
  {
    warrior.x = warrior.x +2;
  }

  if(keyDown(LEFT_ARROW))
  {
    warrior.x = warrior.x -2;
  }
  virus()
  people()
  for(var i = 0; i<virusGroup.length; i++)
  {
    if(virusGroup.get(i).isTouching(warrior))
    {
      virusGroup.get(i).destroy();
      virusKilled = virusKilled+1;
    }
  }

  //if(warrior.isTouching(virus))
  //{
  // textSize(20);
  //text( "Good Job!!", 150, 70 );
  //}

  //if(virus.isTouching(people))
  //{
  // textSize(20);
  //text( "Oops!!", 150, 70 );
  //}

  for(var i = 0; i<peopleGroup.length; i++)
  {
    if(peopleGroup.get(i).isTouching(virusGroup))
    {
      //peopleGroup.get(i).destroy();
      InfectedPeople = InfectedPeople+1;
    }
  }
  
  if(virusGroup.isTouching(peopleGroup))
  {
    gameState = END;
  }
  }
  
  else if(gameState === END)
  {
    peopleGroup.setVelocityXEach(0);
    peopleGroup.setLifetimeEach(-1);
    virusGroup.setLifetimeEach(-1);
    virusGroup.setVelocityXEach(0);
  }
  
 

  


  
  
  drawSprites();
}


function virus()
{
  if(frameCount % 170 === 0)
  {
    var virus = createSprite(1200, random(100, 500),20, 20);
    virus.addImage("virus", virusImg);
    virus.velocityX = -2;
    virus.lifetime = 600;
    virus.scale = random (0.3, 0.6);
    virusGroup.add(virus);
  }
}

function people()
{
  if(frameCount % 170 === 0)
  {
  var people = createSprite(0, random(100, 500), 20, 20);
  people.velocityX = 2;
  people.lifetime = 600;
  peopleGroup.add(people);
  }
}