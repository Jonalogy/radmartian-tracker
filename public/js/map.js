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

  // Defining RedMartian's marker
  var radMark_img = {
    url: "images/redmart-bskt.png",
    size: new google.maps.Size(100, 100),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  }
  radMark = new google.maps.Marker({
    position: taxiLatLng,
    map: tracker_map,
    title: 'RedMartian',
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
setInterval(getVehCoords, 6000) //Polling taxi data at every 6 seconds
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
      var taxi = data.features[0].geometry.coordinates[50];
      taxiLatLng = { lat: taxi[1], lng: taxi[0] }
      console.log("RedMartian at: ", taxiLatLng);
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
