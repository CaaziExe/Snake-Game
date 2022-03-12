function getElement(obj){
    return document.querySelector(obj);
}

function sleep(ms){
    return new Promise(r => setTimeout(r, ms));
}

function getRandomNum(min, max){
    return Math.floor(Math.random() * ((max+1) - min) + min);
}

let canvas = getElement("#canv");
let l_score = getElement("#score");

let ctx = canvas.getContext("2d");

let score = 0;
l_score.innerText = `Score: ${score}`;

//make grid on canvas
let canvasWidth = canvas.width;
let idx = 17;
let rectSize = canvasWidth/idx;
let thickness = 0.8;

for(let i=0; i<idx; i++){
    for(let j=0; j<idx; j++){
        ctx.fillStyle = "#ffffff";
        ctx.fillRect((rectSize*i)-thickness, (rectSize*j)-thickness, rectSize+(thickness*2), rectSize+(thickness*2));
        ctx.beginPath();
        ctx.fillStyle = "#000435";
        ctx.fillRect(rectSize*i, rectSize*j, rectSize, rectSize);
        
    }
}

let gameStart = false;
let changeDir = false;
let snakeDir;
let key;
let keyPast;

//make snake head
let posX = 5;
let posY = 9;
let trail = [{x: 5, y: 9}];
let snakeSpeed = 2;

let foodPosX = 13;
let foodPosY = 9;
let foodPosXPast;
let foodPosYPast;
let snakeLength = 0;

    //draw snake head
ctx.beginPath();
ctx.fillStyle = "green";
ctx.fillRect(rectSize*posX, rectSize*posY, rectSize, rectSize);
ctx.beginPath();
ctx.fillStyle = "red";
ctx.fillRect(rectSize*(foodPosX), rectSize*(foodPosY), rectSize, rectSize);

async function snakeMove(){
    while(gameStart){
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect((rectSize*trail[0].x)-thickness, (rectSize*trail[0].y)-thickness, rectSize+(thickness*2), rectSize+(thickness*2));
        ctx.beginPath();
        ctx.fillStyle = "#000435";
        ctx.fillRect(rectSize*trail[0].x, rectSize*trail[0].y, rectSize, rectSize);

        if(trail.length != snakeLength){
            trail.splice(0, 1);
        }

        if(key == 37 && snakeDir != "r" && (keyPast != 37 || keyPast != 39)){
            snakeDir = "l";
        }else if(key == 38 && snakeDir != "d" && (keyPast != 38 || keyPast != 40)){
            snakeDir = "u";
        }else if(key == 39 && snakeDir != "l" && (keyPast != 37 || keyPast != 39)){
            snakeDir = "r";
        }else if(key == 40 && snakeDir != "u" && (keyPast != 38 || keyPast != 40)){
            snakeDir = "d";
        }
        
        if(snakeDir == "l"){
            posX--;
        }else if(snakeDir == "u"){
            posY--;
        }else if(snakeDir == "r"){
            posX++;
        }else if(snakeDir == "d"){
            posY++;
        }
        
        if(posX >= idx){
            posX = 0;
        }else if(posX < 0){
            posX = idx-1;
        }else if(posY >= idx){
            posY = 0;
        }else if(posY < 0){
            posY = idx-1;
        }
        
        ctx.fillStyle = "green";
        ctx.fillRect(rectSize*posX, rectSize*posY, rectSize, rectSize);
        
        if(trail.some(pos => {return (posX == pos.x && posY == pos.y)})){
            alert(`Game Over\nYour Score is ${score}`);
            document.location.reload();
            break;
        }
        
        trail.push({x: posX, y: posY});
        
        if(posX == foodPosX && posY == foodPosY){
            score++;
            l_score.innerText = `Score: ${score}`;
            snakeLength++;
            do{
                foodPosX = getRandomNum(0, idx-1);
                foodPosY = getRandomNum(0, idx-1);

            }while(trail.some(pos => {return (foodPosX == pos.x && foodPosY == pos.y)}) ||
            (foodPosX == foodPosXPast && foodPosY == foodPosYPast));
            
            foodPosXPast = foodPosX;
            foodPosYPast = foodPosY;

            ctx.fillStyle = "red";
            ctx.fillRect(rectSize*foodPosX, rectSize*foodPosY, rectSize, rectSize);
        }

        if(changeDir){
            break;
        }

        await sleep(200/snakeSpeed);
        changeDir = false;
    }
}

document.onkeydown = event => {
    key = event.keyCode;
    if(keyPast != null && keyPast != key && !((keyPast == 37 && key == 39) || (keyPast == 39 && key == 37) || (keyPast == 38 && key == 40) || (keyPast == 40 && key == 38))){
        changeDir = true;
    }else{
        changeDir = false;
    }
    if((key == 37 || key == 38 || key == 39 || key == 40)){
        gameStart = true;
        if(keyPast != null || keyPast == key ){
            
        }else if(!((keyPast == 37 && key == 39) || (keyPast == 39 && key == 37) || (keyPast == 38 && key == 40) || (keyPast == 40 && key == 38))){
            snakeMove();
            keyPast = key;
        }
    }
};