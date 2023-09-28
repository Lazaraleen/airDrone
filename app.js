var map = L.map('map').setView([43.30, -0.36], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Entrepot A",
          "marker-color": "#0000ff",
          "marker-size": "medium",
          "marker-symbol": "circle"
        },
        "geometry": {
          "coordinates": [
            -0.33335181750962306,
            43.30510575413709
          ],
          "type": "Point"
        },
        "id": 0
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Entrepot B",
          "marker-color": "#ff0000",
          "marker-size": "medium",
          "marker-symbol": "circle"
        },
        "geometry": {
          "coordinates": [
            -0.3467019497672652,
            43.32708689909185
          ],
          "type": "Point"
        },
        "id": 1
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Entrepot C",
          "marker-color": "#ff0000",
          "marker-size": "medium",
          "marker-symbol": "circle"
        },
        "geometry": {
          "coordinates": [
            -0.3660396672554498,
            43.30431079114095
          ],
          "type": "Point"
        },
        "id": 2
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Entrepot D",
          "marker-color": "#0000ff",
          "marker-size": "medium",
          "marker-symbol": "circle"
        },
        "geometry": {
          "coordinates": [
            -0.3575459723712413,
            43.317138041047514
          ],
          "type": "Point"
        },
        "id": 3
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Entrepot E",
          "marker-color": "#0000ff",
          "marker-size": "medium",
          "marker-symbol": "circle"
        },
        "geometry": {
          "coordinates": [
            -0.36976413932083574,
            43.291712929765225
          ],
          "type": "Point"
        },
        "id": 4
      }
    ]
};

L.geoJSON(geojson).bindPopup(function(layer){
    return layer.feature.properties.name; 
}).addTo(map);


// **************************************************************** entrepotDE *****************************************************

var entrepotDE = [[43.317138041047514, -0.3575459723712413], [43.291712929765225, -0.36976413932083574], [43.317138041047514, -0.3575459723712413]];
map.fitBounds(entrepotDE);

var marker1 = L.Marker.movingMarker(entrepotDE, [20000, 20000], {autostart: true, loop: true}).addTo(map);
marker1._icon.style.filter = "hue-rotate(120deg)"
L.polyline(entrepotDE).addTo(map);

marker1.once('click', function () {
    marker1.start();
    marker1.closePopup();
});

marker1.openPopup();


// **************************************************************** entrepotAB *****************************************************

var entrepotAB = [[43.30510575413709, -0.33335181750962306], [43.32708689909185, -0.3467019497672652], [43.30510575413709, -0.33335181750962306]];
map.fitBounds(entrepotAB);

var marker2 = L.Marker.movingMarker(entrepotAB, [13000, 13000], {autostart: true, loop: true}).addTo(map);
marker2._icon.style.filter = "hue-rotate(70deg)"
L.polyline(entrepotAB).addTo(map);

marker1.once('click', function () {
    marker2.start();
    marker2.closePopup();
});

marker1.openPopup();


// **************************************************************** entrepotAC *****************************************************

var entrepotAC = [[43.30510575413709, -0.33335181750962306], [43.30431079114095, -0.3660396672554498], [43.30510575413709, -0.33335181750962306]];
map.fitBounds(entrepotAC);

var marker2 = L.Marker.movingMarker(entrepotAC, [8000, 8000], {autostart: true, loop: true}).addTo(map);
marker2._icon.style.filter = "hue-rotate(170deg)"
L.polyline(entrepotAC).addTo(map);

marker1.once('click', function () {
    marker2.start();
    marker2.closePopup();
});

marker1.openPopup();












// *************************************************** Passage par les routes *********************************************

// L.Routing.control({
//     waypoints: [
//       L.latLng(43.291712929765225, -0.36976413932083574),
//       L.latLng(43.295051455486174, -0.37564775494104197)
//     ]
//   }).addTo(map);