// PASTE YOUR CODE HERE
// Q1
console.log("Question 1");
function daySuffix(input) {
    try {
        let integer = Math.round(input);
        let suffix = ["th", "st", "nd", "rd"];

        if (integer <= 31 && integer >= 1) {
            rem = input%100;
            return (integer + (suffix[(rem-20)%10] || suffix[rem] || suffix[0]));
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

for (let i = -1; i < 33; i++) {
    console.log(i + ":", daySuffix(i));
}

console.log("dog:", daySuffix("dog"));
console.log("100:", daySuffix(100));

// Q2
let outputAreaRef = document.getElementById("outputArea");
let output = "";
output += "Question 2" + "<br/>" + "<hr>";

function objectToHTML(objectName) {
    output = "";
    for (let property in objectName) {

        output += property + ": " + objectName[property] + "<br />";
    }
    return output;
}

let testObj = {
    number: 1,
    string: "abc",
    array: [5, 4, 3, 2, 1],
    boolean: true
};

output += objectToHTML(testObj);

// Q3
output += "<br />" + "Question 3" + "<br/>" + "<hr>";
 
function flexible(fOperation, operand1, operand2) {
    let result  = fOperation(operand1, operand2);
 
    return result;
}

let addNum = (num1, num2) => {
    return num1 + num2;
}

let mulNum = (num1, num2) => {
    return num1 * num2;
} 

output += flexible(addNum, 3, 5) + "<br/>";
output += flexible(mulNum, 3, 5) + "<br/>"; 

// Q4
output += "<br />" + "Question 4" + "<br/>" + "<hr>";

function findMaxMin(array, intReturn) {
    // if int = 0, return min
    // if int = 1, return max
    let currMin = array[0];
    let currMax = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < currMin) {
            currMin = array[i];
        }
        if (array[i] > currMax) {
            currMax = array[i];
        }
    }

    if (intReturn === 0) {
        return currMin;
    } else {
        return currMax;
    }
}

function extremeValue(intArray, str) {
    if (str === "Minimum") {
        return findMaxMin(intArray, 0)
    } else {
        return findMaxMin(intArray, 1)
    }
}

let values = [4, 3, 6, 12, 1, 3, 8];

output += extremeValue(values, "Maximum") + "<br/>"; 
output += extremeValue(values, "Minimum") + "<br/>"; 
 
outputAreaRef.innerHTML = output;