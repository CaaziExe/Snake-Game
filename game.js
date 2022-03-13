function getElement(obj){
    return document.querySelector(obj);
}

function sleep(ms){
    return new Promise(r => setTimeout(r, ms));
}

function getRandomNum(min, max){
    return Math.floor(Math.random() * ((max+1) - min) + min);
}

function gameOver(){
    alert(`Game Over\nYour Score is ${score}`);
    document.location.reload();
}

let canvas = getElement("#canv");
let l_score = getElement("#score");

let ctx = canvas.getContext("2d");

let score = 0;
l_score.innerText = `Score: ${score}`;

//make grid on canvas
let idx = 17;
let rectSize = canvas.width/idx;
let thickness = 0.8;

function drawBoard(){
    for(let i=0; i<idx; i++){
        for(let j=0; j<idx; j++){
            ctx.fillStyle = "#ffffff";
            ctx.fillRect((rectSize*i)-thickness, (rectSize*j)-thickness, rectSize+(thickness*2), rectSize+(thickness*2));
            ctx.fillStyle = "#000435";
            ctx.fillRect(rectSize*i, rectSize*j, rectSize, rectSize);
            
        }
    }
}

let gameStart = false;
let changeDir = false;
let snakeDir = "";
let key;
let keyPast;

let eating = false;
let snakeSpeed = Number(localStorage.getItem("speed"));

//make snake head
let posX = 3;
let posY = 9;
let xVel = 0;
let yVel = 0;
let trail = [{x: 3, y: 9}];

let foodPosX = 13;
let foodPosY = 9;
let foodPosXPast;
let foodPosYPast;
let snakeLength = 0;

    //draw snake head
function drawSnakeHead(){
    ctx.fillStyle = "green";
    ctx.fillRect(rectSize*posX, rectSize*posY, rectSize, rectSize);
}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(rectSize*(foodPosX), rectSize*(foodPosY), rectSize, rectSize);
}

drawBoard();
drawSnakeHead();
drawFood();

async function snakeMove(){
    while(true){
        drawBoard();
        drawFood();

        for(let i=0; i<snakeLength; i++){
            ctx.fillStyle = "green";
            ctx.fillRect(rectSize*trail[trail.length-1-i].x, rectSize*trail[trail.length-1-i].y, rectSize, rectSize);
        }
        
        posX += xVel;
        posY += yVel;
        
        if(eval(localStorage.getItem("borderless"))){
            if(posX >= idx){
                posX = 0;
            }else if(posX < 0){
                posX = idx-1;
            }else if(posY >= idx){
                posY = 0;
            }else if(posY < 0){
                posY = idx-1;
            }
        }else{
            if(posX >= idx || posX < 0 || posY >= idx || posY < 0){
                gameOver();
                break;
            }
        }
        
        drawSnakeHead()

        if(trail.some(pos => {return (posX == pos.x && posY == pos.y)})){
            gameOver();
            break;
        }
        
        trail.push({x: posX, y: posY});     
        
        if(posX == foodPosX && posY == foodPosY){
            score++;
            l_score.innerText = `Score: ${score}`;
            
            snakeLength++;
            //console.log(trail[0], trail[1]);
            if(localStorage.getItem("mode") == "Reverse"){
                if(trail[1].x - trail[0].x == 1){
                    xVel = -1;
                    yVel = 0;
                    snakeDir = "l";
                }else if(trail[1].x - trail[0].x == -1){
                    xVel = 1;
                    yVel = 0;
                    snakeDir = "r";
                }else if(trail[1].y - trail[0].y == 1){
                    xVel = 0;
                    yVel = -1;
                    snakeDir = "u";
                }else if(trail[1].y - trail[0].y == -1){
                    xVel = 0;
                    yVel = 1;
                    snakeDir = "d";
                }
                //console.log(snakeDir);
                posX = trail[0].x;
                posY = trail[0].y;
                trail.reverse();
                console.log(posX, posY);
                
            }
            
            do{
                foodPosX = getRandomNum(0, idx-1);
                foodPosY = getRandomNum(0, idx-1);
                
            }while(trail.some(pos => {return (foodPosX == pos.x && foodPosY == pos.y)}) ||
            (foodPosX == foodPosXPast && foodPosY == foodPosYPast));
            
            foodPosXPast = foodPosX;
            foodPosYPast = foodPosY;
            
            drawFood();
        }
        
        if(trail.length != snakeLength){
            trail.splice(0, 1);
        }

        await sleep(200/snakeSpeed);
    }
}

document.onkeydown = event => {
    key = event.keyCode;
    if(!gameStart && (key == 37 || key == 38 || key == 39 || key == 40)){
        if(key == 37 && snakeDir != "r"){//left
            xVel = -1;
            yVel = 0;
            snakeDir = "l";
        }else if(key == 38 && snakeDir != "d"){//up
            xVel = 0;
            yVel = -1;
            snakeDir = "u";
        }else if(key == 39 && snakeDir != "l"){//right
            xVel = 1;
            yVel = 0;
            snakeDir = "r";
        }else if(key == 40 && snakeDir != "u"){//down
            xVel = 0;
            yVel = 1;
            snakeDir = "d";
        }
        snakeMove();
        gameStart = true;
    }

    if(key == 37 && snakeDir != "r"){//left
        xVel = -1;
        yVel = 0;
        snakeDir = "l";
    }else if(key == 38 && snakeDir != "d"){//up
        xVel = 0;
        yVel = -1;
        snakeDir = "u";
    }else if(key == 39 && snakeDir != "l"){//right
        xVel = 1;
        yVel = 0;
        snakeDir = "r";
    }else if(key == 40 && snakeDir != "u"){//down
        xVel = 0;
        yVel = 1;
        snakeDir = "d";
    }
};