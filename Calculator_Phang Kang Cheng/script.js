class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.keyPressedNumbersAllowed = keyPressedNumbersAllowed;
        this.keyPressedOperatorsAllowed = keyPressedOperatorsAllowed;
        this.memoryDisplayTextElement = memoryDisplayTextElement;
        this.memoryArray = memoryArray;
        this.clear(); //clear all inputs 
    }

    //clear function - to clear input
    clear() {
        this.currentOperand = ""; //default to empty string when cleared
        this.previousOperand = ""; //default to empty string when cleared
        this.operation = undefined; //default to no operation selected when cleared
    }

    //delete function - to remove last number
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);//deleting the last index of the string
    }

    //appendNumber function - to add number
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return; //as "." is set as a number, we want to ensure there's no multiple decimals
        this.currentOperand = this.currentOperand.toString() + number.toString(); //set it as string so we can append numbers to it instead of it trying to compute numbers/integer value
        console.log(this.currentOperand);
    }

    //chooseOperation function - to select operators
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute() //update all variables
        }
        this.operation = operation; //
        this.previousOperand = this.currentOperand; //pass currentOperand to previous so it appears on top
        this.currentOperand = ""; //clear out currentOperand when any operation button is pressed
    }

    //compute function 
    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand); //convert from string to float for previous operand
        const current = parseFloat(this.currentOperand); //convert from string to float for current operand
        if (isNaN(previous) || isNaN(current)) return; //if previous or current value is Not A Number (NaN), this function will not be executed
        switch (this.operation) { //switch method to check for the computation between previous operand & operator & current operand
            case "+":
                computation = previous + current
                break;
            case "-":
                computation = previous - current
                break;
            case "×":
            case "*":
                computation = previous * current
                break;
            case "÷":
            case "/":
                computation = previous / current
                break;
            default:
                return //if none symbols match the operation, there won't be any computation
        }
        this.currentOperand = computation; //result of computation on current operand
        this.operation = undefined;
        this.previousOperand = ""; //display nothing after computation
    }

    getDisplayNum(number) {
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split(".")[0]);
        const decimalDigits = stringNum.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    //updateDisplay function - to display computations
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNum(this.currentOperand);//set text in current operand to display
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNum(this.previousOperand)} ${this.operation}`;//to show previous operand + operators
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }

    memoryDisplay() {
        memoryDisplayTextElement.innerText = memoryArray.toString();
    }

    memoryClear() {
        memoryArray.pop();
        calculator.memoryDisplay();
    }


    memoryAdd() {
        let x = this.getDisplayNum(this.currentOperand);
        if (memoryArray.length == 0)
            memoryArray.push(x);
        else
            memoryArray[0] = parseInt(memoryArray[0]) + parseInt(x);
    }

    memoryMinus() {
        let x = this.getDisplayNum(this.currentOperand);
            if (memoryArray.length == 0)
            memoryArray.push(x);
        else {
            memoryArray[0] = parseInt(memoryArray[0]) - parseInt(x);
        }
    }

    memoryRecall() {
        //console.log("clicked memory Recall")
        this.currentOperand = memoryArray[0];
        calculator.memoryDisplay();
    }
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const allclearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equal]');
const mcBtn = document.querySelector('[data-memory-clear]');
const mPlusBtn = document.querySelector('[data-memory-plus]');
const mMinusBtn = document.querySelector('[data-memory-minus]');
const mrBtn = document.querySelector('[data-memory-recall]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const memoryDisplayTextElement = document.querySelector('[displaymemory]');
const keyPressedNumbersAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const keyPressedOperatorsAllowed = ['/', '*', '-', '+', 'Enter'];
const memoryArray = [];


//Defining new object, pass all parameters from constructor into this
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, keyPressedNumbersAllowed, keyPressedOperatorsAllowed)


mPlusBtn.addEventListener("click", button => {
    calculator.memoryAdd(this.currentOperand);
    calculator.memoryDisplay();
})


mMinusBtn.addEventListener("click", button =>{
    calculator.memoryMinus(this.currentOperand);
    calculator.memoryDisplay();
})

mrBtn.addEventListener("click", button => {
    calculator.memoryRecall();
    calculator.updateDisplay();
})

mcBtn.addEventListener("click", button => {
    calculator.memoryClear();
    calculator.updateDisplay();
})


numberBtns.forEach(button => { //loop all over buttons
    button.addEventListener("click", () => { //adding click event
        calculator.appendNumber(button.innerText);//add whatever value is inside the buttons when we click on them
        calculator.updateDisplay();//constantly update display when we click button
    })
})

operationBtns.forEach(button => { //loop all over buttons
    button.addEventListener("click", () => { //adding click event
        calculator.chooseOperation(button.innerText);//add whatever value is inside the buttons when we click on them
        calculator.updateDisplay();//constantly update display whenever we click number button including "."
    })
})

equalsBtn.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

document.addEventListener("keydown", function (event) {
    if (event.key == "=" || event.key == "Enter") {
        calculator.compute();
        calculator.updateDisplay();
    }
})

allclearBtn.addEventListener("click", button => {
    calculator.clear(); //calls the clear function to display nothing
    calculator.updateDisplay();
})

deleteBtn.addEventListener("click", button => {
    calculator.delete(); //calls the delete function to remove the last value keyed in
    calculator.updateDisplay();
})

var keyboardInput = document.addEventListener('keydown', function (event) {
    let keyName = event.key
    if (keyPressedNumbersAllowed.toString().includes(keyName)) {
        calculator.appendNumber(keyName);
        calculator.updateDisplay();
    }

    // Operators /, *, -, +, =
    if (keyPressedOperatorsAllowed.toString().includes(keyName)) {
        calculator.chooseOperation(keyName);
        if (calculator.updateDisplay() == "Enter") return "";
        else {
            calculator.updateDisplay();
        }
    }

    // Backspace to reset value and display value
    if (keyName == 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
})

