const response2 = await fetch("drones.json");
const dronesJSON = await response2.json();

let drones = dronesJSON;
// localStorage.setItem("drones", JSON.stringify(drones));
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

// **************************************************************** Liste des Drones Actifs *****************************************************

const listeActifs = document.querySelector(".listeDrones");

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

  divDrone.innerHTML = ""; // Nettoyez la divDrone
  console.log(originalDroneButtons);
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

  const divItem = document.createElement("div");
  const h3Name = document.createElement("h3");
  const h3Speed = document.createElement("h3");
  const h3Actif = document.createElement("h3");
  const formName = document.createElement("form");
  const formSpeed = document.createElement("form");
  const formActif = document.createElement("form");
  const inputName = document.createElement("input");
  const buttonName = document.createElement("button");
  const inputSpeed = document.createElement("input");
  const buttonSpeed = document.createElement("button");
  const inputActif = document.createElement("input");
  const buttonActif = document.createElement("button");

  h3Name.innerText = "Name : " + selectedDrone.name;
  formName.classList.add("form");
  inputName.type = "text";
  inputName.classList.add("formVar");
  inputName.setAttribute("id", "lname");
  buttonName.classList.add("submitButton");
  buttonName.setAttribute("id", "newNameButton");
  buttonName.innerText = "Submit";
  // formName.innerHTML = `<input type="text" class="formVar" id="lname">
  //     <button id="newNameButton" class="submitButton">Submit</button>`;
  h3Speed.innerText = "Speed : " + selectedDrone.speed + " s";
  formSpeed.classList.add("form");
  inputSpeed.type = "text";
  inputSpeed.classList.add("formVar");
  inputSpeed.setAttribute("id", "lspeed");
  buttonSpeed.classList.add("submitButton");
  buttonSpeed.setAttribute("id", "newSpeedButton");
  buttonSpeed.innerText = "Submit";
  // formSpeed.innerHTML = `<input type="text" class="formVar" id="lspeed"><br><input type="submit" value="Submit" class="submitButton">`;
  h3Actif.innerText = "Actif ? : " + selectedDrone.actif;
  formActif.classList.add("form");
  inputActif.type = "text";
  inputActif.classList.add("formVar");
  inputActif.setAttribute("id", "lactif");
  buttonActif.classList.add("submitButton");
  buttonActif.setAttribute("id", "newActifButton");
  buttonActif.innerText = "Submit";
  // formActif.innerHTML = `<input type="text" class="formVar" id="lactif"><br><input type="submit" value="Submit" class="submitButton">`;

  divItem.appendChild(h3Name);
  formName.appendChild(inputName);
  formName.appendChild(buttonName);
  divItem.appendChild(formName);
  divItem.appendChild(h3Speed);
  formSpeed.appendChild(inputSpeed);
  formSpeed.appendChild(buttonSpeed);
  divItem.appendChild(formSpeed);
  divItem.appendChild(h3Actif);
  formActif.appendChild(inputActif);
  formActif.appendChild(buttonActif);
  divItem.appendChild(formActif);
  divDrone.appendChild(divItem);

  let newNameButton = document.getElementById("newNameButton");
  const lname = document.getElementById("lname");

  newNameButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newName = lname.value;
    drones[id].name = newName;
    h3Name.innerText = "Nom : " + newName;
    localStorage.setItem("drones", JSON.stringify(drones));
    divDrone.innerHTML = "";
    buttonDrone();
    listeActifs.innerHTML = "";
    listeDrone();
  });

  let newSpeedButton = document.getElementById("newSpeedButton");
  const lspeed = document.getElementById("lspeed");

  newSpeedButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newSpeed = lspeed.value;
    drones[id].speed = newSpeed;
    h3Speed.innerText = "Nom : " + newSpeed;
    localStorage.setItem("drones", JSON.stringify(drones));
    divDrone.innerHTML = "";
    buttonDrone();
    listeActifs.innerHTML = "";
    listeDrone();
  });

  let newActifButton = document.getElementById("newActifButton");
  const lactif = document.getElementById("lactif");

  newActifButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newActif = lactif.value;
    drones[id].actif = newActif;
    h3Actif.innerText = "Nom : " + newActif;
    localStorage.setItem("drones", JSON.stringify(drones));
    divDrone.innerHTML = "";
    buttonDrone();
    listeActifs.innerHTML = "";
    listeDrone();
  });

}
