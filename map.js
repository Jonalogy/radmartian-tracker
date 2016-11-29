
// Starting coordinates;
var mapStart = { center: { lat: 1.3521, lng: 103.8189 }, zoom: 13 };
var redmart = { lat: 1.312623, lng: 103.7225139 }
var changiAirport = { lat: 1.3644202, lng: 103.9915308 }
var clientCoords = { lat: 1.3468548, lng: 103.7709016 }

var taxiLatLng = redmart;
var tracker_map;
var radMark, clientMark;
var bounds;

//----Callback InitMap()
function initMap(){
  tracker_map = new google.maps.Map(document.getElementById('map'), mapStart);
  bounds = new google.maps.LatLngBounds();

  // Defining RadMartian's marker
  var radMark_img = {
    url: "images/redmart-bskt(1).png",
    size: new google.maps.Size(100, 100),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  }
  radMark = new google.maps.Marker({
    position: taxiLatLng,
    map: tracker_map,
    title: 'RadMartian',
    icon: radMark_img,
  });

  // Defining Client's address marker
  clientMark = new google.maps.Marker({
    position: clientCoords,
    map: tracker_map,
    title: 'Your Address'
  });

  getVehCoords();
}

//----Updating of RedMartian's location
setInterval(getVehCoords, 10000) //Polling taxi data
function getVehCoords(){
  var d = (new Date()).toISOString();
  var iso_date = d.substring(0 , 19)

  var url = "https://api.data.gov.sg/v1/transport/taxi-availability?date_time=" + iso_date
  ajaxTaxiAvailability(url);

  function ajaxTaxiAvailability(url){
    $.ajax({
      url: url,
      method: "GET",
      headers: { 'api-key': 'ezrYi8fQCFNhMc21SdHdcqqhzSApjgGP'}
    }).done(function(data){
      var taxi = data.features[0].geometry.coordinates[100];
      taxiLatLng = { lat: taxi[1], lng: taxi[0] }
      console.log("RadMartian at: ", taxiLatLng);
      change_pos(taxiLatLng)
    })
  }
  function change_pos(taxiLatLng) {
    var LatLong = new google.maps.LatLng(taxiLatLng.lat, taxiLatLng.lng);
    radMark.setPosition(LatLong);

    //Resetting bounds as RedMartian's position is updated
    bounds = new google.maps.LatLngBounds()
    bounds.extend(clientMark.position)
    bounds.extend(radMark.position)
    tracker_map.fitBounds(bounds)
    var centerBounds = (tracker_map.getBounds()).getCenter()
    tracker_map.setCenter(centerBounds);
  }
}//END function getVehCoords




// //----- DOMContentLoaded events
// document.addEventListener("DOMContentLoaded" , function(event){
//   console.log("DOMContentLoaded")
//
// })


//-------initMap() for multiple Markers

  // function initMap(){
  //   console.log("Callback: initMap");
  //
  //   var largeInfowindow = new google.maps.InfoWindow();
  //   var bounds = new google.maps.LatLngBounds();
  //
  //   //Map Setup
  //   tracker_map = new google.maps.Map( document.getElementById('map') , mapStart );
  //   var redmart = { lat: 1.312623, lng: 103.7225139 }
  //
  //   // Markers
  //   var markers = []; //creating a blank marker
  //   var locations = [
  //     { title: "Jurong Point", position: {lat: 1.339509, lng: 103.7058107 } },
  //     { title: "Lakeshore Condominium", position: {lat: 1.3457178, lng: 103.7226515 } },
  //     { title: "Regent Heights", position: {lat: 1.3525186, lng: 103.7559745 } }
  //   ];
  //
  //   var i = 0;
  //   locations.forEach( function(location) {
  //     i++;
  //     var marker = new google.maps.Marker(
  //       { map: tracker_map,
  //         position: location.position,
  //         title: location.title,
  //         animation: google.maps.Animation.DROP,
  //         id: 1 }
  //     );
  //     // Push the marker to our array of markers.
  //     markers.push(marker)
  //     // Extend the boundaries of the map for each marker
  //     bounds.extend(marker.position);
  //     // Create and onclick event to open an infowindow at each marker.
  //     marker.addListener('click' , function(){
  //       populateInfoWindow( this, largeInfowindow )
  //     })
  //   }) //END locations.forEach()
  //
  //   map.fitBounds(bounds);
  // } //END initMap

  // function populateInfoWindow(){
  //   // Check to make sure the infowindow si not already opened on this marker.
  //   if(infowindow.marker != marker) {
  //     infowindow.amrker = marker;
  //     infowindow.setContent('<div>' + marker.title + '</div>');
  //     infowindow.open(map, marker);
  //     // Make sure the marker property is cleared if the infowindow is closed.
  //     infowindow. addListener('closeclick' ,function(){
  //       infowindow.setMarker(null);
  //     })
  //   } //END if(infowindow.marker != marker)
  // }
