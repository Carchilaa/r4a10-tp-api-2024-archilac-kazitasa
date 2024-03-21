// Function pour recuperer les infos de l'API
function fetchData(recherche){
    console.log(recherche);
    // Definition de l'URL de l'API de IMDB
    let apiUrl = 'https://search.imdbot.workers.dev/?q=' . recherche ;
    console.log(apiUrl);

    //requete GET vers l'URL de l'API
    fetch(apiUrl)
    .then(response =>{
        if(!response.ok){
            throw new Error('Data recovery error');
        }

        //On recuperer l'info est on la met en forma JSON
        return response.json();
    }) .then(data => {

        let movies = data.description;
        console.log(movies);
    })
    .catch(error =>{
        console.error('An error as been produced :', error);
    })
}
