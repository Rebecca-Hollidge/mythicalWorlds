const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");


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

//let width = 1100 
//let height = 500

var rainAudio = new Audio('img/raindrop.mp4');
//var backgroundAudio = new Audio('img/mushroom.mp4');
//backgroundAudio.play();


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

function draw() {
    //console.log("Draw is called!");
    context.clearRect(0,0, canvas.width, canvas.height);
   
 //context.drawImage(gostart.spritesheet, gostart.x, gostart.y, gostart.width, gostart.height)
   //context.drawImage(goground.spritesheet, goground.x, goground.y, goground.width, goground.height)

   //context.drawImage(gomush.spritesheet, 1, 1, 100, 100)
   context.drawImage(groundSprite, 0, 0, canvas.width, canvas.height)
   drawFrame(gomush.spritesheet, currentFrame, 0, gomush.x, gomush.y)
//context.drawImage(gomaze1.spritesheet, gomaze1.x, goground.y, gomaze1.width, gomaze1.height)
    //context.drawImage(tree,400,400,0,0);
   //context.drawimage(tree, 0, 0, 200, 200);
}

//movement input




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
            case 32:
                speed = 6;
                break;
            default:
                gamerInput = new GamerInput("None"); //No Input
        }

    } else {
        gamerInput = new GamerInput("None");
        speed = 3;
        
    }

}


function setTimer() {
  let totalTime = 15;
  let timeRemaining = totalTime;

  const interval = setInterval(() => {
    timeRemaining--;
    console.log("Time:", timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(interval);
      console.log("You lose");
      // Handle loss
    }
  }, 1000);
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
    // console.log("Update");
    // Check Input
    if (gamerInput.action === "Up") {
        if (gomush.y < 0){
            console.log("player at top edge");
            //.fillStyle = "red";

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
  




const widthMaze = 1100;
const hightMaze = 500;
const CELL_SIZE = 100;
const WALL_COLOR = "#fabcc6";
const PATH_COLOR = "#ff002b";
const ROWS = 5;
const COLS = 11;


let level = 1

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

mazeLevel3 = [[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1], 
              [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
              [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
              [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1],
              [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2]]

maze = mazeLevel1



function nextLevel()
{

    if (level === 1)
    {
        gomush.x = 0;//pos 
        gomush.y = 0;
        maze = mazeLevel2
        level = 2
        
    }
    if (level === 2)
    {//maze 2 skipped?
        gomush.x = 0;//pos reset 
        gomush.y = 0;
        maze = mazeLevel3
        level = 3
    }
    if (level === 3)
    {
        gomush.x = 0;//pos reset 
        gomush.y = 0;
        // End of game
        return
    }

    // reset player position
    
     
}



let petalCollected = false; 


function collision() {

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
   // for (let r = 0; r < COLS; r++) {
       // for (let c = 0; c < ROWS; c++) {

            // Bush collision
            //if (maze[c][r] === 1 && isColliding(gomush, bush[c][r]))
              //  console.log("bush");
             
            if (maze[r][c] === 1 && isColliding(gomush, bush[r][c])) {
                         console.log("bush");
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
                 rainAudio.play();
                   nextLevel();
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
drawMaze();
  

function gameloop() {
    //calls the setup function on first itteration of loop [Note:bool variable method used to allow for toggeling setupComplete to false and triggering setup() for starting a new level of the game]
    /*let setupComplete = false;

    if(setupComplete == false){
        setupComplete = setup(setupComplete);
    }
    */
  // Audio();
  
    //displayTitle();
  
 

      //audio.play();
      //bool = true;
       
  


     //   switch (event.keyCode) { 

              

       //     case 77:  

       //        bool = false; 

      //          break; } 

       // } 
    update();
    draw();
     collision();
    //draw();
    drawMaze();
    window.requestAnimationFrame(gameloop);
}

window.addEventListener('keydown', input);
// disable the second event listener if you want continuous movement
window.addEventListener('keyup', input);
window.requestAnimationFrame(gameloop);