// Starting coordinates;
var mapStart = { center: { lat: 1.3521, lng: 103.8189 }, zoom: 13 };
var radmart = { lat: 1.312623, lng: 103.7225139 }
var changiAirport = { lat: 1.3644202, lng: 103.9915308 }

var customerName = $("#customer").text()
var clientCoords = { lat: parseFloat($("#lat").text()), lng: parseFloat($("#lng").text()), }

var taxiLatLng = radmart;
var tracker_map, geocoder;

var radMark, clientMark;
var bounds;

//----Callback InitMap()
function initMap(){
  tracker_map = new google.maps.Map(document.getElementById('map'), mapStart);
  bounds = new google.maps.LatLngBounds();
  geocoder = new google.maps.Geocoder;


  // Defining RadMartian's marker
  var radMark_img = {
    url: "images/redmart-bskt.png",
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
    title: customerName
  });

  getVehCoords();
}

//----Updating of RedMartian's location
setInterval(getVehCoords, 10000) //Polling taxi data at every 6 seconds
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
      console.log('data', data.features[0].geometry)
      var nth_taxi = $('#taxi').text();
      var taxi = data.features[0].geometry.coordinates[nth_taxi];
      taxiLatLng = { lat: taxi[1], lng: taxi[0] }
      console.log("RadMartian at: ", taxiLatLng);
      change_pos(taxiLatLng)
    })
  }
  function change_pos(taxiLatLng) {
    var latLng = new google.maps.LatLng(taxiLatLng.lat, taxiLatLng.lng);
    radMark.setPosition(latLng);

    //Resetting bounds as RedMartian's position is updated
    bounds = new google.maps.LatLngBounds()
    bounds.extend(clientMark.position)
    bounds.extend(radMark.position)
    tracker_map.fitBounds(bounds)
    var centerBounds = (tracker_map.getBounds()).getCenter()
    tracker_map.setCenter(centerBounds);

    geocoder.geocode({'location': latLng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        console.log(results)
        $("#radLocation").text(results[1].formatted_address)

      } else {
        window.alert("Hmm, we're looking for our redmartian");
      }
    } else {
      window.alert('Uhoh, error: ' + status);
    }
  });

  }
}//END function getVehCoords

//----Event Listeners

$('#nav-logout').click(function(){
  console.log("Attempting to logout");
  window.location = "auth/logout"
})
