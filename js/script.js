const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

let username = "friend"

let mouseX = 0
let mouseY = 0

const START = 0
const GAMEPLAY = 1
const WIN = 2
const LOSE = 3

let GameState = START

let levelComplete = false

 const width = 128;
 const height = 100;

 let currentFrame = 0

const scale = 0.5;
const scaledWidth = width - 30;
const scaledHeight = height - 30;
const Audioloop = 0;

let currentLoopIndex = 0;
let otherCurrentLoopIndex = 0;
let frameCount = 0;
let otherFrameCount = 0;
let currentDirection = 0;
let speed = 4;

let button1Width = 150; // Scale with image
let button1Height = 50;

let button2Width = 150;// Scale with image
let button2Height = 50;

let button3Width = 150; // Scale with image
let button3Height = 50;
//let width = 1100 
//let height = 500const 
//const username = localStorage.getItem('username');
let score = 0;
let hiScore = localStorage.getItem('hiScore') || 0;
// let score = 0;





//if (!username) {
   // username = prompt("Enter your name:"); // ask for username if not set
   //     if (username) {
  //      localStorage.setItem("username", username);
  //  } else {
       // username = "Player"; // default if user cancels
  //  }
//}



function addName() {
    let header = document.getElementById("main-header");
    header.innerHTML = "Hello " + username;
     context.fillText("Player: " + username, 35, 452);
}

//localStorage.setItem("username", username);
// key - value pair
//const username = localStorage.getItem('username', username);


//addName();

// player scroe list
    let Player1 = 0;
     let Player2 = 0;
     let Player3 = 0;
     let Player4 = 0;
     let Player5 = 0;


let canUpScroe = false

var rainAudio = new Audio('img/raindrop.mp4');
var backgroundAudio = new Audio('img/mushroom.mp4');
var winAudio = new Audio ("img/winSong.mp4");
var gameOverAudio = new Audio ("img/gameOverSong.mp4")


const musicToggleBtn = document.getElementById('musicToggleBtn');


// WIN Lose screens
let gameOverSprite = new Image();
gameOverSprite.src = "img/gameover.png";

let youWinSprite = new Image();
youWinSprite.src = "img/youWin.png";

let leaderSprite = new Image();
leaderSprite.src = "img/leaderBoard.png";

//BUTTON SPRITES
let button1Sprite = new Image();
button1Sprite.src = "img/button1.png";

let button2Sprite = new Image();
button2Sprite.src = "img/button2.png";

let button3Sprite = new Image();
button3Sprite.src = "img/button3.png";

let startbutton = new GameObject(button1Sprite, 0, 0, button1Width, button1Height)

startbutton.x = (canvas.width / 2) - (button1Width / 2)
startbutton.y = (canvas.height / 2) - (button1Height / 2)

let nextbutton = new GameObject(button2Sprite, 0, 0, button2Width, button2Height)

nextbutton.x = (canvas.width / 2) - (button2Width / 2)
nextbutton.y = (canvas.height / 2) - (button2Height / 2)

let playAgainButton = new GameObject(button3Sprite, 0, 0, button3Width, button3Height)

playAgainButton.x = (canvas.width / 2) - (button3Width / 2)
playAgainButton.y = (canvas.height / 2) - (button3Height / 2)

//let loseButton = new GameObject(buttonSprite, 0, 0, buttonWidth, buttonHight)

//loseButton.x = (canvas.width / 2) - (buttonWidth / 2)
//loseButton.y = (canvas.height / 2) - (buttonHight / 2)

let mushSprite = new Image();
mushSprite.src = "img/mush.png";

let gomush = new GameObject(mushSprite, 0, 0, scaledWidth, scaledHeight);
//let gomaze1 = new GameObject(maze1Sprite, 200, 200, 100, 100);


let groundSprite = new Image ();
groundSprite.src = "img/ground.png";
let goground = new GameObject(groundSprite, 0, 0,100, 100);




let startSprite = new Image();
startSprite.src = "img/start.png";

function GameObject(spritesheet, x, y, width, height) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mvmtDirection = "None";
}

function drawFrame(image, frameX, frameY, canvasX, canvasY) {
    context.drawImage(image,
                  frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaledWidth, scaledHeight);
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // context.drawImage(testImg, 0,0);
}




let winPlayed = false;
let gameOverPlayed = false;


