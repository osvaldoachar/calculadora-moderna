const display1El = document.querySelector('.display-1');
const display2El = document.querySelector('.display-2');
const tempResultEl = document.querySelector('.temp-result');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.equal');
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector('.last-entity-clear');

let dis1num = '';
let dis2num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersEl.forEach( number => {
    number.addEventListener('click', (e)=> {
        if(e.target.innerText === '.' && !haveDot){
            haveDot = true;
        }else if(e.target.innerText === '.' && haveDot){
            return;
        }
        dis2num += e.target.innerText;
        display2El.innerText = dis2num;
    })
});
operationEl.forEach( operation => {
    operation.addEventListener('click', (e)=>{
        if(!dis2num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(dis1num && dis2num && lastOperation){
            mathOperation();
        }else{
            result = parseFloat(dis2num);
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    })
});

function clearVar(name = ''){
    dis1num += dis2num+' '+ name + ' ';
    display1El.innerText = dis1num;
    display2El.innerText = '';
    dis2num = '';
    tempResultEl.innerText = result;
}
function mathOperation(){
    if(lastOperation === "x"){
        result = parseFloat(result) * parseFloat(dis2num);
    }else if(lastOperation === '÷'){
        result = parseFloat(result) / parseFloat(dis2num);
    }else if(lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2num);
    }else if(lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2num);
    }else if(lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2num);
    }
    }
equalEl.addEventListener('click', (e) =>{
    if(!dis1num || !dis2num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = '';
    dis2num = result;
    dis1num = '';
})
clearAllEl.addEventListener('click', (e) =>{
    display1El.innerText = '0';
    display2El.innerText = '0';
    dis1num = '';
    dis2num = '';
    result = '';
    tempResultEl.innerText = '0';
});

clearLastEl.addEventListener('click', (e) => {
    display2El.innerText = '';
    dis2num = '';
});

window.addEventListener('keydown', (e) => {
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'  
        ) {
        clickButtonEl(e.key);
    }else if(
        e.key === '÷' ||
        e.key === '-' ||
        e.key === '+' ||
        e.key === '%' 
    ){
        clickOperation(e.key);
    }else if(  e.key === "*"){
        clickOperation('x');
    }else if(e.key == 'Enter'  || e.key === "="){
        clickEqual();
    }
});
function clickButtonEl(key){
    numbersEl.forEach(buttons =>{
if(buttons.innerText === key){
    buttons.click();
}
    })
};

function clickOperation(key){
    operationEl.forEach(buttons => {
        if(buttons.innerText === key){
            buttons.click();
            }
    })
};
function clickEqual(){
    equalEl.click();
}