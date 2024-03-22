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
          let result = document.createElement("p");
          result.setAttribute("class", "res");
          result.textContent = movie["#TITLE"];

          divResult.appendChild(result);
        });
      }
    })
    .catch((error) => {
      console.error("An error as been produced :", error);
    });
}