function draw() {
    //console.log("Draw is called!");
     //addName();
    context.clearRect(0,0, canvas.width, canvas.height);
   

    let nameBoxSprite = new Image ();
    nameBoxSprite.src = "img/nameBox.png";
  let gonameBox = new GameObject(nameBoxSprite, 0, 0,100, 100);

    context.font = "10px Arial";
    context.fillStyle = "black";
    context.fillText("Player: " + username, 35, 452);
    context.fillText("Score: " + score, 20, 30);
    context.fillText("High Score: " + hiScore, 20, 60);
    
 //context.drawImage(gostart.spritesheet, gostart.x, gostart.y, gostart.width, gostart.height)
   //context.drawImage(goground.spritesheet, goground.x, goground.y, goground.width, goground.height)

   //context.drawImage(gomush.spritesheet, 1, 1, 100, 100)
   if (GameState === START)
   {
    
    context.drawImage(startSprite, 0, 0, canvas.width, canvas.height)
    //context.drawImage(leaderSprite, 0, 0, canvas.width , canvas.height);
   // drawLeadar();
    context.drawImage(leaderSprite, 0, 0, 200, 400);
       context.font = "50px Arial";
       context.color = "pink ";
   context.fillText("Let's play " + username, canvas.width-  700, 80);
    context.drawImage( startbutton.spritesheet, startbutton.x, startbutton.y,startbutton.width, startbutton.height  );
    
    drawLeadar();
   }
   if (GameState === GAMEPLAY)
   {
    context.drawImage(groundSprite, 0, 0, canvas.width, canvas.height)
    drawFrame(gomush.spritesheet, currentFrame, 0, gomush.x, gomush.y)
    drawMaze();
    drawTimer();
    //Draw name 
    context.drawImage(nameBoxSprite, 10, 400, 110, 110);
    // context.drawImage(timerSprite, canvas.width - 0, -100, 110, 110);
     context.font = "12px Arial";
    context.fillText("" + username, 35, 452);
    context.fillText("Score: " + score, 32, 470);
   
    if (levelComplete)
    {
        context.drawImage(startSprite, 0, 0, canvas.width, canvas.height)
       context.drawImage(nextbutton.spritesheet, nextbutton.x,  nextbutton.y, nextbutton.width, nextbutton.height);
    }
   }
  if (GameState === WIN) {
    context.drawImage(youWinSprite, 0, 0, canvas.width, canvas.height);
   // context.drawImage(leaderSprite, 0, 0, canvas.width/5, canvas.height/5);
  // drawLeadar();
   context.drawImage(leaderSprite, 0, 0, 200, 400);
      context.font = "20px Arial";
   context.fillText("" + username, canvas.width-  1050, 150);
    context.drawImage(playAgainButton.spritesheet, playAgainButton.x, playAgainButton.y, playAgainButton.width, playAgainButton.height);
    drawLeadar();
    if (!winPlayed) {
      winAudio.play();
      winPlayed = true;
    }
   // startGame();
   // GameState = GAMEPLAY;
}
if (GameState === LOSE) {
    context.drawImage(gameOverSprite, 0, 0, canvas.width, canvas.height);
   // context.drawImage(leaderSprite, 0, 0, canvas.width/5, canvas.height/5);
   //drawLeadar();
   context.drawImage(leaderSprite, 0, 0, 200, 400);
    context.font = "20px Arial";
   context.fillText("" + username, canvas.width-  1050, 150);
    drawLeadar();
    context.drawImage(playAgainButton.spritesheet, playAgainButton.x, playAgainButton.y, playAgainButton.width, playAgainButton.height);
   if (!gameOverPlayed) {
      gameOverAudio.play();
      gameOverPlayed = true;
    }
   // startGame();
    //GameState = GAMEPLAY;
}
//context.drawImage(gomaze1.spritesheet, gomaze1.x, goground.y, gomaze1.width, gomaze1.height)
    //context.drawImage(tree,400,400,0,0);
   //context.drawimage(tree, 0, 0, 200, 200);
}




function bindButton(button, action) {
  // Mouse
  button.addEventListener("mousedown", () => gamerInput = new GamerInput(action));
  button.addEventListener("mouseup",   () => gamerInput = new GamerInput("None"));
  
  button.addEventListener("touchstart", (e) => {
    e.preventDefault(); // stop mouse event firing after touch
    gamerInput = new GamerInput(action);
  }, { passive: false });
  button.addEventListener("touchend",   () => gamerInput = new GamerInput("None"));
  button.addEventListener("touchcancel",() => gamerInput = new GamerInput("None"));
}




