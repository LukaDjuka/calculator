let display = document.querySelector("#display");
let buttons = document.querySelectorAll(".calc-button");

// Used to maintain a clean display
let previousOperation = "=";


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.textContent);
        buttonClick(button.textContent)
    });
});

function buttonClick(input){
    if (input === "="){
        operate();
    }
    else if (input === "C"){
        display.textContent = "";
    }
    else {
        if (input === "/" || input === "x" || input === "-" || input ==="+"){
            display.textContent += " " + input;
        }
        else {
            if ((previousOperation === "=") && (checkIfNumber(input))){
                display.textContent = input;
            }
            else if ((previousOperation != ".") && (!checkIfNumber(previousOperation))){
                display.textContent += " " + input;
            }
            else {
                display.textContent += input;
            }
        }
    }
    previousOperation = input;
}

function operate(){
    let inputs = display.textContent.trim().split(" ");
    if (inputs.length > 1){
        while (inputs[0] === "-" && inputs[1] === "-"){
            inputs.shift();
            inputs.shift();
        }
        if (inputs[0] === "-" && checkIfNumber(inputs[1])){
            inputs[1] = "-" + inputs[1];
            inputs.shift();
        }
    }
    if (inputs.length === 1){
        return true;
    }
    let operators = {"/": divider, "x": multiplier, "-": subtractor, "+": adder};
    let flagger = 0;
    for (let key in operators) {
        if (performOperator(key, operators[key], inputs)){
            flagger++;
        }
    }
    if (flagger === 4){
        if (!(inputs.toString().includes(","))){
            display.textContent = inputs.toString();
        }
        else{
            display.textContent = "ERROR";
            previousOperation = "=";
        }
    }
    else{
        display.textContent = "ERROR"
        previousOperation = "=";
    }
}

function performOperator(opString, func, arr){
    let startingSearchIndex = 0;
    // BEDMAS order of operations
    while (arr.includes(opString, startingSearchIndex)){
        let indexOfOperator = arr.indexOf(opString, startingSearchIndex);
        if (indexOfOperator === 0 || indexOfOperator === arr.length - 1){
            // Binomial operator is not being used properly
            console.log("Not using binomial operator properly")
            return false;
        }
        else{
            // In this case the operator is being applied to two operands
            if (checkIfNumber(arr[indexOfOperator - 1]) && checkIfNumber(arr[indexOfOperator + 1])){
                let evaluation = func(arr[indexOfOperator - 1], arr[indexOfOperator + 1]);
                arr.splice(indexOfOperator - 1, 3, evaluation);
                startingSearchIndex = indexOfOperator - 1;
            }
            else{
                console.log("At least one operand is not a number");
                return false;
            }
        }
    }
    return true;
}

function checkIfNumber(value){
    return /\d/.test(value);
}


const divider = function divide(x, y){
    return x / y;
}

const adder = function add(x, y){
    return Number(x) + Number(y);
}

const subtractor = function subtract(x, y){
    return x - y;
}

const multiplier = function multiply(x ,y){
    return x * y;
}