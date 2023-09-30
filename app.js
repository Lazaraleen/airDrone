const response2 = await fetch("drones.json");
const dronesJSON = await response2.json();

let drones = dronesJSON;
if (localStorage !== null) {
  const storedDrones = localStorage.getItem("drones");

  if (storedDrones !== null) {
    drones = JSON.parse(storedDrones);
  }
}

// Remplir la modale...

const modalbox = document.querySelector(".modal-wrapper");
const image = document.createElement("img");
const divDrone = document.createElement("div");
image.src = "./images/drone2.jpg";
divDrone.classList.add("divDrone");
modalbox.appendChild(image);
modalbox.appendChild(divDrone);

// **************************************************************** Liste des Drones *****************************************************

const listeActifs = document.querySelector(".listeDrones");

// Affiche la liste des drones et leurs données
function listeDrone() {
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
    // Affiche YES en vert, sinon c'est en rouge
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
}

listeDrone();

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


// Affiche les boutons avec le nom des drones
function buttonDrone() {
  originalDroneButtons.length = 0;  // sinon à chaque fermeture puis réouverture de la modale, les boutons sont rajoutés à la précédente liste
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
}

buttonDrone();

function modif(event) {
  const selectedDrone = drones.find(
    (drone) => drone.name === event.target.innerText
  );
  const id = selectedDrone.id;

  // Création du visuel de la modale pour permettre à l'utilisateur de modifier ses données pour les drones
  const divItem = document.createElement("div");
  const h3Name = document.createElement("h3");
  const h3Speed = document.createElement("h3");
  const h3Actif = document.createElement("h3");
  const h3Depart = document.createElement("h3");
  const h3Arrivee = document.createElement("h3");
  const formName = document.createElement("form");
  const formSpeed = document.createElement("form");
  const formActif = document.createElement("form");
  const formDepart = document.createElement("form");
  const formArrivee = document.createElement("form");
  const inputName = document.createElement("input");
  const inputSpeed = document.createElement("input");
  const inputActif = document.createElement("input");
  const inputDepart= document.createElement("input");
  const inputArrivee = document.createElement("input");
  const buttonSubmit = document.createElement("button");

  h3Name.innerText = "Name : " + selectedDrone.name;
  formName.classList.add("form");
  inputName.type = "text";
  inputName.classList.add("formVar");
  inputName.setAttribute("id", "lname");

  // Les différents inputs où l'utilisateur peut faire des modification
  h3Speed.innerText = "Speed : " + selectedDrone.speed + " ms";
  formSpeed.classList.add("form");
  inputSpeed.type = "text";
  inputSpeed.classList.add("formVar");
  inputSpeed.setAttribute("id", "lspeed");

  h3Depart.innerText = "Entrepot de départ : " + selectedDrone.depart;
  formDepart.classList.add("form");
  inputDepart.type = "text";
  inputDepart.classList.add("formVar");
  inputDepart.setAttribute("id", "ldepart");

  h3Arrivee.innerText = "Entrepot d'arrivée : " + selectedDrone.arrivee;
  formArrivee.classList.add("form");
  inputArrivee.type = "text";
  inputArrivee.classList.add("formVar");
  inputArrivee.setAttribute("id", "larrivee");
  
  h3Actif.innerText = "Actif ? : " + selectedDrone.actif;
  formActif.classList.add("form");
  inputActif.type = "text";
  inputActif.classList.add("formVar");
  inputActif.setAttribute("id", "lactif");
  
  buttonSubmit.classList.add("submitButton2");
  buttonSubmit.setAttribute("id", "newSubmitButton");
  buttonSubmit.innerText = "Submit";

  divItem.appendChild(h3Name);
  formName.appendChild(inputName);
  divItem.appendChild(formName);
  divItem.appendChild(h3Speed);
  formSpeed.appendChild(inputSpeed);
  divItem.appendChild(formSpeed);
  divItem.appendChild(h3Actif);
  formActif.appendChild(inputActif);
  divItem.appendChild(formActif);
  divItem.appendChild(h3Depart);
  formDepart.appendChild(inputDepart);
  divItem.appendChild(formDepart);
  divItem.appendChild(h3Arrivee);
  formArrivee.appendChild(inputArrivee);
  divItem.appendChild(formArrivee);
  divItem.appendChild(buttonSubmit);
  divDrone.appendChild(divItem);

  // Récupération et modification des données sur le localStorage
  let newSubmitButton = document.getElementById("newSubmitButton");
  const lname = document.getElementById("lname");
  const lspeed = document.getElementById("lspeed");
  const lactif = document.getElementById("lactif");
  const ldepart = document.getElementById("ldepart");
  const larrivee = document.getElementById("larrivee");

  newSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (lname.value != "") {
      const newName = lname.value;
      drones[id].name = newName;
      h3Name.innerText = "Nom : " + newName;
    };
    if (lspeed.value != "") {
      const newSpeed = lspeed.value;
      drones[id].speed = newSpeed;
      h3Speed.innerText = "Speed : " + newSpeed + " ms";
    };
    if (ldepart.value != "") {
      const newDepart = ldepart.value;
      drones[id].depart = newDepart;
      h3Depart.innerText = "Entrepot de départ : " + newDepart;
    };
    if (larrivee.value != "") {
      const newArrivee = larrivee.value;
      drones[id].arrivee = newArrivee;
      h3Arrivee.innerText = "Entrepot d'arrivée : " + newArrivee;
    };
    if (lactif.value != "") {
      const newActif = lactif.value;
      drones[id].actif = newActif;
      h3Actif.innerText = "Actif ? : " + newActif;
    };
    localStorage.setItem("drones", JSON.stringify(drones));
    divDrone.innerHTML = "";
    buttonDrone();
    listeActifs.innerHTML = "";
    listeDrone();
  });
}