//music button / loop
musicToggleBtn.addEventListener('click', () => {
  if (backgroundAudio.paused) {
    backgroundAudio.play();
    backgroundAudio.loop = true; 
    musicToggleBtn.textContent = "Mute";
  } else {
    backgroundAudio.pause();
    musicToggleBtn.textContent = "Play";
  }
});

function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (event.touches && event.touches.length > 0) {
        // Touch 
        mouseX = (event.touches[0].clientX - rect.left) * scaleX;
        mouseY = (event.touches[0].clientY - rect.top) * scaleY;
    } else if (event.clientX !== undefined && event.clientY !== undefined) {
        // Mouce 
        mouseX = (event.clientX - rect.left) * scaleX;
        mouseY = (event.clientY - rect.top) * scaleY;
    }

    console.log("Mouse/Touch X:", mouseX, "Y:", mouseY);
}

canvas.addEventListener("mousedown", function (e)
{
    getMousePosition(canvas, e)
    buttonPress()
})

//button1Hight.addEventListener('click', () => {

//if (blueButton)

//blueS
//})

function buttonPress()
{
    if (GameState === START)
    {
        if (mouseX > startbutton.x && mouseX < startbutton.x + button1Width  &&
    mouseY > startbutton.y && mouseY < startbutton.y + button1Height)
        {
            if (mouseY > startbutton.y && mouseY < startbutton.y + button1Height  &&
    mouseY > startbutton.y && mouseY < startbutton.y + button1Height)
            {
                GameState = GAMEPLAY
                startGame()
            }
        }
    }
        
    if (GameState === WIN)
    {
        if (mouseX > playAgainButton.x && mouseX < playAgainButton.x + button3Width  &&
    mouseY > startbutton.y && mouseY < startbutton.y + button1Height)
        {
            if (mouseY > playAgainButton.y && mouseY < playAgainButton.y + button3Height  &&
    mouseY > startbutton.y && mouseY < startbutton.y + button1Height)
            {
               GameState = GAMEPLAY
               startGame()
            }
        }
    }

    if (GameState === LOSE)
    {
       if (mouseX > playAgainButton.x && mouseX < playAgainButton.x + button3Width  &&
    mouseY > startbutton.y && mouseY < startbutton.y + button1Height)
        {
            if (mouseY > playAgainButton.y && mouseY < playAgainButton.y + button3Height  &&
    mouseY > startbutton.y && mouseY < startbutton.y + button1Height)
            {
                GameState = GAMEPLAY
                startGame()
            }
        }
    }

    if (GameState === GAMEPLAY && levelComplete)
    {
        if (mouseX > nextbutton.x && mouseX < nextbutton.x + button2Width  &&
    mouseY > startbutton.y && mouseY < startbutton.y + button1Height)
        {
            if (mouseY > nextbutton.y && mouseY < nextbutton.y + button2Height  &&
    mouseY > startbutton.y && mouseY < startbutton.y + button1Height)
            {
                levelComplete = false

                if (level < 3)
                {
                    nextLevel()
                }
                else
                {
                    GameState = WIN
                }
          
            }
        }
    }
}



function displayTitle()
{
    let gostart = new GameObject(startSprite, 100, 100, 200, 200);
    
    //fill("pink");
    
    //text("Press enter to start the game", 300, 500);

}
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
let gamerInput = new GamerInput("None"); //No Input
 

function clickableDpadReleased() {
    console.log(event);
}
function clickDpadYellow(){
    console.log(event);

}
function clickDpadBlue(){
    console.log(event);
}
function clickDpadRed(){
    console.log(event);
}
function clickDpadGreen(){
    console.log(event);
}


//yellowButton.addEventListener("mousedown", () => gamerInput = new GamerInput("Up"));
//yellowButton.addEventListener("mouseup", () => gamerInput = new GamerInput("None"));
//yellowButton.addEventListener("touchstart", () => gamerInput = new GamerInput("Up"));
//yellowButton.addEventListener("touchend", () => gamerInput = new GamerInput("None"));
//yellowButton.addEventListener("touchcancel", () => gamerInput = new GamerInput("None"));

