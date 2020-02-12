const el = element => {
    if(element.charAt(0) === "#") {
        return document.querySelector(element);
    } else {
        return document.querySelectorAll(element);
    }
}  //element를 받아오는 식

const number = el(".number");       //필요한 element
const tool = el(".tool");
const answer = el("#answer");
const history = el("#answer2");
const clean = el("#clean");
const equal = el("#equal");
let equalControl = false;
let historyControl = false;
let control = false;
let last = false;
let oldNum = "";
let decimal = false;
let lastNum = "";
let lastNum2 = "";
let toolValue;


////addEvantListener 

for (let i = 0; i < number.length; i++){
    number[i].addEventListener('click', buttonClick);
    number[i].addEventListener('click', mexLength);
}
for (let i = 0; i < tool.length; i++){
    tool[i].addEventListener('click', toolClick);
}
equal.addEventListener('click', equalClick);
clean.addEventListener('click', claenButton);

function mexLength(){ ///length를 받아와 10자리 이상 입력시 경고
    const answer = document.getElementById('answer');
    if(answer.innerHTML.length === 11){
        answer.innerHTML = "Error";
        history.innerHTML = "최대 입력 범위 초과!!"
        historyControl = false;
        control = false;
    } 
}

function test(val){ ////소수점 slice
    val = val.toString().split(""); 
    if (val.indexOf(".") !== -1){ 
       const valTest = val.slice(val.indexOf(".") + 1, val.length); 
        val2 = val.slice(0, val.indexOf(".") + 1); 
        for(i = 0; valTest[i] < 1; i++ ){ 
        }
        valTest2 = valTest.join("").slice(0, i + 2); 
        if (valTest[valTest2.length-1] === "0"){ 
            valTest2 = valTest2.slice(0, -1);
        }
        return val2.join("") + valTest2; 
    } else {
        return val.join(""); 
    }
}


function buttonClick(){  //numberClick 함수
        buttonValue = this.getAttribute("value");
        if(!control){
            answer.innerHTML = "";
            control = true;
        }
        if(!historyControl){
            history.innerHTML = "";
            historyControl = true;
        }
        if(decimal){
            lastNum = "";
            lastNum2 = "";
            decimal = false;
        }
        answer.innerHTML += buttonValue;
        history.innerHTML += buttonValue;
        oldNum = answer.innerHTML;
        lastNum = lastNum + buttonValue;
        equalControl = false;     
}

function toolClick(){  //operatorClick 함수
    toolValue = this.getAttribute("value");
    last = false;
    lastNum = lastNum + toolValue;
    decimal = false;
    if(control){
        answer.innerHTML = "";
    } 
    history.innerHTML += toolValue;
};

function  equalClick(){ //equalButton Click 함수
    equalValue = this.getAttribute("value");
    oldNum = parseFloat(oldNum);
    fixed = "";
    decimal = true;
    if(isNaN(lastNum)){
        answer.innerHTML = "Error";
        history.innerHTML = "Error";
    }
    switch (toolValue) {
        case "+":
            if(!last){
                fixed = lastNum;
                lastNum2 = test(eval(fixed));
                lastNum2 = parseFloat(lastNum2);
                answer.innerHTML = lastNum2;
                last = true;
            }   else if(last) {
                    lastNum2 = parseFloat(lastNum2);
                    fixed = lastNum2 + oldNum;
                    lastNum2 = test(eval(fixed));
                    answer.innerHTML = lastNum2;
                    lastNum = lastNum2;
                }
            control = false;
            break;
        case "-":
            if(!last){
                fixed = lastNum;
                lastNum2 = test(eval(fixed));
                lastNum2 = parseFloat(lastNum2);
                answer.innerHTML = lastNum2;
                last = true
            }   else if(last) {
                    lastNum2 = parseFloat(lastNum2);
                    fixed = lastNum2 - oldNum;
                    lastNum2 = test(eval(fixed));
                    answer.innerHTML = lastNum2;
                    lastNum = lastNum2;
                }
            control = false;
            break;
        case "*":
            if(!last){
                fixed = lastNum;
                lastNum2 = test(eval(fixed));
                lastNum2 = parseFloat(lastNum2);
                answer.innerHTML = lastNum2;
                last = true
            }   else if(last) {
                    lastNum2 = parseFloat(lastNum2);
                    fixed = lastNum2 * oldNum;
                    lastNum2 = test(eval(fixed));
                    answer.innerHTML = lastNum2;
                    lastNum = lastNum2;
                }
            control = false;
            break;
        case "/":
            if(!last){
                fixed = lastNum;
                lastNum2 = test(eval(fixed));
                lastNum2 = parseFloat(lastNum2);
                answer.innerHTML = lastNum2;
                last = true
            }   else if(last) {
                    lastNum2 = parseFloat(lastNum2);
                    fixed = lastNum2 / oldNum;
                    lastNum2 = test(eval(fixed));
                    answer.innerHTML = lastNum2;
                    lastNum = lastNum2;
                }
            control = false;
            break;
        default:
            answer.innerHTML = "Error!!!!";
    }
    return history.innerHTML = `${answer.innerHTML}`   
}


function claenButton() {
    oldNum = "";
    lastNum2 ="";
    lastNum = "";
    answer.innerHTML = "0";
    history.innerHTML = "0";
    control = false;
    historyControl = false;
}