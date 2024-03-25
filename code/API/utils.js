const fav_section = document.getElementById("section-favoris");
const fav_list = document.getElementById("liste-favoris");
const fav_film_list = document.getElementById("liste-films-favoris");
const btnsFavoris = document.querySelectorAll("#btn-favoris");

// Ajoute une recherche à la liste des recherches favorites
function addToFav(recherche){
    localStorage.setItem("favs" + localStorage.length, recherche);
    displayFavs();
}

// Ajoute un film à la liste de films favoris
function addFilmToFav(button) {
    // Accéder à l'élément parent contenant les informations du film
    let film = button.value;
    // transforme les infos qui sont sous forme de string en objet javaScript
    film = JSON.parse(film);

    displayFilmFav(film);

    localStorage.setItem("favs-film" + localStorage.length, JSON.stringify(film));
}

function removeFromFavs(key){;
    localStorage.removeItem(key);
}

/////////////////////////////
// RECHERCHES FAVORITES
/////////////////////////////
function displayFavs(){
    let liRechFav = document.createElement("li");

    liRechFav.setAttribute("id" , "fav_list");

    let btnRechFav = document.createElement("button");

    btnRechFav.setAttribute("id" , "btnRech_fav");
    btnRechFav.setAttribute("class", "button_fav");
    btnRechFav.textContent = fav.toUpperCase();
        
    liRechFav.appendChild(btnRechFav);
            
    fav_list.appendChild(liRechFav);
}

/////////////////////////////
// FILMS FAVORIS
/////////////////////////////
function displayFilmFav(movie) {
    let liFilmFav = document.createElement("li");
    liFilmFav.setAttribute("id" , "fav_film_list");

    let btnFilmFav = createPoster(movie);

    liFilmFav.appendChild(btnFilmFav);
    fav_film_list.appendChild(liFilmFav);
}

/////////////////////////////
// AFFICHAGE FAVORIS AU CHARGEMENT
/////////////////////////////
function displayFavsonLoad(){
    for(let i = 0; i < localStorage.length; i ++){
        //On creer les elements de la section de favoris
        let li = document.createElement("li");

        li.setAttribute("id" , "fav_list");

        let btn = document.createElement("button");

        btn.setAttribute("id" , "btn_fav");
        btn.setAttribute("class", "button_fav");

        let span = document.createElement("span");
        span.setAttribute("id", "span_fav");

        let key = localStorage.key(i);
        if(key.startsWith("favs")){
            let  fav  = localStorage.getItem(key);
            if (localStorage.length == 0){
                span.textContent = "Pas des films favorites.";
                li.appendChild(span);
            } else {
                btn.textContent = fav.toUpperCase();

                btn.addEventListener("click", () =>{
                    fetchData(fav);
                });
                li.appendChild(btn);
            }
        }
        fav_list.appendChild(li);
    }
}
