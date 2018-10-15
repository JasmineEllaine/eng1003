"use strict";

function displayBuildingStats(){
    /**
     * Displays building stats in the buldings page
     */
    // bucket roomUsageList by building
    let buildingObsList = retrieveRoomUsageListFromLocal().aggregateBy(getBuilding);
    let output = "";

    for (let building in buildingObsList){
        // build table for html output
        output += `<div class="mdl-cell mdl-cell--4-col">
                        <table class="observation-table mdl-data-table mdl-js-data-table mdl-shadow--2dp">`

        // initialise variables for data gathering
        let totalObs, wastefulObs, totalLightsOn, seatsOccupied, seatsAvailable, totalheatingCoolingOn;
        totalObs = wastefulObs = totalLightsOn = seatsOccupied = seatsAvailable = totalheatingCoolingOn = 0;

        // go through each item in each bucket
        for (let i=0; i<buildingObsList[building]._roomList.length; i++){
            let currRoomObs = buildingObsList[building]._roomList[i]
            // update tallies
            totalObs += 1
            seatsAvailable += currRoomObs.seatsTotal;
            seatsOccupied += currRoomObs.seatsUsed;
            if (currRoomObs.lightsOn){
                totalLightsOn += 1;
            }
            if (currRoomObs.heatingCoolingOn){
                totalheatingCoolingOn += 1;
            }
            if (currRoomObs.seatsUsed == 0 && (currRoomObs.lightsOn || currRoomObs.heatingCoolingOn)){
                wastefulObs += 1;
            }
        }

        // add data to html output
        // display building name
        output += `<thead><tr><th class="mdl-data-table__cell--non-numeric"><h4>`;
        
        if (wastefulObs>0){
            output += `<light>` + building + `</light>`;
        } else {
            output += building;
        }

        // display stats
        output += `</h4></th></tr></thead>
                <tbody><tr><td class="mdl-data-table__cell--non-numeric">
                    Observations: ` + totalObs + `<br />
                    Wasteful observations: ` + wastefulObs + `<br />
                    Average seat utilisation: ` + truncate(seatsOccupied/seatsAvailable*100) + `%<br />
                    Average lights utilisation: ` + truncate(totalLightsOn/totalObs*100) + `%<br />
                    Average heating/cooling utilisation: ` + truncate(totalheatingCoolingOn/totalObs*100) + `%
                </td></tr></tbody>`
        // end table
                + `</table></div>`
    }

    document.getElementById('content').innerHTML = output;
}