"use strict";
/*
*
* Open Flights web app example
*
* Copyright (c) 2015-2016  Monash University
*
* Written by Michael Wybrow
*
* ----------------------------------------------------------------------------
* The 'flightData' object Contains information from OpenFlights.org, which is
* made available here under the Open Database License (ODbL). - See more at:
*    http://opendatacommons.org/licenses/odbl/1.0/
* ----------------------------------------------------------------------------
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
*/

let flightsListElement = document.getElementById('flights-list');
let routes = [];

// Make the request
let data = {
    airline: "QF",
    sourceAirport: "LAX",
    callback: "routesResponse"
};
jsonpRequest("https://eng1003.monash/OpenFlights/routes/", data);

function jsonpRequest(url, data)
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}

function routesResponse(routesArray)
{
    routes = routesArray;

    // List view section heading: Flight list
    let listHTML = "";

    // TODO: Part 1 - Add code here to iterate over the 'routes' array and
    //       create HTML list items for each route, as below.
    //
    for (let i = 0; i < routes.length; ++i)
    {
        listHTML += "<tr> <td onmousedown=\"listRowTapped("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" + routes[i].sourceAirport + " &rarr; " + routes[i].destinationAirport;
        listHTML += "<div class=\"subtitle\">" + routes[i].airline + ", Stops: " + routes[i].stops +"</div></td></tr>";
    }
    // HTML format of list item is:
    //
    //   <tr> <td onmousedown=\"listRowTapped("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">"[SOURCE AIRPORT] -> [DEST AIRPORT]
    //   <div class="subtitle">[AIRLINE CODE], Stops: [STOPS]</div></td></tr>
    //
    // And sample JavaScript code that would generate the HTML above is:
    //

    // Insert the list view elements into the flights list.
    flightsListElement.innerHTML = listHTML;

}

function airportResponse(airport)
{
    let message = "Name: " + airport.name + "\n";
    message += "Location: " + airport.city + ", " + airport.country;
    alert(message);
}

function listRowTapped(routeIndex)
{
    console.log(routes[routeIndex].destinationAirport + "(" + routes[routeIndex].destinationAirportId + ")");

    // TODO: Part 2 - Add code here to request airport information.
    //       The request should call the airportResponse function when successful.
    let url = "https://eng1003.monash/OpenFlights/airport/"
    let data = {
        id: routes[routeIndex].destinationAirportId,
        callback: "airportResponse"
    }
    jsonpRequest(url, data);
}