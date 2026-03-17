// export function ajoutListenersAvis() {

//     const piecesElements = document.querySelectorAll(".fiches article button");

//     for (let i = 0; i < piecesElements.length; i++) {

//      piecesElements[i].addEventListener("click", async function (event) {

//         const id = event.target.dataset.id;
//         const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
//         const avis = await reponse.json();
//         const pieceElement = event.target.parentElement;

//         const avisElement = document.createElement("p");
//         for (let i = 0; i < avis.length; i++) {
//             avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
//         }
//         pieceElement.appendChild(avisElement);

//      });

//     }
//  }

//  export function ajoutListenerEnvoyerAvis() {
//     const formulaireAvis = document.querySelector(".formulaire-avis");
//     formulaireAvis.addEventListener("submit", function (event) {
//     event.preventDefault();
//     // Création de l’objet du nouvel avis.
//     const avis = {
//         pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
//         utilisateur: event.target.querySelector("[name=utilisateur]").value,
//         commentaire: event.target.querySelector("[name=commentaire]").value,

//     };
//     // Création de la charge utile au format JSON
//     const chargeUtile = JSON.stringify(avis);
//     // Appel de la fonction fetch avec toutes les informations nécessaires
//     fetch("http://localhost:8081/avis", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: chargeUtile
//     });
//     });
//  }

export function ajoutListenersAvis() {
  const piecesElements = document.querySelectorAll(".fiches article button");

  for (let i = 0; i < piecesElements.length; i++) {
    piecesElements[i].addEventListener("click", async function (event) {
      const id = event.target.dataset.id;
      const reponse = await fetch(
        "http://localhost:8081/pieces/" + id + "/avis",
      );
      const avis = await reponse.json();
      const pieceElement = event.target.parentElement;

      const avisElement = document.createElement("p");
      for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
      }
      pieceElement.appendChild(avisElement);
    });
  }
}

export function ajoutListenerEnvoyerAvis() {
  const formulaireAvis = document.querySelector(".formulaire-avis");

  const champPieceId = formulaireAvis.querySelector("[name=piece-id]");

  // animation  est lqnce q lq saisi dqns le input
  champPieceId.addEventListener("input", function (event) {
    const pieceIdSaisi = event.target.value;
    const boutonCible = document.querySelector(
      `article button[data-id="${pieceIdSaisi}"]`,
    );

    if (boutonCible) {
      const ficheArticle = boutonCible.parentElement;

      //css dqns js
      ficheArticle.style.transition = "all 0.5s";
      ficheArticle.style.transform = "scale(1.05)";
      ficheArticle.style.backgroundColor = "#f0f0f0";

      setTimeout(() => {
        
        ficheArticle.style.backgroundColor = "beige";
      }, 1000);
    }
  });

  // qu submit le com est envoyer
  formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault();

    // Création de l’objet du nouvel avis.
    const avis = {
      pieceId: parseInt(champPieceId.value),
      utilisateur: event.target.querySelector("[name=utilisateur]").value,
      commentaire: event.target.querySelector("[name=commentaire]").value,
    };

    const chargeUtile = JSON.stringify(avis);

    // fonction fetch avec api
    fetch("http://localhost:8081/avis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });

    // Vider le formulaire après l'envoi
    event.target.reset();
  });
}
