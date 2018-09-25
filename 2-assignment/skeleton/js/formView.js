"use strict";
/**
 * TO FIX:
 *  - form prompts are also cleared when called,
 *  - form doesnt clear when address is inputted
 *  - needs proper documentation
 *  - make code neater and more readable
 *  - add error return codes
 *  - validate form answers properly
 */

/** FEATURE 3 */
function clearForm(){
    // input fields to be cleared
    let address = document.getElementById('address');
    let roomNumber = document.getElementById('roomNumber');
    let seatsUsed = document.getElementById('seatsUsed');
    let seatsTotal = document.getElementById('seatsTotal');
    
    // make a list to prep for iteration
    let formElements = [address, roomNumber, seatsUsed, seatsTotal];
    
    // loop through input fields and clear values
    for (let i = 0; i < formElements.length; ++i) {
        formElements[i].value = '';
    }
}

function saveForm(){
    // get elements
    let id = ['roomNumber', 'address', 'lights', 'heatingCooling', 'seatsUsed', 'seatsTotal'];
    id = id.map(i => document.getElementById(i));

    // make new instance
    let roomData = new RoomUsage(parseInt(id[0]).value, id[1].value, id[2].checked, id[3].checked, parseInt(id[4].value), parseInt(id[4].value), new Date());

    // test to see if instance hold right data
    localStorage.setItem('roomDataTest', JSON.stringify(roomData));
    /** THIS CODE DOES NOT CHECK IF ALL INPUTS ARE VALID, WILL ADD THAT LATER ON FOR NOW THIS CREATES THE INSTANCES */
}

/** FEATURE 4 */
// callback functions
function success(pos){
    // returns latitude and longuitude
    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;

    // debugging purposes
    console.log(lat, lng)

    // get data using API
    requestUrl(lat, lng);
}

function error(err){
    // https://developer.mozilla.org/en-US/docs/Web/API/PositionError 
    // info on the different error codes
    return err.code;
}

// get current address
function getAddress(){
    // check if box is ticked
    let checkbox = document.getElementById('useAddress');

    if (checkbox.checked){
        if (!navigator.geolocation){
            // if geolocation not available, return 1
            // CHANGE RETURN NUMBER SINCE ERROR FUNCTION RETURNS 1 AS WELL
            return 1;
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function requestUrl(lat, lng){
    let url = 'https://api.opencagedata.com/geocode/v1/json?q='
        + lat + '+' + lng + '&key=6bac0036676840c39c653d8cc4514459&no_annotations=1&callback=addressResponse';
    
    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

function addressResponse(addressArray){
    // get formatted address to put into form
    let data = addressArray.results[0].formatted;

    // put into form
    document.getElementById('address').value = data;
}