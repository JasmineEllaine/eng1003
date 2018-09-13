let parityReference =  ["LLLLLL",
                        "LLGLGG", 
                        "LLGGLG",
                        "LLGGGL",
                        "LGLLGG",
                        "LGGLLG", 
                        "LGGGLL", 
                        "LGLGLG", 
                        "LGLGGL", 
                        "LGGLGL"];

function findParityDigit (parity, parityReference) {
    /**
     * Determines the parity digit of a vali barcode.
     *
     * @param   {string}    parity          A string sequence of L's and G's
     * @param   {list}      parityReference A list of strings where each element is a parity pattern and its index is its corresponding digit
     * 
     * @return  {int}       parityDigit     Returns parity digit if valid pattern
     *                                      Returns -1 if not a valid pattern
     */
    let parityDigit = parityReference.indexOf(parity);
    return parityDigit;
}

function getCompleteBarcode (barcode, parityDigit) {
    /**
     * Adds parity digit to the beginning of the 12 digit barcode sequence
     *
     * @param   {list}      barcode         List of 12 elements containing all the digits of a valid barcode
     * @param   {int}       parityDigit     Parity digit of barcode
     * 
     * @return  {list}      parityDigit     List of 13 elements containin gall the digits of the barcode and the parity digit
     */
    barcode.unshift(parityDigit);
}