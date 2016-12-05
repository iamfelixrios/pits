var prev_infowindow =false;

function createMarker(vm, lat, lng, title, exc, img, cat, dis, adr, id) {  
	var pit = new google.maps.Marker({position: {lat: lat, lng: lng}, title: title, icon: 'img/' + vm.icons[cat]});
    var link = vm.settings.baseUrl + composeLink(title, id);    
    var contentString = '<div id="content"><div id="siteNotice"></div>' +
        '<p><img src="img/'+ vm.icons[cat]+'" align="left" class="infoWnd">'+ vm.setBNames[cat]+'</p>' +
        '<div id="bodyContent">' +
        '<p><img src="'+img+'"></p>' +
        '<a target="_blank" href="' + link + '">'+title+'</a>' +        
        '<p>'+exc+'</p><p class="infoWnd">' + adr + '</p><p>' + dis + '</p></div>';

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
	return pit;
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

function composeLink(title, id){
  return normalizeTitleDetall( title ) + '_' + id + '.html' ;
}

function normalizeTitleDetall(str) {

  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }


  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}