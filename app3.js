const response2 = await fetch("drones.json");
const drones = await response2.json();

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

  // Ajoutez le bouton de drone à la liste des boutons d'origine
  originalDroneButtons.push(droneButton);
});

function modif(event) {
  const divItem = document.createElement("div");
  const h3Name = document.createElement("h3");
  const h3Speed = document.createElement("h3");
  const h3Navette = document.createElement("h3");
  const h3Actif = document.createElement("h3");

  h3Name.innerText = "Name : " + event.name;
  h3Speed.innerText = "Speed : ";
  h3Navette.innerText = "Navette : ";
  h3Actif.innerText = "Actif ? : ";

  divItem.appendChild(h3Name);
  divItem.appendChild(h3Speed);
  divItem.appendChild(h3Navette);
  divItem.appendChild(h3Actif);
  divDrone.appendChild(divItem);
}

// Modele:

// <h3>Changement d'Username</h3>
// {/* Tout le monde n'a pas un userName */}
// {userProfile.userName ? (<p> Votre username actuel: {userProfile.userName}</p>) : (<p> Pas d'username actuellement</p>)}
// {/* Faire un form pour récupérer le nouveau username */}
// <form onSubmit={userNameChange}>
//     <div className="input-wrapper">
//         <label htmlFor="username">Nouveau Username :</label>
//         <input
//         type="text"
//         id="username"
//         value={useName}
//         onChange={(e) => setUseName(e.target.value)}
//         />
//     </div>
//     <button className="sign-in-button" id="connect" type="submit">
//         <span>Submit</span>
//     </button>
// </form>
