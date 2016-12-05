var prev_infowindow =false;

function  createMarkers(vm){
  for(var i=0; i< vm.pits.length; i++){
    //addMarker(markers,41.38584,2.1860828,texts[0][0],texts[0][1],texts[0][2],'3','Ciutat Vella');
    addMarker(vm,vm.pits[i].lat,vm.pits[i].lng,vm.pits[i].tit,vm.pits[i].abs,vm.pits[i].img,vm.pits[i].icon,vm.pits[i].dis);    
  }
}

function addMarker(vm, lat, lng, title, exc, img, cat, dis){
	var pit;
	pit = new google.maps.Marker({position: {lat: lat, lng: lng}, title: title, icon: 'img/' + vm.icons[cat]});
    var contentString = '<div id="content"><div id="siteNotice"></div>' +
        '<h4 id="firstHeading" class="firstHeading"><a href="">'+title+'</a></h4>'+
        '<div id="bodyContent">'+
        '<p><img src="'+img+'"></p><p>'+exc+'</p><p>'+dis+'</p>'+'<p><img src="img/'+ vm.icons[cat]+'" align="left">'+ vm.setBNames[cat]+'</p>'
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 225
    });       

    pit.addListener('click', function() {
        if( prev_infowindow ) {
           prev_infowindow.close();
        }
        prev_infowindow = infowindow;

        infowindow.open(map, pit);
    });  	
	vm.markers.push(pit);
}

// Sets the map on all markers in the array.
function setMapOnAll(map, layer) {
  for (var i = 0; i < layer.length; i++) {
    layer[i].setMap(map);
  }
}
// Removes the markers from the map, but keeps them in the array.
function clearLayer(layer) {
  setMapOnAll(null, layer);
}

// Shows any markers currently in the array.
function showLayer(layer) {
  setMapOnAll(map, layer);
}

// Deletes all markers in the array by removing references to them.
function deleteLayer() {
  clearLayer(layer);
  layer = [];
}