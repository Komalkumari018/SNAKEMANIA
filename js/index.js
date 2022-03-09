// game constants and variables 

let InputDir = {x: 0,y:0};

let foodsound= new Audio('music/food.mp3');
let gameoversound = new Audio('music/gameover.mp3');
let movesound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music1.mp3');

let speed=4;
let last_paint_time =0;

let snake_arr = [{x: 13 , y: 15}];
let food = {x:6 , y: 7};
let score = 0;
let level = 1;
let hiscore;

//game functions 

function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime - last_paint_time)/1000 < 1/speed){return;}
    
    last_paint_time=ctime;
    gameEngine();
}

function gameEngine()
{
     // part 1 : updating the snake  array and food variable 
     if(isCollide(snake_arr)==false) musicSound.play();
     
     if(isCollide(snake_arr) === true)
     {
         gameoversound.play();
         musicSound.pause();
         InputDir={x: 0,y: 0};
         alert("Total score : "+score +"\nLevel Achieved : "+level+"\nGame Over ,Press any key to play again");
         snake_arr = [{x: 13 , y: 15}];
         musicSound.play();
         score = 0;
         level=1;
         speed=4;

         document.getElementById("score").innerHTML = "Score : " + score;
         document.getElementById("level").innerHTML="Level : " + level;
         let a=localStorage.getItem("highscore");
         document.getElementById("highscore").innerHTML="Highest Score : "+a;
     }
      // if food is eaten the increment score and regenerate food
      if(snake_arr[0].y === food.y && snake_arr[0].x === food.x)
      {
          foodsound.play();
          score += 1;
          document.getElementById("score").innerHTML = "Score : " + score;

          if(score % 5 ==0)
          {
              level+=1;
              speed+=2;
              document.getElementById("level").innerHTML="Level : " + level;
          }
          if(score>hiscore)
          {
              hiscore=score;
              localStorage.setItem("highscore", JSON.stringify(hiscore));
          }
          snake_arr.unshift({x: snake_arr[0].x + InputDir.x , y: snake_arr[0].y + InputDir.y});

         // to generate random number a to b  Math.round(a + (b-a)*Math.random())
         // grid is from 0 to 18 but we will do from 2 to 16

         let a=2;
         let b=16;
         food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
      }
       //moving snake 
       for(let i = snake_arr.length - 2; i>=0 ; i--)
       {
           snake_arr[i+1] = {...snake_arr[i]};
           //creating a object and assigning to the i which is equal to i+1
       }

       snake_arr[0].x += InputDir.x;
       snake_arr[0].y += InputDir.y;

     //part 2 : display the snake and food 
     // display the snake 

     board.innerHTML = "";
     snake_arr.forEach((e,index) => {
       let snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // row is y and column is x
        if(index === 0){
            snakeElement.classList.add('snake_head');
        }
        else{
            snakeElement.classList.add('snake_body');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
 }

 function isCollide(snake)
 {
     // If you bump into yourself 
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
 }

// main logic starts here

let high = localStorage.getItem("highscore");

if(high==null)
{
    hiscore=0;
    document.getElementById("highscore").innerHTML="Highest Score : "+hiscore;
    localStorage.setItem("highscore",JSON.stringify(hiscore));
}
else 
{
    hiscore = JSON.parse(high);
    document.getElementById("highscore").innerHTML="Highest Score : "+high ;
}
// in any game it is very important to print the screeen each time some changes take place by the player 
// so for that reason we have game loop 

window.requestAnimationFrame(main);

// i had done keypress instead of keydown
window.addEventListener('keydown', e => {
    InputDir = {x: 0 , y: -1};
    movesound.play();
    switch (e.key) 
    {
        case "ArrowUp":
            // console.log("ArrowUp");
            InputDir.x= 0;
            InputDir.y= -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            InputDir.x= 0;
            InputDir.y= 1;
            break;
                
        case "ArrowLeft":
            // console.log("ArrowLeft");
            InputDir.x= -1; 
            InputDir.y= 0;
            break;
         
        case "ArrowRight":
            // console.log("ArrowRight");
            InputDir.x= 1;
            InputDir.y= 0;
            break;
    
        default:
            break;
    }
});
