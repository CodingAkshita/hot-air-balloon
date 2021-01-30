var balloon, database, position;
var bg = "Hot Air Balloon-01.png";

function preload() {

backgroundImg = loadImage(bg);
balloonImage2 = loadImage("Hot Air Balloon-02.png");
balloonImage3 = loadImage("Hot Air Balloon-03.png");
balloonImage4 = loadImage("Hot Air Balloon-04.png");
hotAirBalloon = loadAnimation("Hot Air Balloon-02.png","Hot Air Balloon-03.png","Hot Air Balloon-04.png")

}
function setup() {
  createCanvas(1400,600);
  database = firebase.database();
  console.log(database);

  balloon = createSprite(100,500,50,50);

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showError);
}

function draw() {
  if(backgroundImg)
 background(backgroundImg);

 if(keyDown(LEFT_ARROW)){
  updateHeight(-10,0);
}
else if(keyDown(RIGHT_ARROW)){
  updateHeight(+10,0);
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale = balloon.scale-0.01;
}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,+10);
}

strokeWeight(1)
stroke("black");
textSize(20);
fill("black");
text("Use arrow keys to move Hot Air Balloon!",10,20);

  drawSprites();
}

function updateHeight(x,y){

datebase.ref("balloon/height").set({
  'x' : height.x + x,
  'y' : height.y + y
})

}

function readHeight(data){
height = data.val();
balloon.x = height.x;
balloon.y = height.y;
}

function showError(){
console.log("Error in writing to the database");
}