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
let clearOnNextDigit = false;

function updateDisplay(newNumber) {
    displayNumber = newNumber;
    document.getElementById('display').textContent = displayNumber;
}

function enterDigit(d) {
    let digit = parseInt(d);
    if (digit >= 0 && digit <= 9) {
        if (clearOnNextDigit) {
            clearDisplay();
        }
        let sign = displayNumber < 0 ? -1 : 1;
        updateDisplay(displayNumber * 10 + digit * sign);
    }
}
const numberButtons = document.querySelectorAll("#numbers button");
numberButtons.forEach(button => button.addEventListener('click', function(e) {
    enterDigit(this.dataset.value);
}));

function clearAll() {
    operators = [];
    operands = [];
    clearDisplay();
}

function clearDisplay() {
    updateDisplay(0);
    clearOnNextDigit = false;
}
document.getElementById('button-clear').addEventListener('click', clearAll);


let operators = [];
let operands = [];
function enterOperator(operator) {

    if (operators.length == 0 || operatorRank(operator) < operatorRank(operators[operators.length - 1])) {
        operators.push(operator);
        operands.push(displayNumber);
    } else {
        let newDisplayNumber = displayNumber;
        while (operators.length > 0 && operatorRank(operator) >= operatorRank(operators[operators.length - 1])) {
            newDisplayNumber = operate(operands.pop(), newDisplayNumber, window[operators.pop()])
        }
        updateDisplay(newDisplayNumber);
        operators.push(operator);
        operands.push(displayNumber);
    }
    clearOnNextDigit = true;
}

function operatorRank(operator) {
    if (operator == "multiply" || operator == "divide")
        return 1;
    else
        return 2;
}

const operatorButtons = document.querySelectorAll('.button.operator');
operatorButtons.forEach(button => button.addEventListener('click', function(e) {
    enterOperator(this.dataset.value);
}));

function equals() {
    let newDisplayNumber = displayNumber;
    while (operators.length > 0) {
        newDisplayNumber = operate(operands.pop(), newDisplayNumber, window[operators.pop()])
    }
    updateDisplay(newDisplayNumber);
    clearOnNextDigit = true;
}
document.getElementById('button-equals').addEventListener('click', equals);