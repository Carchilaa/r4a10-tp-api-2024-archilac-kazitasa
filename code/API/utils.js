const fav_section = document.getElementById("section-favoris");
const fav_list = document.getElementById("liste-favoris");

function addToFav(movie){
    localStorage.setItem("favs" + localStorage.length, movie);
    displayFavs();
}

function removeFromFavs(key){;
    localStorage.removeItem(key);
}

function verify_dobles(movie){

    let key;
    let fav;
    let exits = false;
    if(localStorage.length > 0){
        key = "favs" + (localStorage.length - 1);
        fav  = localStorage.getItem(key); 
        if(fav == movie){
            exits = true;
        }
    }

    return exits;
}

function displayFavs(){
    //On creer les elements de la section de favoris
    let li = document.createElement("li");

    li.setAttribute("id" , "fav_list");

    let div = document.createElement("div");
    div.setAttribute("id" , "div_favs");

    let btn = document.createElement("button");

    btn.setAttribute("id" , "btn_fav");
    btn.setAttribute("class", "button_fav");
    //btn.textContent = fav.toUpperCase();

    let btn_supp = document.createElement("button");
    btn_supp.setAttribute("id" , "btn_supp");
    btn.setAttribute("class", "button_fav");

    let span = document.createElement("span");
    span.setAttribute("id", "span_fav");

    let fav;
    let key;
    if(localStorage.length > 0){
        key = "favs" + (localStorage.length - 1);
        fav  = localStorage.getItem(key);
        btn.textContent = fav.toUpperCase();
        btn_supp.textContent = " X ";
    }else{
        key = "favs" + localStorage.length;
        fav  = localStorage.getItem(key);
        btn.textContent = fav.toUpperCase();
        btn_supp.textContent = " X ";
    }

    btn.addEventListener("click", () =>{
        fetchData(fav);
    });
        
    li.appendChild(btn);
    div.appendChild(li);
    div.appendChild(btn_supp);
            
    fav_list.appendChild(div);

    btn_supp.addEventListener("click", () => {
        fav_list.removeChild(div); 
        removeFromFavs(key);           
            })
}

function displayFavsonLoad(){
    for(let i = 0; i < localStorage.length; i ++){
        //On creer les elements de la section de favoris

        let div = document.createElement("div");
        div.setAttribute("id" , "div_favs");
        let li = document.createElement("li");
        li.setAttribute("id" , "fav_list");

        let btn = document.createElement("button");
        btn.setAttribute("id" , "btn_fav");
        
        let btn_supp = document.createElement("button");
        btn_supp.setAttribute("id" , "btn_supp");
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
                
                btn_supp.textContent = " X ";
                btn.textContent = fav.toUpperCase();
                //btn.appendChild(btn_supp);
                btn.addEventListener("click", () =>{
                    fetchData(fav);
                });
                li.appendChild(btn);
                div.appendChild(li);
                div.appendChild(btn_supp);

                
                
            }
        }
        fav_list.appendChild(div);
        
        btn_supp.addEventListener("click", () => {
            fav_list.removeChild(div);
            removeFromFavs(key);             
                })
    }
}
