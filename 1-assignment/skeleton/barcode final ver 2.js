//Feature 1-2
let parityReference =  ["LLLLLL","LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

function checkGuards(barcode)
{
    leftGuard = barcode.slice(0,3);
    rightGuard = barcode.slice(92,95);
    middleGuard = barcode.slice(45,50);
    
    if (leftGuard != "101")
        {
            return 1
        }
    if (middleGuard != "01010")
        {
            return 2
        }
    if (rightGuard != "101")
        {
            return 3
        }
    
    return 0


function collectBits(barcode)
{
    barcode = barcode.substring(3,45) + barcode.substring(50,92)
    barcodeBitDigits = []
    for (let i=0; i<12; i++)
        {
            digit = barcode.substring(7*i,7*i+7)
            barcodeBitDigits.push(digit)
        }
    return barcodeBitDigits
}

function barcodeIsLeft(barcodeDigit)
    {
        let zeros = 0;
        for (let i=0;i<7;i++)
            {
                if (barcodeDigit[i] == 0)
                    {
                        zeros++;
                    }
            }
		if (zeros % 2 == 0)
		{
			return true;
		}
		else
        {
			return false;
        }
		
    }

//Feature 3
let eanReference = 
    {
        leftOdd: ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],
        leftEven: ["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],
        right: ["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],
    }

function barcodeDigitDecode(barcodeBitDigits)
    {
    let decodedDigits = [];
    let parity = "";
    for (let i = 0; i < barcodeBitDigits.length; i++)
        {
            if (eanReference.leftOdd.indexOf(barcodeBitDigits[i]) != -1)
                {
                    decodedDigits.push(eanReference.leftOdd.indexOf(barcodeBitDigits[i]));
                    parity += "L";
                }
            else if (eanReference.leftEven.indexOf(barcodeBitDigits[i]) != -1)
                {
                    decodedDigits.push(eanReference.leftEven.indexOf(barcodeBitDigits[i]));
                    parity += "G";
                }
            else if (eanReference.right.indexOf(barcodeBitDigits[i]) != -1)
                {
                     decodedDigits.push(eanReference.right.indexOf(barcodeBitDigits[i]));
                }
            else
                {
                    return 4
                }
        }
    return [decodedDigits,parity];
    }

// Feature 4
function findParityDigit (parity, parityReference) {
    /**
     * Determines the parity digit of a vali barcode.
     *
     * @param   {string}    parity          A string sequence of L's and G's, e.g. "LLLLLG"
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
//Feature 5

function checksum(digit)
{
    let array = [0,0,0,0,0,0,0,0,0,0,0,0]
    let sum = 0
    for (let i = 0; i < digit.length-1 ; i++)
    {
        if (i%2 == 0)
        {
            array[i]=digit[i]*1
        }
        else
        {
            array[i]=digit[i]*3
        }

    }
    for (i=0; i< array.length;i++)
    {
        sum += array[i]
    }
    let next=0
    next = Math.ceil(sum/10)*10
    if ((next-sum) === digit[digit.length-1])
    {
        return true
    }
    else
    {
        return false
    }
}

function decodeBarcodeFromAreas(areas)
{
    let result = {
        barcode: " ", 
        message: "No middle guard", 
        checksumValid: false
    };
    

    let guardCheckResult=checkGuards(areas);
    if (guardCheckResult===1)
        {
            result.message="No left guard";
            return result
        }
    else if (guardCheckResult===2)
        {
            result.message="No middle guard";
            return result
        }
    else if (guardCheckResult===3)
        {
            result.message="No right guard";
            return result
        }
    else if (guardCheckResult===0)
        {
            result.message="success";
        }

    
        let barcodeBitDigits = collectBits(areas);
    
    if  (!barcodeIsLeft(barcodeBitDigits[0]))
        {
            barcodeBitDigits.reverse;
        }
    
    
    let array=barcodeDigitDecode(barcodeBitDigits);
    if (array == 4)
        {
            result.message = "invalid barcode digits";
            result.barcode = " ";
            return result;
        }
    let array1=array[0];
    for (let i=0;i<=11;i++)
        {
            result.barcode+=array1[i];
        }
    let parity=findParityDigit(array[1],parityReference);
    //find parity
    result.barcode=(parity+result.barcode);
    //add parity and other digits of barcode  tpgether
    let digit=[0,0,0,0,0,0,0,0,0,0,0,0,0];
    digit[0]=parity;
    for (let i=1;i<=12;i++)
        {
            digit[i]=array1[i-1];
        }
    result.checksumValid=checksum(digit);
    return result;
}