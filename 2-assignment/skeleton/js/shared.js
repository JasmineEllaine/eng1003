// "use strict";

class RoomUsage
    {
       constructor(roomNumber, address, lightsOn, heatingCoolingOn, seatsUsed, seatsTotal, timeChecked) 
        {
           this._roomNumber = roomNumber;
           this._address = address;
           this._lightsOn = lightsOn;
           this._heatingCoolingOn = heatingCoolingOn;
           this._seatsUsed = seatsUsed;
           this._seatsTotal = seatsTotal;
           this._timeChecked = timeChecked;
           this._uniqueIdentifier = Math.round(Math.random()*10000);
        }
        
    get roomNumber()
        {
            return this._roomNumber;
        }
    set roomNumber(newroomNumber)
        {
            if(newroomNumber != "")
                {
                    this._roomNumber = newroomNumber;
                }
        }

    get address()
        {
            return this._address;
        }
    set address(newaddress)
        {
            if(newaddress != "")
                {
                    this._address = newaddress;
                }
        }

    get lightsOn()
        {
            return this._lightsOn;
        }

    set lightsOn(newlightsOn)
        {
            if(newlightsOn == true || newlightsOn == false)
                {
                    this._address = newaddress;
                }
        }

    get heatingCoolingOn()
        {
            return this._heatingCoolingOn;
        }

    set heatingCoolingOn(newheatingCoolingOn)
        {
            if(newheatingCoolingOn == true || newheatingCoolingOn == false)
                {
                  this._heatingCoolingOn = newheatingCoolingOn;
                }
        }

    get seatsTotal()
        {
            return this._seatsTotal;
        }
    set seatsTotal(newseatsTotal)
        {
            if(newseatsTotal > 0)
                {
                    this._seatsTotal = newseatsTotal;
                }
            else
            {
                console.log("Invalid entry");
            }
        }
          
    get seatsUsed()
        {
            return this._seatsUsed;
        }

    set seatsUsed(newseatsUsed)
        {
            if(newseatsUsed >= 0 || newseatsUsed <= seatsTotal)
                {
                    this._seatsUsed = seatsUsed;
                }
            else
            {
                console.log("Invalid entry");
            }
        }
        
    get timeChecked()
        {
            return this._timeChecked;
        }
    
    set timeChecked(newDate)
        {
            this._timeChecked = newDate;
        }
        
    get uniqueIdentifier()
        {
            return this._uniqueIdentifier;
        }
        
    /** FEATURE 6   - local storage data to be fed back into a new class instance */
    initialiseFromPDO(roomInstance)
        {
            this._roomNumber = roomInstance._roomNumber;
            this._address = roomInstance._address;
            this._lightsOn = roomInstance._lightsOn;
            this._heatingCoolingOn = roomInstance._heatingCoolingOn;
            this._seatsUsed = roomInstance._seatsUsed;
            this._seatsTotal = roomInstance._seatsTotal;
            this._timeChecked = new Date(roomInstance._timeChecked); 
            this._uniqueIdentifier = roomInstance._uniqueIdentifier;
        }
    }

class RoomUsageList
    {
        constructor()
        {
            this._roomList = []; 
        }
        
        add(roomUsageInstance)
        {
            this._roomList.push(roomUsageInstance);   
        }
        
        get roomList()
        {
            return this._roomList;
        }

        /** FEATURE 10 */
        aggregateBy(getKey){
            /**
             * Returns an object where observations are sorted in buckets using an aggregation key
             * 
             * @param   {function}  getKey      function that returns a value from the RoomUsage class instance
             * @returns {object}    bucket      bucketed RoomUsageList
             */
            let bucket = {};

            // iterate through list and get key
            for (let i = 0; i < this.roomList.length; i++){
                let key = getKey(this.roomList[i]);
                if (!bucket.hasOwnProperty(key)){
                    bucket[key] = new RoomUsageList();
                }
                bucket[key].add(this.roomList[i]);   
            }
            return bucket;
        }
    }

