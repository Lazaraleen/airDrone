const response2 = await fetch("drones.json");
const dronesJSON = await response2.json();

const drones = dronesJSON;
localStorage.setItem("drones", JSON.stringify(drones));

// **************************************************************** Liste des Drones Actifs *****************************************************

const listeActifs = document.querySelector(".listeDrones");

for (let i = 0; i < drones.length; i++) {
  const dataDrone = document.createElement("div");
  const datas = document.createElement("div");
  dataDrone.classList.add("datadrone");
  datas.classList.add("datas2");

  const nameDrone = document.createElement("p");
  const speed = document.createElement("p");
  const depart = document.createElement("p");
  const arrivee = document.createElement("p");
  const actif = document.createElement("p");

  nameDrone.innerText = drones[i].name;
  speed.innerText = drones[i].speed / 1000 + " secondes";
  depart.innerText = drones[i].depart;
  arrivee.innerText = drones[i].arrivee;
  actif.innerText = drones[i].actif;
  drones[i].actif === "YES"
    ? (actif.style.color = "green")
    : (actif.style.color = "red");

  datas.appendChild(nameDrone);
  datas.appendChild(speed);
  datas.appendChild(depart);
  datas.appendChild(arrivee);
  datas.appendChild(actif);
  dataDrone.appendChild(datas);
  listeActifs.appendChild(dataDrone);
}

// **************************************************************** Modale *****************************************************

let modal = null;
const originalDroneButtons = [];

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector("#modal1");
  target.style.display = null;
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);

  const divDrone = modal.querySelector(".divDrone");
  divDrone.innerHTML = ""; // Nettoyez la divDrone
  originalDroneButtons.forEach((button) => {
    divDrone.appendChild(button);
  });
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
  modal.querySelector("js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((e) => {
  e.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

// Remplir la modale...

const modalbox = document.querySelector(".modal-wrapper");
const image = document.createElement("img");
const divDrone = document.createElement("div");
image.src = "./images/drone2.jpg";
divDrone.classList.add("divDrone");
modalbox.appendChild(image);
modalbox.appendChild(divDrone);

drones.forEach((e) => {
  const droneButton = document.createElement("button");
  droneButton.innerText = e.name;
  droneButton.classList.add("droneButton");
  divDrone.appendChild(droneButton);

  droneButton.addEventListener("click", (e) => {
    e.preventDefault();
    divDrone.innerHTML = "";
    modif(e);
  });

  originalDroneButtons.push(droneButton);
});

function modif(event) {
  const selectedDrone = drones.find((drone) => drone.name === event.target.innerText);
  const id = selectedDrone.id;

  const divItem = document.createElement("div");
  const h3Name = document.createElement("h3");
  const h3Speed = document.createElement("h3");
  // const h3Navette = document.createElement("h3");
  const h3Actif = document.createElement("h3");
  const formName = document.createElement("form");
  const formSpeed = document.createElement("form");
  const formActif = document.createElement("form");

  h3Name.innerText = "Name : " + selectedDrone.name;
  formName.innerHTML = `<input type="text" class="formVar" id="lname" value=${selectedDrone.name}><br><button type="submit" id="newName" class="submitButton">Submit</button>`;
  h3Speed.innerText = "Speed : " + selectedDrone.speed + " s";
  formSpeed.innerHTML = `<input type="text" class="formVar" id="lspeed" value=${selectedDrone.speed}><br><input type="submit" value="Submit" class="submitButton">`;
  // h3Navette.innerText = "Navette : " + selectedDrone.navette;
  h3Actif.innerText = "Actif ? : " + selectedDrone.actif;
  formActif.innerHTML = `<input type="text" class="formVar" id="lactif" value=${selectedDrone.actif}><br><input type="submit" value="Submit" class="submitButton">`;

  // const newName = document.getElementById('newName');
  // const lname = document.getElementById('lname');

  // newName.onclick = function(){
  //   drones[id].name = lname.value;
  // };

  divItem.appendChild(h3Name);
  divItem.appendChild(formName);
  divItem.appendChild(h3Speed);
  divItem.appendChild(formSpeed);
  // divItem.appendChild(h3Navette);
  divItem.appendChild(h3Actif);
  divItem.appendChild(formActif);
  divDrone.appendChild(divItem);
}
