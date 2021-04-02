
/* ----------------- Start Document ----------------- */
$(document).ready(function(){
if(document.getElementById("map") !== null){

	// Touch Gestures
	if ( $('#map').attr('data-map-scroll') == 'true' || $(window).width() < 992 ) {
		var scrollEnabled = false;
	} else {
		var scrollEnabled = true;
	}

	var mapOptions = {
		gestureHandling: scrollEnabled,
	}

	// Map Init
	window.map = L.map('map',mapOptions);
	$('#scrollEnabling').hide();


	// ----------------------------------------------- //
	// Popup Output
	// ----------------------------------------------- //
	function locationData(jobURL, companyLogo, companyName, jobTitle, verifiedBadge) {
	  return(''+
	    '<a href="'+jobURL+'" class="job-listing">'+
	       '<div class="job-listing-details">'+
	          '<div class="job-listing-company-logo">'+
	            '<div class="'+verifiedBadge+'-badge"></div>'+
	            '<img src="'+companyLogo+'" alt="">'+
	          '</div>'+
	          '<div class="job-listing-description">'+
	            '<h4 class="job-listing-company">'+companyName+'</h4>'+
	            '<h3 class="job-listing-title">'+jobTitle+'</h3>'+
	          '</div>'+
	       '</div>'+
	    '</a>')
	}

	// ----------------------------------------------- //
	// Locations
	// ----------------------------------------------- //
	var locations = [
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-01.jpg',"Wood Milling",'Example Manufacturer', 'verified'), 43.273394, -79.814830, 5, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-02.jpg',"Metal Machining",'Example Manufacturer', 'not-verified'), 43.363231, -79.737076, 2, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-01.jpg',"Furniture",'BExample Manufacturer', 'not-verified'), 42.607877, -82.813760, 3, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-02.jpg',"Food and Beverage",'Example Manufacturer', 'verified'), 42.330117, -82.877226, 4, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-01.jpg',"Electronics",'Example Manufacturer', 'not-verified'), 37.762963, -122.388506, 1, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-02.jpg',"Fabrics",'CExample Manufacturer', 'not-verified'), 40.671732, -74.011710, 6, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-01.jpg',"Plastic Molding",'Example Manufacturer', 'not-verified'), 37.730511, -122.383679, 7, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-02.jpg',"Metal Molding",'Example Manufacturer', 'not-verified'), 34.707500, -86.653950, 8, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-01.jpg',"Air Bags",'Example Manufacturer', 'not-verified'), 37.732810, -122.415951, 9, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-02.jpg',"Wood Milling",'Example Manufacturer', 'not-verified'), 34.689864, -86.725381, 10, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-01.jpg',"Furniture",'Example Manufacturer', 'not-verified'), 53.582906, -113.288496, 11, ''],
		[ locationData('single-freelancer-profile.html','images/user-avatar-big-02.jpg',"Automotive",'Example Manufacturer', 'not-verified'), 51.169722, -113.961995, 12, ''],
	];


	// ----------------------------------------------- //
	// Map Provider
	// ----------------------------------------------- //

	// Open Street Map 
	// -----------------------//
	L.tileLayer(
		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',
		maxZoom: 18,
	}).addTo(map);


	// MapBox (Requires API Key)
	// -----------------------//
	// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
	//     attribution: " &copy;  <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy;  <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
	//     maxZoom: 18,
	//     id: 'mapbox.streets',
	//     accessToken: 'ACCESS_TOKEN'
	// }).addTo(map);


	// ThunderForest (Requires API Key)
	// -----------------------//
	// var ThunderForest_API_Key = 'API_KEY';
	// var tileUrl = 'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey='+ThunderForest_API_Key,
	// layer = new L.TileLayer(tileUrl, {maxZoom: 18});
	// map.addLayer(layer);


	// ----------------------------------------------- //
	// Markers
	// ----------------------------------------------- //
        markers = L.markerClusterGroup({
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
          });
       
        for (var i = 0; i < locations.length; i++) {

          var hireoIcon = L.divIcon({
              iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
              popupAnchor: [0, 0],
              className: 'hireo-marker-icon',
              html:  '<div class="marker-container">'+
                       '<div class="marker-card">'+
                          '<div class="front face">' + locations[i][4] + '</div>'+
                          '<div class="back face">' + locations[i][4] + '</div>'+
                          '<div class="marker-arrow"></div>'+
                       '</div>'+
                     '</div>'
            }
          );

            var popupOptions =
              {
              'maxWidth': '320',
              'minWidth': '320',
              'className' : 'leaflet-infoBox'
              }
                var markerArray = [];
            marker = new L.marker([locations[i][1],locations[i][2]], {
                icon: hireoIcon,
                
              })
              .bindPopup(locations[i][0],popupOptions );
              //.addTo(map);
              marker.on('click', function(e){
                
               // L.DomUtil.addClass(marker._icon, 'clicked');
              });
              map.on('popupopen', function (e) {
              //   L.DomUtil.addClass(e.popup._source._icon, 'clicked');
            

              // }).on('popupclose', function (e) {
              //   if(e.popup){
              //     L.DomUtil.removeClass(e.popup._source._icon, 'clicked');  
              //   }
                
              });
              markers.addLayer(marker);
        }
        map.addLayer(markers);

    
        markerArray.push(markers);
        if(markerArray.length > 0 ){
          map.fitBounds(L.featureGroup(markerArray).getBounds().pad(0.2)); 
        }


	// Custom Zoom Control
	map.removeControl(map.zoomControl);

	var zoomOptions = {
		zoomInText: '',
		zoomOutText: '',
	};

	// Creating zoom control
	var zoom = L.control.zoom(zoomOptions);
	zoom.addTo(map);

}


