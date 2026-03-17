// // Récupération des pièces depuis le fichier JSON
// const reponse = await fetch("pieces-autos.json");
// const pieces = await reponse.json();
//const { forwardRef } = require("react");

// for (let i = 0; i < pieces.length; i++) {

// //creation des elements du DOM
// const article = pieces[3];
// const imageElement = document.createElement("img");
//     imageElement.src = article.image;
//     // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
// imageElement.src = pieces[i].image;

// const nomElement = document.createElement("h2");
// nomElement.innerText = article.nom;
// //ici operateur ternair car il y a 2 possibilite et litteraux gabarit pour la conca
// const prixElement = document.createElement("p");
// prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
// //ici operateur nullish car il n y a pas de categorie donc ca ce fait au cas ou  utilisera la valeur de substitution uniquement dans le cas où l’expression à tester fournit la valeur null ou undefined.
// const categorieElement = document.createElement("p");
// categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

// const descriptionElement = document.createElement("p");
// descriptionElement.innerText =
//         article.description ?? "(pas de description pour le moment)";

//     // Création d’une balise dédiée à une pièce automobile
// const pieceElement = document.createElement("article");

// // relier les parents aux enfants avec les elements cree
// const sectionFiches = document.querySelector(".fiches");
// sectionFiches.appendChild(imageElement);
// sectionFiches.appendChild(nomElement);
// sectionFiches.appendChild(prixElement);
// sectionFiches.appendChild(categorieElement);
// sectionFiches.appendChild(descriptionElement);
// // On rattache la balise article à la section Fiches
// sectionFiches.appendChild(pieceElement);

// Récupération des pièces depuis le fichier JSON

import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();
// on appel la fonction pour ajouter le listener au formulaire
ajoutListenerEnvoyerAvis();

function genererPieces(pieces) {
  for (let i = 0; i < pieces.length; i++) {
    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText =
      article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText =
      article.disponibilite === "oui" ? "En stock" : "Rupture de stock";
    //Code ajouté
    const avisBouton = document.createElement("button");
    avisBouton.dataset.id = article.id;
    avisBouton.textContent = "Afficher les avis";

    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)

    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);
    //Code aJouté
    pieceElement.appendChild(avisBouton);
  }
  ajoutListenersAvis();
}

genererPieces(pieces);

//gestion des bouttons
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.prix <= 35;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});

//Correction Exercice
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return b.prix - a.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});

// On initialise la liste affichée avec toutes les pièces au départ
let piecesAffichees = [...pieces];

const boutonFiltrerDescription = document.querySelector(".btn-description");
boutonFiltrerDescription.addEventListener("click", function () {
  // 1. On filtre la liste globale
  piecesAffichees = pieces.filter(function (piece) {
    return piece.description; // Garde ceux qui ont une description
  });
  // 2. On vide et on génère
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesAffichees);
});

const noms = pieces.map((piece) => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].prix > 35) {
    noms.splice(i, 1);
    noms.splice(i, 1);
  }
}
console.log(noms);

// Section Abordables
const pElement = document.createElement("p");
pElement.innerText = "Pièces abordables :";

const abordablesElements = document.createElement("ul");

// On parcourt la liste complète des pièces
for (let i = 0; i < pieces.length; i++) {
  if (pieces[i].prix <= 35) {
    const nomElement = document.createElement("li");
    // On affiche le nom et le prix pour vérifier
    nomElement.innerText = `${pieces[i].nom} €`;
    abordablesElements.appendChild(nomElement);
  }
}

// Ajout au bloc résultats filtres
const zoneAbordables = document.querySelector(".abordables");
zoneAbordables.appendChild(pElement);
zoneAbordables.appendChild(abordablesElements);

//Code Exercice
const nomsDisponibles = pieces.map((piece) => piece.nom);
const prixDisponibles = pieces.map((piece) => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].disponibilite === false) {
    nomsDisponibles.splice(i, 1);
    prixDisponibles.splice(i, 1);
  }
}

// 3. On crée la liste pour les pièces disponibles avant la boucle
const disponiblesElement = document.createElement("ul");

for (let i = 0; i < nomsDisponibles.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
  disponiblesElement.appendChild(nomElement);
}

const pElementDisponible = document.createElement("p");
pElementDisponible.innerText = "Pièces disponibles:";

// Ajout à la zone disponible
const zoneDisponibles = document.querySelector(".disponible");
zoneDisponibles.appendChild(pElementDisponible);
zoneDisponibles.appendChild(disponiblesElement);

// // slider input
// const inputPrixMax = document.querySelector("#prix-max")
// inputPrixMax.addEventListener("input", function () {
//   const piecesFiltrees = pieces.filter(function (piece) {
//     return piece.prix <= inputPrixMax.value;
//   });
//   document.querySelector(".fiches").innerHTML = "";
//   genererPieces(piecesFiltrees);
// });

// slider input
const inputPrixMax = document.querySelector("#prix-max");

inputPrixMax.addEventListener("input", function () {
  //filtre sur piecesAffichees pas sur pieces
  const piecesFiltreesAuPrix = piecesAffichees.filter(function (piece) {
    return piece.prix <= inputPrixMax.value;
  });

  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltreesAuPrix);
});