//blueButton.addEventListener("mousedown", () => gamerInput = new GamerInput("Left"));
//blueButton.addEventListener("mouseup", () => gamerInput = new GamerInput("None"));
//blueButton.addEventListener("touchstart", () => gamerInput = new GamerInput("Left"));
//blueButton.addEventListener("touchend",  () => gamerInput = new GamerInput("None"));
//blueButton.addEventListener("touchcancel", () => gamerInput = new GamerInput("None"));

//redButton.addEventListener("mousedown", () => gamerInput = new GamerInput("Right"));
//redButton.addEventListener("mouseup", () => gamerInput = new GamerInput("None"));
//redButton.addEventListener("touchstart", () => gamerInput = new GamerInput("Right"));
//redButton.addEventListener("touchend",  () => gamerInput = new GamerInput("None"));
//redButton.addEventListener("touchcancel", () => gamerInput = new GamerInput("None"));

//greenButton.addEventListener("mousedown", () => gamerInput = new GamerInput("Down"));
//greenButton.addEventListener("mouseup", () => gamerInput = new GamerInput("None"));
//greenButton.addEventListener("touchstart", () => gamerInput = new GamerInput("Down"));
//greenButton.addEventListener("touchend",  () => gamerInput = new GamerInput("None"));
//greenButton.addEventListener("touchcancel", () => gamerInput = new GamerInput("None"));

let yellowButton = document.getElementsByClassName("yellow")[0];
let blueButton = document.getElementsByClassName("blue")[0];
let redButton = document.getElementsByClassName("red")[0];
let greenButton = document.getElementsByClassName("green")[0];

bindButton(yellowButton, "Up");
bindButton(blueButton,   "Left");
bindButton(redButton,    "Right");
bindButton(greenButton,  "Down");


function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);
    //console.log("Keycode: " + event.keyCode);

    if (event.type === "keydown") {
        switch (event.keyCode) {
             
            case 37: // Left Arrow
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38: // Up Arrow
                gamerInput = new GamerInput("Up");      
                break; //Up key
            case 39: // Right Arrow
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40: // Down Arrow
                gamerInput = new GamerInput("Down");
                break; //Down key
          //  case 32:
              //  speed = 4;
             //   break;
            default:
                gamerInput = new GamerInput("None"); //No Input
        }

   } else {
        gamerInput = new GamerInput("None");
      
                speed = 5;  
            
   }
     if (event.type === "click") {
        switch (event.key) {
            case "blueButton": // Left Arrow // blue
                //gamerInput = new GamerInput("Left");
                blueButton.classList.add("left");
                break; //Left key
            case "yellowButton": // Up Arrow // yellow
                yellowButton.classList.add("up");
                //gamerInput = new GamerInput("Up");
                break; //Up key
            case "redButton": // Right Arrow // red
                redButton.classList.add("right");    
                //gamerInput = new GamerInput("Right");
                break; //Right key
            case "greenButtom": // Down Arrow // green
                greenButton.classList.add("down");
                //gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                //gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        //gamerInput = new GamerInput("None");
        redButton.classList.remove("right");
        blueButton.classList.remove("left");
        yellowButton.classList.remove("up");
        greenButton.classList.remove("down");

    }
    speed = 5;

if (event.type === "touchstart") {
        switch (event.key) {
            case "blueButton": // Left Arrow // blue
                //gamerInput = new GamerInput("Left");
                blueButton.classList.add("left");
                break; //Left key
            case "yellowButton": // Up Arrow // yellow
                yellowButton.classList.add("up");
                //gamerInput = new GamerInput("Up");
                break; //Up key
            case "redButton": // Right Arrow // red
                redButton.classList.add("right");    
                //gamerInput = new GamerInput("Right");
                break; //Right key
            case "greenButtom": // Down Arrow // green
                greenButton.classList.add("down");
                //gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                //gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        //gamerInput = new GamerInput("None");
        redButton.classList.remove("right");
        blueButton.classList.remove("left");
        yellowButton.classList.remove("up");
        greenButton.classList.remove("down");

    }
    speed = 5;

}


let timeRemaining = 25;


let timerInterval;

function setTimer() {
    if (GameState !== GAMEPLAY) return;

    clearInterval(timerInterval); // stop previous
    timeRemaining = 25;

    timerInterval = setInterval(() => {
        if (!levelComplete)
        {
            timeRemaining--;
        }
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
           // if gameplafalse?
            GameState = LOSE;
            
        }
    }, 1000);
}