// ----------------------------------------------- //
// Single Listing Map
// ----------------------------------------------- //
function singleListingMap() {

	var lng = parseFloat($( '#singleListingMap' ).data('longitude'));
	var lat =  parseFloat($( '#singleListingMap' ).data('latitude'));
	var singleMapIco =  "<i class='"+$('#singleListingMap').data('map-icon')+"'></i>";

	var hireoIcon = L.divIcon({
	    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
	    popupAnchor: [0, 0],
	    className: 'hireo-marker-icon',
	    html:  '<div class="marker-container no-marker-icon ">'+
	                     '<div class="marker-card">'+
	                        '<div class="front face">' + singleMapIco + '</div>'+
	                        '<div class="back face">' + singleMapIco + '</div>'+
	                        '<div class="marker-arrow"></div>'+
	                     '</div>'+
	                   '</div>'
	    
	  }
	);

	var mapOptions = {
	    center: [lat,lng],
	    zoom: 13,
	    zoomControl: false,
	    gestureHandling: true
	}

	var map_single = L.map('singleListingMap',mapOptions);
	var zoomOptions = {
	   zoomInText: '<i class="fa fa-plus" aria-hidden="true"></i>',
	   zoomOutText: '<i class="fa fa-minus" aria-hidden="true"></i>',
	};

	// Zoom Control
	var zoom = L.control.zoom(zoomOptions);
	zoom.addTo(map_single);

	map_single.scrollWheelZoom.disable();

	marker = new L.marker([lat,lng], {
	      icon: hireoIcon,
	}).addTo(map_single);

	// Open Street Map 
	// -----------------------//
	L.tileLayer(
		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',
		maxZoom: 18,
	}).addTo(map_single);


	// MapBox (Requires API Key)
	// -----------------------//
	// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
	//     attribution: " &copy;  <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy;  <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
	//     maxZoom: 18,
	//     id: 'mapbox.streets',
	//     accessToken: 'ACCESS_TOKEN'
	// }).addTo(map_single);
	

	// Street View Button URL
	$('a#streetView').attr({
		href: 'https://www.google.com/maps/search/?api=1&query='+lat+','+lng+'',
		target: '_blank'
	});
}

// Single Listing Map Init
if(document.getElementById("singleListingMap") !== null){
	singleListingMap();
}


});