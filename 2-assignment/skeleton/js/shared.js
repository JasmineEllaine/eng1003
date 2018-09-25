"use strict";
class RoomUsage
    {
       constructor(roomNumber, address,lightsOn,heatingCoolingOn,seatsUsed,seatsTotal,timeChecked) 
         {
           this._roomNumber = roomNumber;
           this._address = address;
           this._lightsOn = lightsOn;
           this._heatingCoolingOn = heatingCoolingOn;
           this._seatsUsed = seatsUsed;
           this._seatsTotal = seatsTotal;
           this._timeChecked = timeChecked;   
         }
        
     //roomNumber   
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
    //address
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
    //lightsOn
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
    //heatingCoolingOn
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
       //seatsTotal 
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
        }
        
        
        
    //seatsUsed
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
        }     
    }


class RoomUsageList
    {
        construct(RoomUsageList)
        {
           this._RoomUsageList = []; 
        }
        
        adding(roomname, usage)
        {
            let usagelist = {
                room:roomname,
                usage:usage 
            }
            this._RoomUsageList.push(usagelist);
            console.log("Roomname" + roomname + ", usage" + usage);    
        }
    
    }