function pushRoomUsageListToLocal(roomUsageListInstance)
    /**
     * Takes an instance of a RoomUsageList class, stores in local storage
     * 
     * @param   {roomUsageList}      roomUsageListInstance     instance of the class to be stored
     */
    {
        if (typeof(Storage) !== "undefined")
        {
            console.log("localStorage is available. (push)");
            let RoomUsageList_JSON = JSON.stringify(roomUsageListInstance);
            localStorage.setItem("ENG1003-RoomUseList",RoomUsageList_JSON);
        }
        else
        {
            console.log("localStorage is not supported by this browser.");
        }        
    }

function retrieveRoomUsageListFromLocal()
    /**
     * Retrieves the PDO information from the stored RoomUsageList class and reinitialises it as a class instance
     * 
     * @return  {RoomUsageList}     roomUsageList       the reinitialised roomUsageList from local storage
     * @return  {null}              null                if local storage is empty
     */
    {
        if (typeof(Storage) !== "undefined")
        {
            console.log("localStorage is available. (pull)");
            let RoomUsageList_JSON = localStorage.getItem("ENG1003-RoomUseList");
            if (RoomUsageList_JSON == null)
                {
                    console.log("localStorage is empty");
                    return new RoomUsageList();
                }
            else
                {
                    let RoomUsageList_object = JSON.parse(RoomUsageList_JSON);
            
                    let roomUsageList = new RoomUsageList();
            
                    for (let i=0; i<RoomUsageList_object._roomList.length; i++)
                    {
                        let roomUsageInstance = new RoomUsage();                        
                        roomUsageInstance.initialiseFromPDO(RoomUsageList_object._roomList[i]);
                        roomUsageList.add(roomUsageInstance);
                    }

                    return roomUsageList;
                }
        }
        else
        {
            console.log("localStorage is not supported by this browser.");
        }
    }

function sliceLocationString(locationString)
    /**
     * Recieves a string containing location information, takes the information before the first comma (local address)
     * 
     * @param       {string}     locationString     the string containing all the address information
     * @return      {string}     splitString        the string info before the first comma
     */
{
    let splitString = locationString.split(",");
    return splitString[0];
}

/** FEATURE 11/12 SUPPORT FUNCTIONS */
function onOrOff(bool){
    /**
     * Returns a string corresponding to whether it is on or off
     * 
     * @param       {boolean}   bool        value to be checked
     * @returns     {string}    state       "On" or "Off"
     */
    let state = (bool) ? "On" : "Off";
    return state;
}

function getDateString(date){
    /** 
     * Gets a reader friendly string version of a date class instance
     * 
     * @param       {Date}      date        the recorded date
     * @returns     {string}                string in the form of "5/10/2018, 2:31:42PM"
     */
	return date.getDate() + "/" + (date.getMonth()+1)  + "/" + date.getFullYear() + ", "
        + ((date.getHours() < 10)?"0":"") + ((date.getHours()>12)?(date.getHours()-12):date.getHours()) +":"
        + ((date.getMinutes() < 10)?"0":"") + date.getMinutes() +":"+ ((date.getSeconds() < 10)?"0":"") 
        + date.getSeconds() + ((date.getHours()>11)?('PM'):'AM');
}

function amOrPM(time){
    /** Returns a string corresponding to whether the time is am or pm
     * 
     * @param       {int}       time        time to be checked
     * @returns     {string}    end         " am" or " pm"
     */
    let end = (time < 12) ? " am" : " pm";
    return end;
}

function truncate(aFloat){
    /**
     * Truncates a float to 2 decimal places
     * 
     * @param       {float}     aFloat      float to be truncated
     * @returns     {float}                 float truncated to 2 decimal places
     */
    return (parseInt(aFloat * 100)/100);
}

function getObsHour(obs){
    /**
     * Returns the hour that the observation was recorded
     * 
     * @param   {RoomUsage}      obs    instance of the class to be checked
     * @return  {string}                hour that obs was recorded eg. "08", "16"
     */
    return String(obs.timeChecked).split("2018 ")[1].split(":")[0];
    // return String(obs._timeChecked).split("T")[1].split(":")[0];
}

function getBuilding(obs){
    /**
     * Returns the street number and street name of the address eg. 15 Research Way
     * 
     * @param   {RoomUsage}     obs     instance of the class to be checked
     * @returns {string}                building name eg. 19 Ancora Imparo Way
     */
    return obs.address.split(",")[0]
}
/** END FEATURE 11/12 SUPPORT FUNCTIONS */