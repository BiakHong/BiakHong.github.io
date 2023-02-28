let box = document.getElementById("box1");
let box2 = document.getElementById("box2");
let boxPosSpeed = -1;

let boxPos = 940;
let outterBox = document.getElementById("outer")
let pikachu = document.getElementById("pikachu")
let current = 0;
let animationInterval;
let animationInterval2;
let position = 500;
outterBox.style.left = 700
// Animation
var widthOfSpriteSheet = 2207;
var widthOfEachSprite = 551.75;
var leftJump = 0;
let topPos = 300;
let fallSpeed = 35

// on starting game:
let startGame = document.getElementById("start");
let report = document.getElementById("report");



//keeping scores and time
let scores = document.getElementById("score")
let time = document.getElementById("time")
let scoreNum = 0;
let timeNum = 0;

scores.textContent = scoreNum;
time.textContent = timeNum;


function stopAnimation() {
  clearInterval(animationInterval);
  clearInterval(animationInterval2);
  clearInterval(animationInterval3);
}



function run() {

  moveBar()
  timeCount()
  var position = widthOfEachSprite; //start position for the image
  const speed = 150; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  

  animationInterval = setInterval(() => {
    pikachu.style.backgroundPosition = `-${position}px 0px`;
    pikachu.style.left = `${leftJump}px`
    pikachu.style.top = `${topPos}px`

    console.log(boxPos)
   
    if(topPos < 300){
      topPos += fallSpeed;
    }
    if(topPos > 300){
      topPos = 300;
    }
 
    
    
// check if Pikachu hit the box
if(overlaps(pikachu, box)){
  endGame()
}



    if (position < widthOfSpriteSheet) {
      position = position + diff;

    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;

    }
   
  }, speed);
  

}

function moveBar() {

  animationInterval2 = setInterval(() => {

    box.style.left = `${boxPos}px`;

    if (boxPos >= 0){
      boxPos += boxPosSpeed;
    }
    else{
      boxPos =940;
      fallSpeed +=5;
      scoreNum += 5;
      boxPosSpeed += -1;
      scores.textContent = scoreNum;
    }
    
    }, 20);
   
    
}
function jump(){
  if(topPos >0){
    topPos -= 100;
  }
}

function overlaps(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  const isInHoriztonalBounds =
    rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  const isInVerticalBounds =
    rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
  return isOverlapping;
}


function timeCount() {

  animationInterval3 = setInterval(() => {

    timeNum += 1;
    time.textContent = timeNum;

    }, 1000);
  }

function start(){
  report.style.opacity = "0%"
  startGame.style.visibility = "hidden";
  outterBox.style.opacity = "100%";
  
  run()
}

// reset game to original states
function endGame(){
  report.innerHTML = `<h1> Scores: ${scoreNum}  &nbsp &nbsp &nbsp &nbsp &nbspTimes: ${timeNum}`;

  report.style.opacity = "100%"
  startGame.style.visibility = "";
  outterBox.style.opacity = "20%";
  boxPos = 940;
  boxPosSpeed = -1;
  current = 0;
  position = 500;
  outterBox.style.left = 700;
  leftJump = 0;
  topPos = 300;
  fallSpeed = 35
  scoreNum = 0;
  timeNum = 0;
  stopAnimation()
}