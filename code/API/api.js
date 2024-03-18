

//Definition de l'URL de l'API de IMDB
const apiUrl = 'https://search.imdbot.workers.dev/?q=Spiderman';




//Function pour recuperer les infos de l'API
function fetchData(){

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
        console.log(movies[0]['#TITLE']);
    })
    .catch(error =>{
        console.error('An error as been produced :', error);
    })
}

fetchData();