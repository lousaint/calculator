function operate(a, b, func) {
    return func(a, b);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return "ERR";
    }
}

let displayNumber = 0;

function updateDisplay(newNumber) {
    displayNumber = newNumber;
    document.getElementById('display').textContent = displayNumber;
}

function enterDigit(d) {
    let digit = parseInt(d);
    if (digit >= 0 && digit <= 9) {
        if (operator != '') {
            clearDisplay();
        }
        updateDisplay(displayNumber * 10 + digit);        
    }
}
const numberButtons = document.querySelectorAll("#numbers button");
numberButtons.forEach(button => button.addEventListener('click', function(e) {
    enterDigit(this.dataset.value);
}));

function clearDisplay() {
    updateDisplay(0);
}
document.getElementById('button-clear').addEventListener('click', clearDisplay);


let operator = '';
let operandA = '';
function enterOperator(operatorValue) {
    //to do: handle order of operations correctly
    operator = operatorValue;
    operandA = displayNumber;
}

const operatorButtons = document.querySelectorAll('.button.operator');
operatorButtons.forEach(button => button.addEventListener('click', function(e) {
    enterOperator(this.dataset.value);
}));

function equals() {
    //to do: clear display on next enterDigit
    updateDisplay(operate(operandA, displayNumber, window[operator]));
    operator = '';
    operandA = '';
}
document.getElementById('button-equals').addEventListener('click', equals);