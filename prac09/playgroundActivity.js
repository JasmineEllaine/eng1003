window.routesResponse = function(routes)
{
  for (let i = 0; i < routes.length; i++)
  {
    console.log(routes[i].sourceAirport + " -> " + routes[i].destinationAirport);
    console.log("Stops: " + routes[i].stops);
    console.log("");
  }
};
// Make the API request:
// Make the request
let data = {
    airline: "QF",
    sourceAirport: "MEL",
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