function drawTimer() {


     let timerSprite = new Image();
    timerSprite.src = "img/timerBox.png";
    
    context.drawImage(timerSprite, canvas.width - 110, -20, 110, 110);
   // context.drawImage(timerSprite, canvas.width - 1110, -1120, 110, 110);
    context.font = "17px Arial ";
    context.fillStyle = "black";
    context.fillText("Time-" + timeRemaining,  canvas.width - 89, 45);
    
   // if (timeRemaining === 1){
// let loseSprite = new Image();
   // loseSprite.src = "img/gameover.png";
    
   // context.drawImage(loseSprite, canvas.width - 110, -20, 110, 110)
   // }
      
}


//colltion attempt 
//function collision(){

 
// if (gomush.x < bushSprite.x + scaledWidth && //collision from left to right
    // gomush.x + gomush > bush.x && // collision from right to left
    //gomush.y < bush.y + scaledHeight && // collision from top to bottom
    // gomush.y + gomush > bush.y // collision from bottom to top
   // )
   // console.log("collision bush");

//if (gomush.x < petalSprite.x + scaledWidth && //collision from left to right
   //  gomush.x + gomush > petal.x && // collision from right to left
   //  gomush.y < petal.y + scaledHeight && // collision from top to bottom
   //  gomush.y + gomush > petal.y // collision from bottom to top
   // )
   // console.log("collision petal");

//}



function update() {
    if (canvas.style.display === "block")
    {
        username = localStorage.getItem('username');
    }
    // console.log("Update");
    // Check Input
    if (gamerInput.action === "Up") {
        if (gomush.y < 0){
            console.log("player at top edge");

        }
        else{
            // collision check here
            gomush.y -= speed; // Move Player Up
            currentFrame = 1
        }
    } else if (gamerInput.action === "Down") {
        if (gomush.y + scaledHeight > canvas.height){
            console.log("player at bottom edge");
        }
        else{
            // collision check here
            gomush.y += speed; // Move Player Down
            currentFrame = 0
        }
    } else if (gamerInput.action === "Left") {
        if (gomush.x < 0){
            console.log("player at left edge");
            
        }
        else{
            // collision check here
            gomush.x -= speed; // Move Player Left
            currentFrame = 3
        }
    } else if (gamerInput.action === "Right") {
        if (gomush.x + scaledWidth > canvas.width){

        }
        else{
            // collision check here
            gomush.x += speed; // Move Player Right
            currentFrame = 2
        }
    } else if (gamerInput.action === "None") {
    }



}
  
// When level complete -> score += 100 * timeRemaining
// var hiScore
// if score > hiScore {hiScore = score, display "new hi score"}
// newHiScore sprite -> says "new hi score"
// timer for new hi score -> draw if timer > 0
// Reset score at end of game, but not hiScore
// local storage . iten 

    
 

function leader(){
   if (levelComplete)
   {
    
   }
   // context.font = "17px Arial ";
   // context.fillStyle = "green ";
    //context.fillText(" " + hiscore,  canvas.width);


}
function drawLeadar(){
    leader();

     context.font = "15px Arial ";
    context.fillStyle = "black ";
     context.fillText("Score: " + score, canvas.width-  1050, 250);
    context.fillText("High Score: " + hiScore,  canvas.width-  1050, 200);

}




const widthMaze = 1100;
const hightMaze = 500;
const CELL_SIZE = 100;
const WALL_COLOR = "#fabcc6";
const PATH_COLOR = "#ff002b";
const ROWS = 5;
const COLS = 11;


let level = 0

let bushSprite = new Image ();
bushSprite.src = "img/bush.png";

let petalSprite = new Image();
petalSprite.src = "img/flowerO.png";


//let bush = Array(COLS)
//  .fill()
//  .map(() => Array(ROWS).fill(new GameObject(bushSprite, 0, 0, CELL_SIZE, CELL_SIZE)));


let maze = Array(COLS)
  .fill()
  .map(() => Array(ROWS).fill(1));


  //let petal = Array(COLS)
  //.fill()
  //.map(() => Array(ROWS).fill(new GameObject(petalSprite, 0, 0, CELL_SIZE, CELL_SIZE)));

  let bush = Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => new GameObject(bushSprite, c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE)));

let petal = Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => new GameObject(petalSprite, c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE)));

// 0 is path
// 1 is wall
// 2 is petal

