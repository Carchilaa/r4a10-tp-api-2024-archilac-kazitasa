// Invocation du mode strict
// (Pour plus infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

let numFav = 0;
// Récupération des éléments du DOM
let btnRechercher = document.getElementById("btn-lancer-recherche");
let searchBar = document.getElementById("searchBar");
let btnFav = document.getElementById("btn-favoris");

btnRechercher.addEventListener("click", () => {
  let recherche = searchBar.value;

  // recherche de l'utilisateur
  if (recherche != "") {
    console.log("DANS LE LISTENER");

    // Appel à l'API
    fetchData(recherche);
  }
});

btnFav.addEventListener("click", ()=>{
  let recherche = searchBar.value;
  let objectID = fetchData(recherche);
  let key= "fav" + numFav.toString(); 
  let value = [objectID["#IMDB_ID"],objectID["#TITLE"]];
  localStorage.setItem(key, value);

    numFav++;
})
