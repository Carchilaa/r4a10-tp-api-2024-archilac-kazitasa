// Invocation du mode strict
// (Pour plus infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

// Récupération des éléments du DOM
const btnRechercher = document.getElementById("btn-lancer-recherche");
const searchBar = document.getElementById("searchBar");
const btnFav = document.getElementById("btn-favoris");
const gifChargement = document.getElementById("bloc-gif-attente");
const lienGit = document.getElementById("lien-git");
const fav_search = document.querySelectorAll('.button_fav');
const btnsPosterFav = document.querySelectorAll("#btn-poster-favoris");



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
  //On recupere la valeur de la recherche
  let recherche = searchBar.value;
  if (recherche != "") {
    if(!verify_dobles(recherche)){
      addToFav(recherche);
    }
    
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
})

/////////////////////
// FAVORIS
/////////////////////

window.onload = function() {
  displayFavsonLoad();
};


/////////////////////
// LIEN GIT
/////////////////////
lienGit.addEventListener("mouseover", () => {
  lienGit.setAttribute("class", "animated-text");
});

lienGit.addEventListener("mouseout", () => {
  lienGit.removeAttribute("class");
});