mazeLevel1 = [[0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 
              [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
              [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
              [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
              [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2]]

mazeLevel2 = [[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
              [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1],
              [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
              [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 2]]

mazeLevel3 = [[0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1], 
              [1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
              [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
              [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2]]

maze = mazeLevel1

let input_form = document.forms["helloForm"];

function startGame() {
    input_form.style.display = "none";
    canvas.style.display = "block";
    //level one pos/timer
  level = 0;
  gomush.x = 0;
  gomush.y = 0;
  maze = mazeLevel1;
  setTimer();
  nextLevel()

   winPlayed = false;
  gameOverPlayed = false;
}

function nextLevel()
{
   // completeLevel();
    if (GameState != GAMEPLAY)
    {
        return
    }
        //timer wont start?
    levelComplete = false;
           if (level === 0) {
         setTimer();
         score = 0;
         console.log("Start")
         level = 1
          return
  }
   else
         if (level === 1)
    {
        console.log("yay")
        setTimer();
        console.log("Level 1 " + level)
        gomush.x = 0;//pos 
        gomush.y = 0;
        maze = mazeLevel2
        level = 2
        return
    }
        else if (level === 2)
    {//maze 2 skipped?
        setTimer();
        gomush.x = 0;//pos reset 
        gomush.y = 0;
        maze = mazeLevel3
        level = 3
        console.log("Level 2 " + level)
        return
    }
        else if (level === 3)
    {
        setTimer();
        gomush.x = 0;//pos reset 
        gomush.y = 0;
        console.log("Level 3 " + level)
        // End of game
        return
    }
    // reset player position
    
     
}

//function levelButtonStart(){

//let startSprite = new Image();
//    startSprite.src = "img/start.png";
    
//    context.drawImage(startSprite, canvas.width - 110, -20, 110, 110);

//button2.addEventListener('click');
//    context.font = "17px Arial ";
//    context.fillStyle = "black";
//    context.fillText("Start game");

//}


//function levelButtonNext(){

//    button2.addEventListener('click');
//    context.font = "17px Arial ";
 //   context.fillStyle = "black";
//    context.fillText("Next Level");

//}

let petalCollected = false; 

function collision() {

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
   
             
            if (maze[r][c] === 1 && isColliding(gomush, bush[r][c])) {
                         if (gamerInput.action === "Up") gomush.y += speed;
                if (gamerInput.action === "Down") gomush.y -= speed;
                if (gamerInput.action === "Left") gomush.x += speed;
                if (gamerInput.action === "Right") gomush.x -= speed;
                // maze colltion
                }

            // Petal collision
            if (maze[r][c] === 2 && isColliding(gomush, petal[r][c])) {
                console.log(" petal");
                petalCollected = true; // petal sound effect 
                if (!levelComplete) 
                {rainAudio.play();}
                   levelComplete = true
                   score += 100 * timeRemaining;
                   gomush.x = 0
                    gomush.y = 0
                   console.log(score)
                   if (score >= hiScore) {
                    hiScore = score;
                    canUpScroe = false;
                    localStorage.setItem('hiScore', hiScore);
                    }
                   if (level === 3)
                   {
                    GameState = WIN
                   }
                }
            }
        }
    }


function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function drawMaze() {
  //context.clearRect(0, 0, canvas.width, canvas.height);

     for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (maze[r][c] === 1) {
                
                bush[r][c].x = c * CELL_SIZE;
                bush[r][c].y = r * CELL_SIZE;
                context.drawImage(bushSprite, bush[r][c].x, bush[r][c].y, bush[r][c].width, bush[r][c].height);
            }
            if (maze[r][c] === 2) {
                petal[r][c].x = c * CELL_SIZE;
                petal[r][c].y = r * CELL_SIZE;

                context.drawImage(petalSprite, petal[r][c].x, petal[r][c].y, petal[r][c].width, petal[r][c].height);
      }
    }
  }
}
  

function gameloop() {
    //calls the setup function on first itteration of loop [Note:bool variable method used to allow for toggeling setupComplete to false and triggering setup() for starting a new level of the game]
    /*let setupComplete = false;

    if(setupComplete == false){
        setupComplete = setup(setupComplete);
    }
    */ 
        if (!levelComplete)
        {
            update();
        }
  
        draw();
         collision();
         window.requestAnimationFrame(gameloop);
   
}

window.addEventListener('touchstart', input);
window.addEventListener('keydown', input);
window.addEventListener('keyup', input);
window.requestAnimationFrame(gameloop);


