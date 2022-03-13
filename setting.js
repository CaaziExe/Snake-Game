function getElement(obj){
    return document.querySelector(obj);
}

function updateText(txtvar, mode){
    txtvar.innerText = mode;
}

let b_borderless = document.createElement("input");
b_borderless.setAttribute("id", "b-borderless");
b_borderless.setAttribute("type", "checkbox");
if(localStorage.getItem("borderless") != null){
    b_borderless.checked = eval(localStorage.getItem("borderless"));
}
else{
    b_borderless.checked = true;
}
getElement("#f-borderless").appendChild(b_borderless);

let text_mode = document.createElement("span");
text_mode.setAttribute("id", "text-mode");
if(localStorage.getItem("mode") != null){
    text_mode.innerText = localStorage.getItem("mode");
}else{
    text_mode.innerText = "Normal";
}
getElement("#user-mode").appendChild(text_mode);

let text_speed = document.createElement("span");
text_speed.setAttribute("id", "text-speed");
if(localStorage.getItem("speed") != null){
    text_speed.innerText = localStorage.getItem("speed")+"x";
}else{
    text_speed.innerText = "1x";
}
getElement("#user-speed").appendChild(text_speed);

let bBorderless = getElement("#b-borderless");

let bPrevMode = getElement("#b-prev-mode");
let bNextMode = getElement("#b-next-mode");
let modeText = getElement("#text-mode");

let bPrevSpeed = getElement("#b-prev-speed");
let bNextSpeed = getElement("#b-next-speed");
let speedText = getElement("#text-speed");

bBorderless.onclick = function(){
    localStorage.setItem("borderless", `${bBorderless.checked}`);
}

let optMode = ["Normal", "Reverse"];
let idxMode = 0;
if(localStorage.getItem("mode") != null){
    for(let i in optMode){
        if(optMode[i] == localStorage.getItem("mode")){
            idxMode = i;
        }
    }
}

bPrevMode.onclick = function(){
    idxMode--;
    if(idxMode < 0){
        idxMode = optMode.length - 1;
    }else if(idxMode > optMode.length - 1){
        idxMode = 0;
    }
    updateText(modeText, optMode[idxMode]);
    localStorage.setItem("mode", optMode[idxMode]);
}

bNextMode.onclick = function(){
    idxMode++;
    if(idxMode < 0){
        idxMode = optMode.length - 1;
    }else if(idxMode > optMode.length - 1){
        idxMode = 0;
    }
    updateText(modeText, optMode[idxMode]);
    localStorage.setItem("mode", optMode[idxMode]);
}

let optSpeed = ["0.2", "0.5", "1", "2", "3"];
let idxSpeed = 2;
if(localStorage.getItem("speed") != null){
    for(let i in optSpeed){
        if(optSpeed[i] == localStorage.getItem("speed")){
            idxSpeed = i;
        }
    }
}

bPrevSpeed.onclick = function(){
    idxSpeed--;
    if(idxSpeed < 0){
        idxSpeed = optSpeed.length - 1;
    }else if(idxSpeed > optSpeed.length - 1){
        idxSpeed = 0;
    }
    updateText(speedText, optSpeed[idxSpeed]+"x");
    localStorage.setItem("speed", optSpeed[idxSpeed]);
}

bNextSpeed.onclick = function(){
    idxSpeed++;
    if(idxSpeed < 0){
        idxSpeed = optSpeed.length - 1;
    }else if(idxSpeed > optSpeed.length - 1){
        idxSpeed = 0;
    }
    updateText(speedText, optSpeed[idxSpeed]+"x");
    localStorage.setItem("speed", optSpeed[idxSpeed]);
}