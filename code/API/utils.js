const fav_section = document.getElementById("section-favoris");
const fav_list = document.getElementById("liste-favoris");

function addToFav(movie){
    localStorage.setItem("favs" + localStorage.length, movie);
    displayFavs();
}

function removeFromFavs(key){;
    localStorage.removeItem(key);
}

function displayFavs(){
    //On creer les elements de la section de favoris
    let li = document.createElement("li");

    li.setAttribute("id" , "fav_list");

    let btn = document.createElement("button");

    btn.setAttribute("id" , "btn_fav");
    btn.setAttribute("class", "button_fav");
    btn.textContent = fav.toUpperCase();

    let span = document.createElement("span");
    span.setAttribute("id", "span_fav");

    let fav;
    if(localStorage.length > 0){
        let key = localStorage.length - 1;
        fav  = localStorage.getItem("favs" + key);
    }else{
        fav  = localStorage.getItem("favs" + localStorage.length);
    }
        
    li.appendChild(btn);
            
    fav_list.appendChild(li);
}

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
