let divResult = document.getElementById("bloc-resultats");
let resVide = document.getElementById("info-vide");
let resP;

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
      let movies = data.description;
      console.log(movies);

      if (movies.length == 0) {
        // Supprimer les anciens résulats
        resP = Array.from(document.getElementsByClassName("res"));

        resP.forEach((child) => {
          divResult.removeChild(child);
        });

        // Afficher résultat vide
        resVide.removeAttribute("class");
      } else {
        // Enlever résultat vide
        resVide.setAttribute("class", "hide");

        // Supprimer les anciens résulats
        resP = Array.from(document.getElementsByClassName("res"));

        resP.forEach((child) => {
          divResult.removeChild(child);
        });

        // Affichage des résultats
        movies.forEach((movie) => {
          // création d'un élément HTML pour ajouter un lien
          let link = document.createElement("a");
          link.setAttribute("class", "links");
          // lien vers la page IMDB du film
          link.href = movie["#IMDB_URL"]
          link.target = "_blank" // ouverture dans un nouvel onglet

          // création d'un élément HTML pour le poster du film
          let result = document.createElement("img");
          result.setAttribute("class", "res");

          // Vérifier qu'on dispose d'un poster
          if(movie["#IMG_POSTER"]) {
            result.src = movie["#IMG_POSTER"];
          } else {
            result.src = "./assets/img/no-img-found.gif";
          }

          // Ajout des élémens créés dans le HTML (<div id="bloc-resultats">)
          link.appendChild(result);
          divResult.appendChild(link);
        });
      }
    })
    .catch((error) => {
      console.error("An error as been produced :", error);
    });
}
