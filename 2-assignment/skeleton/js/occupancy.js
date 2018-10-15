"use strict";

function displayWorstOccupancy(){
    /**
     * Displays 5 worst occupancies by time in the occupancy page
     */
    // bucket roomUsageList by hour
    let hourlyObsList = retrieveRoomUsageListFromLocal().aggregateBy(getObsHour);

    let output = "";
    // iterate through bucket from
    for (let time in hourlyObsList){
        // display worst 5 observations or less if 8am <= time <= 6pm 
        if (parseInt(time) >= 8 && parseInt(time) <= 18){
            // create table for a time entry
            output += `<div class="mdl-cell mdl-cell--4-col"></tbody>
                        <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                            <thead>
                                <tr><th class="mdl-data-table__cell--non-numeric">
                                    <h5>Worst occupancy for ` + ((parseInt(time) < 13) ? parseInt(time) : (time - 12)) + amOrPM(parseInt(time)) + `</h5>
                                </th></tr>
                            </thead><tbody>` 
            // get occupancy of bucket then sort
            let currRoomList = hourlyObsList[time]._roomList; 
            let key = [...Array(currRoomList.length)].map((_,i) => i); // this will help identify which ocupancy belings to which roomUsage
            let occupancy = key.slice().map(i => (currRoomList[i].seatsTotal==0) ? 0 : (currRoomList[i].seatsUsed/currRoomList[i].seatsTotal*100));

            // get 5 (or less) worst occupancy for this roomList
            [key, occupancy] = getWorstOccupancy(key, occupancy);

            // generate html output
            for (let i = 0; i < key.length; i++){
                let currRoomUsage = currRoomList[key[i]];
                output +=`<tr><td class="mdl-data-table__cell--non-numeric">
                                    <div><b>` + sliceLocationString(currRoomUsage.address) + "; " + "Rm " + currRoomUsage.roomNumber + `</b></div>
                                    <div>Occupancy: ` + truncate(occupancy[i]) + `%</div>
                                    <div>Heating/cooling: ` + onOrOff(currRoomUsage.heatingCoolingOn) + `</div>
                                    <div>Lights: ` + onOrOff(currRoomUsage.lightsOn) + `</div>
                                    <div><font color="grey">
                                            <i>` + getDateString(currRoomUsage.timeChecked) + `</i>
                                    </font></div>
                                </td></tr>`
            }
        }
        // end table for this time entry
        output += `</tbody></table></div>`
    }

    // output data to webpage
    document.getElementById('content').innerHTML = output;
}

/** insertion sort this shit dont work */
function getWorstOccupancy(key, value){
    /**
     * Gets the 5 (or less) worst occupancies given the occupancy values, and their corresponding keys
     * 
     * @param       {array}     key         list of indices from 0 -> length of roomList
     * @param       {array}     value       occupancy values for each roomUsage
     * 
     * @returns     {array}     key         list of indices corresponding to 5 worst occupancies
     * @returns     {array}     value       5 (or less) occupancy percentages
     */
    // sorts occupancy in descending order using insertion sort
    for (let i=0; i<value.length; i++){
        let valueElem = value[i];
        let keyElem = key[i];
        let j = i-1;
        while (j >= 0 && valueElem < value[j]){
            value[j+1] = value[j];
            key[j+1] = key[j];      // sort values and preserves order of keys
            j -= 1;
        }
        value[j+1] = valueElem;
        key[j+1] = keyElem;
    }

    // picks out 5 or less rooms
    if (key.length > 5){
        key = key.slice(0, 5);
        value = value.slice(0, 5);
    }

    // return these values
    return [key, value]
}