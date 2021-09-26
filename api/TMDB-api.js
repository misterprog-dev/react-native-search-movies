const API_TOKEN = '8f977537351bace0c0f0f8fb7377379f';

/**
* Permet de récupérer tous les films recherchés.
*
* @param text le nom du film recherché
* @param page le numéro de la page.
* @retuns une liste de films correspondants à la recherche.
**/
export function getFilmsFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log('Error recherche film : ', error));
}

/**
* Permet de récupérer le nom de l'image avec l'api
*
* @param name le nom de l'image.
* @retun une image au format de l'api.
**/
export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name;
}
