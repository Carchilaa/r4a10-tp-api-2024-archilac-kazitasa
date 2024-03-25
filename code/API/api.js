let divResult = document.getElementById("bloc-resultats");
let resVide = document.getElementById("info-vide");
let resP;
let movies; // stocke le résultat de la requête API

// Function pour recuperer les infos de l'API
function fetchData(recherche) {
  // Definition de l'URL de l'API de IMDB
  let apiUrl = "https://search.imdbot.workers.dev/?q=" + recherche;
  console.log(apiUrl);

  //requete GET vers l'URL de l'API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Data recovery error");
      }

      //On recuperer l'info est on la met en forma JSON
      return response.json();
    })
    .then((data) => {
      // Retirer le logo de chargement
      gifChargement.style.display = "none";

      // récupération du résultat de la recherche (liste de 8 films MAX)
      movies = data.description;
      console.log(movies);

      if (movies.length == 0) {
        // Supprimer les anciens résulats
        resP = Array.from(document.getElementsByClassName("res"));
        resP.forEach(child => {
          divResult.removeChild(child);
        });

        // Afficher résultat vide
        resVide.removeAttribute("class");
      } else {
        // Enlever résultat vide
        resVide.setAttribute("class", "hide");

        // Supprimer les anciens résulats
        resP = Array.from(document.getElementsByClassName("res"));
        resP.forEach(child => {
          divResult.removeChild(child);
        });
        
        let idPoster = 1;
        // Affichage des résultats
        movies.forEach((movie) => {
          // création des éléments nécessaires pour faire un poster cliquable
          let link = createPoster(movie);

          // Ajout des élémens créés dans le HTML (<div id="bloc-resultats">)
          divResult.appendChild(link);

          /**
           * Le code HTML généré sera sous cette forme :
           * 
           * <a class="links res" href="https://imdb.com/title/tt0409591" target="_blank">
            <figure>
              <img class="icon_lien" src="./assets/img/link-external-regular-24.png">
              <img class="poster" src="https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg">
              <span class="badge">
                Naruto
                <button
                  id="btn-favoris"
                  type="button"
                  title="Ajouter la recherche aux favoris"
                  class="btn_clicable"
                >
                  <!-- Icone étoile vide
                    (qui indique que la recherche ne fait pas partie des favoris) -->
                  <img src="assets/img//etoile-vide.svg" alt="Etoile vide" width="22" />

                  <!-- Icone étoile pleine
                      (qui indique que la recherche fait partie des favoris) -->
                  <!-- <img src="images/etoile-pleine.svg" alt="Etoile pleine" width="22" > -->

                  <!-- (Les 2 icones d'étoile provenant de flaticon.com) -->
                </button>
              </span>
            </figure>
          </a>
           */
          idPoster++;
        });
      }
    })
    .catch((error) => {
      console.error("An error as been produced :", error);
    });
}

function createPoster(movie) {
  // création d'un élément HTML <figure> pour contenir les liens
  let figure = document.createElement("figure");

  // création d'un élément HTML <span> pour faire office de badge
  let span = document.createElement("span");
  span.setAttribute("class", "badge");
  span.textContent = movie["#TITLE"];

  // création d'un élément HTML pour ajouter un lien
  let link = document.createElement("a");
  link.setAttribute("class", "links res");
  // lien vers la page IMDB du film
  link.href = movie["#IMDB_URL"]
  link.target = "_blank" // ouverture dans un nouvel onglet

  // création d'une image pour le lien
  let icon_link = document.createElement("img");
  icon_link.setAttribute("class", "icon_lien");
  icon_link.src = "./assets/img/link-external-regular-24.png";

  // création d'un élément HTML pour le poster du film
  let result = document.createElement("img");
  result.setAttribute("class", "poster");

  // création d'un élément HTML <button> pour l'ajout de favoris
  let btnFavoris = document.createElement("button");
  btnFavoris.setAttribute("class", "btn_clicable");
  btnFavoris.setAttribute("id", "btn-poster-favoris");
  const movieInfos = JSON.stringify(movie);
  btnFavoris.setAttribute("value", movieInfos);
  btnFavoris.type = "button";
  btnFavoris.title = "Ajouter la recherche aux favoris";
  // Ajout de l'écouteur d'événement sur le bouton "Ajouter aux favoris"
  btnFavoris.addEventListener("click", (event) => {
    event.stopPropagation(); // Arrêter la propagation de l'événement
    addFilmToFav(event.target); // Appel de la fonction pour ajouter le film aux favoris
});

  // création d'un élément HTML <img> (une petite étoile)
  let etoile = document.createElement("img");
  etoile.src = "assets/img/etoile-vide.svg";
  etoile.alt = "Etoile vide";
  etoile.width = "15";

  // Vérifier qu'on dispose d'un poster
  if(movie["#IMG_POSTER"]) {
    result.src = movie["#IMG_POSTER"];
  } else {
    result.src = "./assets/img/no-img-found.gif";
  }

  btnFavoris.appendChild(etoile);
  span.appendChild(btnFavoris);

  figure.appendChild(icon_link);
  figure.appendChild(result);
  figure.appendChild(span);

  link.appendChild(figure);

  return link;
}