const API_KEY = "https://kinopoiskapiunofficial.tech/api/v2.2/films/301";
const API_PERSONAL="b58dffcf-f6c0-4df6-a97d-04b68cd7cd6d"
const API_TOP_POPULAR ="https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1"
const API_PRIMERS ="https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JANUARY";
const API_RELIEZ ="https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=JANUARY&page=1";
const API_SEARCH="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=keyword&page=1";
const API_UP_COMMING ="https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JUNE";

const movie = document.querySelector('.movie')
// fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/301', {
//     method: 'GET',
//     headers: {
//         'X-API-KEY': 'b58dffcf-f6c0-4df6-a97d-04b68cd7cd6d',
//         'Content-Type': 'application/json',
//     },
// })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))