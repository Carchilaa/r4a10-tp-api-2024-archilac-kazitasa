// Invocation du mode strict
// (Pour plus infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

// Récupération des éléments du DOM
let btnRechercher = document.getElementById("btn-lancer-recherche");
let searchBar = document.getElementById("searchBar");

btnRechercher.addEventListener("click", () => {
  let recherche = searchBar.textContent;
  console.log(recherche);
  // recherche de l'utilisateur
  if (recherche != null) {
    console.log("DANS LE LISTENER");

    // appel à l'api
    fetchData(recherche);
  }
});
