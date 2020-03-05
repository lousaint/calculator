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
let decimalPlace = 0;

function updateDisplay(newNumber) {
    displayNumber = newNumber;
    let displayText = displayNumber.toFixed(decimalPlace > 0 ? decimalPlace - 1: 0);
    let precision = 13;
    while (displayText.length > 13) {
        displayText = displayNumber.toPrecision(precision--).replace(/([0-9.]*[1-9])\.?0+((e[+-][0-9]+)?)$/,"$1$2");
    }

    if (decimalPlace == 1)
        displayText = displayNumber + ".";

    document.getElementById('display').textContent = displayText;
}

function enterDigit(d) {
    let digit = parseInt(d);
    if (digit >= 0 && digit <= 9) {
        if (clearOnNextDigit) {
            clearDisplay();
        }
        let sign = displayNumber < 0 ? -1 : 1;

        if (decimalPlace == 0) {
            updateDisplay(displayNumber * 10 + digit * sign);
        } else {
            updateDisplay(displayNumber + digit * Math.pow(10, -1 * decimalPlace++) * sign);
        }
    }
}
const numberButtons = document.querySelectorAll(".button.number");
numberButtons.forEach(button => button.addEventListener('click', function(e) {
    enterDigit(this.dataset.value);
}));

function enterDecimalPoint() {
    if (decimalPlace == 0) {
        decimalPlace = 1;
        updateDisplay(displayNumber);
    }
}
document.getElementById('button-decimal').addEventListener('click', enterDecimalPoint);

function clearAll() {
    operators = [];
    operands = [];
    lastOperator = '';
    lastOperand = '';
    clearDisplay();
}

function clearDisplay() {
    updateDisplay(0);
    decimalPlace = 0;
    clearOnNextDigit = false;
}
document.getElementById('button-clear').addEventListener('click', clearAll);


let operators = [];
let operands = [];
function enterOperator(operator) {

    if (clearOnNextDigit) {
        operators.pop();
    }

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

let lastOperator = '';
let lastOperand = '';
function equals() {
    let newDisplayNumber = displayNumber;
    
    if (operators.length == 0 && lastOperator != '') {
        newDisplayNumber = operate(newDisplayNumber, lastOperand, window[lastOperator]);
    } else if (operators.length > 0) {
        lastOperator = operators[operators.length - 1];
        lastOperand = displayNumber;
        while (operators.length > 0) {
            newDisplayNumber = operate(operands.pop(), newDisplayNumber, window[operators.pop()]);
        }
    }
    updateDisplay(newDisplayNumber);
    clearOnNextDigit = true;
}
document.getElementById('button-equals').addEventListener('click', equals);

function mapKey(eventKey) {
    return eventKey == "=" ? "Enter" :
        eventKey == "c" ? "Escape" :        
        eventKey;
}

function parseKey(e) {
    let key = mapKey(e.key);

    let button = document.querySelector(`button[data-key="${key}"]`);

    if (button != null) {
        button.click();
    }
}
window.addEventListener('keydown', parseKey);