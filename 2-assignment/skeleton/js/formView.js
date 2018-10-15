"use strict";

/** FEATURE 3 */
function clearForm(){
    /**
     * Clears input fields of submission form
     */
    // gets input fields to be cleared, then clears them
    let inputFields = ['address', 'roomNumber', 'seatsUsed', 'seatsTotal'];
    inputFields.map(id => {document.getElementById(id).value = '';
                           document.getElementById(id).parentNode.MaterialTextfield.checkDirty()});

    let checkBox = ['heatingCooling', 'lights'];
    checkBox.map(id => document.getElementById(id).parentNode.MaterialSwitch.on());
}

function saveForm(){
    /**
     * Creates an instance of RoomUsage using the data sumitted in the form
     * 
     * @return  {int}   4   if form a given input is invalid
     */
    let id = ['roomNumber', 'address', 'lights', 'heatingCooling', 'seatsUsed', 'seatsTotal'];
    id = id.map(i => document.getElementById(i));

    // validates form inputs according to restrictions
    let error = false;
    for (let i = 0; i < id.length; i++){
        if (i < 2){
            // checks if roomNumber and address are empty
            if (id[i].value == ''){
                error = true;
                break
            }
        }
        else if (i == 4){
            // checks if seat inputs are valids
            let seats = [parseInt(id[4].value), parseInt(id[5].value)];
            // checks if seatsTotal and seatsUsed is not text or a float, and that seatsUsed < seatsTotal
            if (isNaN(seats[0]) || id[4].value.indexOf('.') != -1 || isNaN(seats[1]) || id[5].value.indexOf('.') != -1 || seats[0] > seats[1]){
                error = true;
                break
            }
        }
    }

    // return 4 if an input field is determined to be invalid
    if (error){
        displayMessage('One or more input fields have invalid values.')
        return 4;
    }

    if (confirm('Do you want to save this observation?')){
        // make roomData instance
        let obs = new RoomUsage(id[0].value, id[1].value, id[2].checked, id[3].checked, parseInt(id[4].value), parseInt(id[5].value), new Date());
        // add to RoomUsageList then save to local storage
        let obsList = retrieveRoomUsageListFromLocal();
        obsList.add(obs);
        pushRoomUsageListToLocal(obsList);
        displayMessage("Observation saved.");
        clearForm();
    }
}

/** FEATURE 4 */
function getAddress(){
    /**
     * Gets current location coordinates if checkbox is ticked
     * 
     * @return  {int}   5   if geolocation is unavailable
     */
    // check if box is ticked
    let checkbox = document.getElementById('useAddress');

    if (checkbox.checked){
        if (!navigator.geolocation){
            displayMessage('Geolocation is not supported by your browser.')
            return 5;
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function success(pos){
    /**
     * Callback function if geolocation is successful
     * Further documentation can be seen here 
     *      {https://developer.mozilla.org/en-US/docs/Web/API/Position}
     */
    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;

    // get data using API
    requestJSON(lat, lng);
}

function error(err){
    /**
     * Callback function if geolocation is unsuccessful
     * 
     * @return  {int}      err.code     error code
     * Further information on the meaning of each error code can be seen here 
     *      {https://developer.mozilla.org/en-US/docs/Web/API/PositionError}
     */
    displayMessage('There was a problem with getting your current location.')
    console.log('Geolocation error code ' + err.code);
}

function requestJSON(lat, lng){
    /**
     * Gets data using API url 
     */
    let url = 'https://api.opencagedata.com/geocode/v1/json?q=' + lat + '+' + lng
        + '&key=6bac0036676840c39c653d8cc4514459&no_annotations=1&jsonp=addressResponse';
    
    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

function addressResponse(addressArray){
    /**
     * Gets formatted address then inputs it into form
     * 
     * @param   {object}      addressArray     results of reverse geolocation
     */
    let components = addressArray.results[0].components;    // address components
    // sets house number to an empty string if not given by geolocation
    let houseNo = (components.house_number==null) ? "" : (components.house_number + " ");
    let address = houseNo + components.road + ", " + components.suburb + " " + components.state_code + " " + components.postcode + ", " + components.country;
    // document.getElementById('addressLabel').style.display = 'none';
    document.getElementById('address').value = address;
}