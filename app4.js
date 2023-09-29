const response = await fetch("entrepots.json");
const entrepot = await response.json();

const response2 = await fetch("drones.json");
let drones = await response2.json();

const dronesActifs = document.querySelector(".dronesActifs");

// Si il y a déjà des données dans le localStorage, prendre les drones qui sont dessus à la place du fichier JSON car ce sont les données actualisées qui sont dedans
if (localStorage !== null) {
  const storedDrones = localStorage.getItem("drones");

  if (storedDrones !== null) {
    drones = JSON.parse(storedDrones);
  }
}

// Affichage de la map
const map = L.map("map").setView([43.3, -0.36], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);


// **************************************************************** Coordonnées Entrepots *****************************************************

// Récupère les coordonnées des entrepots et les marquent sur la carte
const coord=[];
const entrepotCoord = [];
for (let i = 0; i < entrepot.length; i++) {
    coord[i] = entrepot[i];
    entrepotCoord[i] = L.marker(coord[i].geometry.coordinates).addTo(map);
    entrepotCoord[i].bindPopup(coord[i].properties.name);
};


// **************************************************************** Entrepots non fixe *****************************************************

// Récupère les drones du fichier JSON ou du localStorage si il y en a un

for (let i = 0; i < drones.length; i++) {
    let coordArr;
    let coordDep;
    let marker=[];
    let color=[];
  if (drones[i].actif == "YES") {

    // Affichage du tableau des drones actifs
    const dataDrone = document.createElement("div");
    const datas = document.createElement("div");
    dataDrone.classList.add("datadrone");
    datas.classList.add("datas");

    const nameDrone = document.createElement("p");
    const speed = document.createElement("p");
    const destination = document.createElement("p");

    nameDrone.innerText = drones[i].name;
    speed.innerText = drones[i].speed / 1000 + " secondes";
    destination.innerText = drones[i].depart + " - " + drones[i].arrivee;

    datas.appendChild(nameDrone);
    datas.appendChild(speed);
    datas.appendChild(destination);
    dataDrone.appendChild(datas);
    dronesActifs.appendChild(dataDrone);

    // Récupère les coordonnées des entrepots de départ et d'arrivée pour le drone[i]
    for (let j = 0; j < entrepot.length; j++) {
      if(drones[i].arrivee === entrepot[j].properties.letter) {coordArr = entrepot[j]};
      if(drones[i].depart === entrepot[j].properties.letter) {coordDep = entrepot[j]};      
    }    
    const entrepotArrDep = [
      coordArr.geometry.coordinates,
      coordDep.geometry.coordinates,
      coordArr.geometry.coordinates,
    ];

    map.fitBounds(entrepotArrDep);

    marker[i] = drones[i].markerName;
  
    marker[i] = L.Marker.movingMarker(entrepotArrDep, drones[i].speed, {
      autostart: true,
      loop: true,
    }).addTo(map);

    // Donne une couleur différente pour chaque drone
    color[i] = (i+12)* ((i+1)*5);

    marker[i]._icon.style.filter = `hue-rotate(${color[i]}deg)`;
    L.polyline(entrepotArrDep).addTo(map);
  
    marker[i].once("click", function () {
        marker[i].start();
        marker[i].closePopup();
    });
  
    marker[i].openPopup();
  }
}