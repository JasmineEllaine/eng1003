        // Global variable to hold map reference, so we can use it
        // in other functions.
        let map = null;
        
        // Map Initialisation callback.  Will be called when Maps API loads.
        function initMap() 
        {
            // Initialise map, centred on Melbourne, Australia.
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -37.8200855, lng: 144.9608045},
                zoom: 17
            });
        }

        function panToMonashClayton()
        {

        }
        
        function showPath()
        {
            
        }
        
        function showPolygon()
        {
            
        }
        
        function whereAmI()
        {
            //run the getCurrentLocation function and tell it to run respondToLocationObtained when it finds the user
        }
        
        function respondToLocationObtained(position){
            //this function should be triggered by getCurrentPosition when the location is determined, you will need to process position to ensure you move to a position that is a LatLng (ex. {lat:A,lng:B})
        }
