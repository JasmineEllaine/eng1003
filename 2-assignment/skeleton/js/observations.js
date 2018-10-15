"use strict";

function generateCardInstance(roomUsage_Instance,index)
    /**
     * Recieves information about a roomUsage class instance and turns it into an MDL card
     * 
     * @param   {object}      roomUsage_Instance     an instance of the roomUsage class
     * @param   {int}      index     index number of the roomUsage class instance in its parent roomUsageList class roomList attribute
     * @return  {str}      card_str     HTML string with an instance of an MDL card
     */
{
    let date_obj = roomUsage_Instance.timeChecked;
    let day = date_obj.getDate();
    let month = date_obj.getMonth()+1;
    let year = date_obj.getFullYear();
    let second = date_obj.getSeconds();
    let minute = date_obj.getMinutes();
    let hour = date_obj.getHours();
    let lights = "Off";
    let heating = "Off";
    let card_index = index;
    
    if (roomUsage_Instance.lightsOn == true)
    {
        lights = "On";
    }
    
    if (roomUsage_Instance.heatingCoolingOn == true)
    {
        heating = "On";
    }
    
    if (second < 10)
        {
            second = "0"+String(second);
        }
    if (minute < 10)
        {
            minute = "0"+String(minute);
        }
    if (hour < 10)
        {
            hour = "0"+String(hour);
        }
    let date_str = String(day)+"/"+String(month)+"/"+String(year);
    let time_str = String(hour)+":"+String(minute)+":"+String(second);
    
    let card_str = "<div class=\"mdl-cell mdl-cell--4-col\"><table class=\"observation-table mdl-data-table mdl-js-data-table mdl-shadow--2dp\"><thead><tr><th class=\"mdl-data-table__cell--non-numeric\"><h4 class=\"date\">"+ date_str +"</h4><h4>"+sliceLocationString(String(roomUsage_Instance.address))+"<br />"+"Rm "+String(roomUsage_Instance.roomNumber)+"</h4></th></tr></thead><tbody><tr><td class=\"mdl-data-table__cell--non-numeric\">"+time_str+"<br />Lights: "+lights+"<br />Heating/cooling: "+heating+"<br />Seat usage: "+String(roomUsage_Instance.seatsUsed)+" / "+String(roomUsage_Instance.seatsTotal)+"<br/ ><button class=\"mdl-button mdl-js-button mdl-button--icon\" onclick=\"deleteObservationAtIndex("+card_index+");\"><i class=\"material-icons\">delete</i></button></td></tr></tbody></table></div>";
    
    return card_str;
}

function displayRoomInstances(roomUsageList_Instance)
    /**
     * displays all the roomUsage class instances as MDL cards in the DOM
     * 
     * @param   {object}      roomUsageList_Instance     an instance of the roomUsageList class
     */
{
    if (roomUsageList_Instance != undefined)
        {
            let observationsHTMLref = document.getElementById("content");
            let output = ""

            for (let i=0; i < roomUsageList_Instance.roomList.length; i++)
            {
                output = output + generateCardInstance(roomUsageList_Instance.roomList[i],i);
            }
            observationsHTMLref.innerHTML = output;
        }
    else
    {
        console.log("RoomUsageList has no contents!");
    }
}

function deleteObservationAtIndex(card_index)
    /**
     * deletes an observation selected in the HTML page
     * 
     * @param   {int}      card_index     index number of the roomUsage class instance to be removed from the roomUsageList
     */
{
    let roomUsageList_instance;
    if (!isCurrentlySearching)
    {
        roomUsageList_instance = retrieveRoomUsageListFromLocal();
        roomUsageList_instance.roomList.splice(card_index,1);
        pushRoomUsageListToLocal(roomUsageList_instance);
    }
    else
    {
        roomUsageList_instance = searchParameterList;
        let identifier = roomUsageList_instance.roomList[card_index].uniqueIdentifier;
        roomUsageList_instance.roomList.splice(card_index,1);
        let currentStoredRoomUsageList = retrieveRoomUsageListFromLocal();
        for (let i=0;i<currentStoredRoomUsageList.roomList.length;i++)
            {
                if (currentStoredRoomUsageList.roomList[i].uniqueIdentifier == identifier)
                    {
                        currentStoredRoomUsageList.roomList.splice(i,1);
                    }
            }
        pushRoomUsageListToLocal(currentStoredRoomUsageList);
    }
    displayRoomInstances(roomUsageList_instance);
}

function searchObservations()
    /**
     * Searches the current observations for a keyword determined by the contents of the MDL text box search bar
     */
    {
    let searchFieldContents = document.getElementById("searchField");
    let searchParameter = searchFieldContents.value.toLowerCase();
    let roomUsageList_Instance = retrieveRoomUsageListFromLocal();
    if (searchParameter == "")
    {
        displayRoomInstances(roomUsageList_Instance);
        isCurrentlySearching = false;
        
    }
    else
    {
        isCurrentlySearching = true;    
        searchParameterList = new RoomUsageList();
    
        for(let i=0;i<roomUsageList_Instance.roomList.length;i++)
            {
                let roomAddress = roomUsageList_Instance.roomList[i].address.toLowerCase();
                let roomNumber = ("Rm " +String(roomUsageList_Instance.roomList[i].roomNumber)).toLowerCase();
                if (roomAddress.includes(searchParameter) || roomNumber.includes(searchParameter))
                    {
                        searchParameterList.add(roomUsageList_Instance.roomList[i]);
                    }
            }
        
        displayRoomInstances(searchParameterList);
    }
}
let isCurrentlySearching = false;
let searchParameterList = new RoomUsageList();
let roomUsageList_Instance = retrieveRoomUsageListFromLocal();
displayRoomInstances(roomUsageList_Instance);