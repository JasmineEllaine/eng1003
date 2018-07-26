function doIt()
{
    // Variables for HTML element DOM references.
    let num1Ref, num2Ref, num3Ref, answerRef, parityRef; 
    
    // Working variables.
    let num1, num2, num3, answer, parityText; 
    
    // Get references to DOM elements.
    num1Ref = document.getElementById("number1");
    num2Ref = document.getElementById("number2");
    num3Ref = document.getElementById("number3");
    answerRef = document.getElementById("answer");
    parityRef = document.getElementById("parity");
        
    // Note: The "input" tag is a void tag (i.e., it can't have 
    // start and end tags, can't have content) so it does not 
    // support "innerText" or "innerHTML" properties.  Thus 
    // we use the "value" property to get its contents.

    // The following statment will not work properly.
    // It results in concatenation rather than addition.
    //answer = num1Ref.value + num2Ref.value;

    // Convert strings to numbers, e.g., "21" to 21.
    num1 = Number(num1Ref.value);
    num2 = Number(num2Ref.value);
    num3 = Number(num3Ref.value);
    
    // Perform addition operation then assignment operation
    answer = num1 + num2 + num3; 

    // Update "answer" label DOM to show result.
    answerRef.innerText = answer;
    
    // Tests parity of answer, changes id for CSS styling
    if ((answer % 2) === 0) {
        parityText = "(even)";
        parityRef.innerText = parityText;
        parityRef.className = "even"
    } else {
        parityText = "(odd)";
        parityRef.innerText = parityText;
        parityRef.className = "odd"
    }

    if (answer >= 0)
    {
        // Value of answer is positive.
        // Set the class of the answer label to "positive".
        answerRef.className = "positive";
    }
    else
    {
        // Value of answer is not positive, i.e., negative.
        // Set the class of the answer label to "negative".
        answerRef.className = "negative";
    }
}