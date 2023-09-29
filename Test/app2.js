const response = await fetch("entrepots.json");
const entrepot = await response.json();

const response2 = await fetch("drones.json");
let drones = await response2.json();

if (localStorage !== null) {
  const storedDrones = localStorage.getItem("drones");

  if (storedDrones !== null) {
    drones = JSON.parse(storedDrones);
  }
}

const coordA = entrepot[0];
const coordB = entrepot[1];
const coordC = entrepot[2];
const coordD = entrepot[3];
const coordE = entrepot[4];
const coordF = entrepot[5];

const map = L.map("map").setView([43.3, -0.36], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// **************************************************************** Coordonnées Entrepots *****************************************************

var entrepotA = L.marker(coordA.geometry.coordinates).addTo(map);
var entrepotB = L.marker(coordB.geometry.coordinates).addTo(map);
var entrepotC = L.marker(coordC.geometry.coordinates).addTo(map);
var entrepotD = L.marker(coordD.geometry.coordinates).addTo(map);
var entrepotE = L.marker(coordE.geometry.coordinates).addTo(map);
var entrepotF = L.marker(coordF.geometry.coordinates).addTo(map);

entrepotA.bindPopup(coordA.properties.name);
entrepotB.bindPopup(coordB.properties.name);
entrepotC.bindPopup(coordC.properties.name);
entrepotD.bindPopup(coordD.properties.name);
entrepotE.bindPopup(coordE.properties.name);
entrepotF.bindPopup(coordF.properties.name);

// **************************************************************** entrepotDE *****************************************************

if (drones[2].actif == "YES") {
  const entrepotDE = [
    coordD.geometry.coordinates,
    coordE.geometry.coordinates,
    coordD.geometry.coordinates,
  ];
  map.fitBounds(entrepotDE);

  // let lengthDE = map.distance(coordD.geometry.coordinates, coordE.geometry.coordinates);
  // // let timeDE = ((lengthDE * 3.6) / drones[2].speed);
  // let speedDE = Math.floor((lengthDE * 3600) / 15000);
  // drones[2].speed = speedDE;
  // // Le chiffre de la division est celui renseigné dans le monvingMarker

  // const marker0 = L.Marker.movingMarker(entrepotDE, 15000, {autostart: true, loop: true}).addTo(map);
  const marker2 = L.Marker.movingMarker(entrepotDE, drones[2].speed, {
    autostart: true,
    loop: true,
  }).addTo(map);
  marker2._icon.style.filter = "hue-rotate(120deg)";
  L.polyline(entrepotDE).addTo(map);

  marker2.once("click", function () {
    marker2.start();
    marker2.closePopup();
  });

  const droneSuivi = document.querySelector(".suivi");
  const mondrone = document.createElement("p");

  const intervalPosition = setInterval(position, 500);

  function position() {
    mondrone.innerText =
      "Votre drone " + drones[2].name + " est ici : " + marker2.getLatLng();
  }

  marker2.openPopup();
  droneSuivi.appendChild(mondrone);
}

// **************************************************************** entrepotAB *****************************************************

if (drones[0].actif == "YES") {
  const entrepotAB = [
    coordA.geometry.coordinates,
    coordB.geometry.coordinates,
    coordA.geometry.coordinates,
  ];
  map.fitBounds(entrepotAB);

  const marker0 = L.Marker.movingMarker(entrepotAB, drones[0].speed, {
    autostart: true,
    loop: true,
  }).addTo(map);
  marker0._icon.style.filter = "hue-rotate(70deg)";
  L.polyline(entrepotAB).addTo(map);

  marker0.once("click", function () {
    marker0.start();
    marker0.closePopup();
  });

  marker0.openPopup();
}

// **************************************************************** entrepotAC *****************************************************

if (drones[1].actif == "YES") {
  const entrepotAC = [
    coordA.geometry.coordinates,
    coordC.geometry.coordinates,
    coordA.geometry.coordinates,
  ];
  map.fitBounds(entrepotAC);

  const marker1 = L.Marker.movingMarker(entrepotAC, drones[1].speed, {
    autostart: true,
    loop: true,
  }).addTo(map);
  marker1._icon.style.filter = "hue-rotate(170deg)";
  L.polyline(entrepotAC).addTo(map);

  marker1.once("click", function () {
    marker1.start();
    marker1.closePopup();
  });

  marker1.openPopup();
}

// **************************************************************** entrepotEF *****************************************************

if (drones[3].actif == "YES") {
    const entrepotEF = [
      coordE.geometry.coordinates,
      coordF.geometry.coordinates,
      coordE.geometry.coordinates,
    ];
    map.fitBounds(entrepotEF);
  
    const marker3 = L.Marker.movingMarker(entrepotEF, drones[3].speed, {
      autostart: true,
      loop: true,
    }).addTo(map);
    marker3._icon.style.filter = "hue-rotate(240deg)";
    L.polyline(entrepotEF).addTo(map);
  
    marker3.once("click", function () {
        marker3.start();
        marker3.closePopup();
    });
  
    marker3.openPopup();
  }

// **************************************************************** Drones Actifs *****************************************************

const dronesActifs = document.querySelector(".dronesActifs");

for (let i = 0; i < drones.length; i++) {
  if (drones[i].actif == "YES") {
    const dataDrone = document.createElement("div");
    const datas = document.createElement("div");
    // const position = document.createElement("div");
    dataDrone.classList.add("datadrone");
    datas.classList.add("datas");
    // position.classList.add("position");

    const nameDrone = document.createElement("p");
    const speed = document.createElement("p");
    const destination = document.createElement("p");
    // const positionDrone = document.createElement("p");

    nameDrone.innerText = drones[i].name;
    speed.innerText = drones[i].speed / 1000 + " secondes";
    destination.innerText = drones[i].depart + " - " + drones[i].arrivee;

    datas.appendChild(nameDrone);
    datas.appendChild(speed);
    datas.appendChild(destination);
    // position.appendChild(positionDrone);
    dataDrone.appendChild(datas);
    // dataDrone.appendChild(position);
    dronesActifs.appendChild(dataDrone);
  }
}
