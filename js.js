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
let newNum = "";
let oldNum = "";
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
        answer.innerHTML += buttonValue;
        history.innerHTML += buttonValue;
        newNum = answer.innerHTML;
        equalControl = false;
}

function toolClick(){  //operatorClick 함수
    toolValue = this.getAttribute("value");
    oldNum = answer.innerHTML;
    newNum = "";
    if(control){
        answer.innerHTML = "";
    } 
    history.innerHTML += toolValue;
};

function  equalClick(){ //equalButton Click 함수
    equalValue = this.getAttribute("value");
    oldNum = parseFloat(oldNum);
    newNum = parseFloat(newNum);
    fixed = "";
    switch (toolValue) {
        case "+":
            fixed = oldNum + newNum;
            fixedAnswer = test(fixed);
            answer.innerHTML = fixedAnswer;
            if(isNaN(fixedAnswer)){
                answer.innerHTML = "Error";
            }
            oldNum = answer.innerHTML;
            control = false;
            break;
        case "-":
            fixed = oldNum - newNum;
            fixedAnswer = test(fixed);
            answer.innerHTML = fixedAnswer;
            if(isNaN(fixedAnswer)){
                answer.innerHTML = "Error";
            }
            oldNum = answer.innerHTML;
            control = false;
            break;
        case "*":
            fixed = oldNum * newNum;
            fixedAnswer = test(fixed);
            answer.innerHTML = fixedAnswer;
            if(isNaN(fixedAnswer)){
                answer.innerHTML = "Error";
            }
            oldNum = answer.innerHTML;
            control = false;
            break;
        case "/":
            fixed = oldNum / newNum;
            fixedAnswer = test(fixed);
            answer.innerHTML = fixedAnswer;
            if(isNaN(fixedAnswer)){
                answer.innerHTML = "Error";
            }
            oldNum = answer.innerHTML;
            control = false;
            break;                          
        default:
            answer.innerHTML = "Error";
    }

    if(!equalControl){
        history.innerHTML += `${equalValue}${answer.innerHTML}`; 
        equalControl = true; 
    } else if (equalControl) {
        history.innerHTML += `${toolValue}${answer.innerHTML}`;  
    }

}


function claenButton() {
    oldNum = "";
    newNum = "";
    answer.innerHTML = "0";
    history.innerHTML = "0";
    control = false;
    historyControl = false;
}