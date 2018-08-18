// 1 inch is 2.54 cm
// 1 pound is 0.45359 kg.

function toInches() {
    // get input
    let centimetres = document.getElementById("cmToInchValue").value;

    // convert to inches
    let inches = centimetres/2.54;

    // return output
    let outputRef = document.getElementById("cmToInchResult");
    outputRef.innerHTML = inches.toFixed(2);
}

function toCentimetres() {
    // get input
    let inches = document.getElementById("InchToCMValue").value;

    // convert to inches
    let centimetres = inches*2.54;

    // return output
    let outputRef = document.getElementById("InchToCMResult");
    outputRef.innerHTML = centimetres.toFixed(2);
}

function toKilograms() {
    // get input
    let pounds = document.getElementById("lbToKgValue").value;

    // convert to inches
    let kilograms = pounds/0.45359;

    // return output
    let outputRef = document.getElementById("lbToKgResult");
    outputRef.innerHTML = kilograms.toFixed(5);
}

function toPounds() {
    // get input
    let kilograms = document.getElementById("kgToLbValue").value;

    // convert to inches
    let pounds = kilograms*0.45359;

    // return output
    let outputRef = document.getElementById("kgToLbResult");
    outputRef.innerHTML = pounds.toFixed(5);
}