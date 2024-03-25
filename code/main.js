// Invocation du mode strict
// (Pour plus infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

let numFav = 0;
// Récupération des éléments du DOM
const btnRechercher = document.getElementById("btn-lancer-recherche");
const searchBar = document.getElementById("searchBar");
const btnFav = document.getElementById("btn-favoris");
const gifChargement = document.getElementById("bloc-gif-attente");
const lienGit = document.getElementById("lien-git");

/////////////////////
// BOUTON RECHERCHER
/////////////////////
btnRechercher.addEventListener("click", () => {
  let recherche = searchBar.value;

  // recherche de l'utilisateur
  if (recherche != "") {
    // Appel à l'API
    fetchData(recherche);

    // Affichage du logo de chargement (le logo est retiré lors de la réception de la réponse de la API)
    gifChargement.style.display = "block";
  }
});

/////////////////////
// BOUTON FAVORIS
/////////////////////
btnFav.addEventListener("click", ()=>{
  let recherche = searchBar.value;
  if (recherche != "") {
    let objectID = fetchData(recherche);
    let key= "fav" + numFav.toString(); 
    let value = [objectID["#IMDB_ID"],objectID["#TITLE"]];
    localStorage.setItem(key, value);
  
      numFav++;
  }
});

///////////////////////////
// BARRE DE RECHERCHE
///////////////////////////
searchBar.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    let recherche = searchBar.value;

    // recherche de l'utilisateur
    if (recherche != "") {
      // Appel à l'API
      fetchData(recherche);

      // Affichage du logo de chargement (le logo est retiré lors de la réception de la réponse de la API)
      gifChargement.style.display = "block";
    }
    // retirer le focus de la searchBar
    let focus = document.querySelector( ':focus' );
    if( focus ) focus.blur();
  }
});

/////////////////////
// LIEN GIT
/////////////////////
lienGit.addEventListener("mouseover", () => {
  lienGit.setAttribute("class", "animated-text");
});

lienGit.addEventListener("mouseout", () => {
  lienGit.removeAttribute("class");
});