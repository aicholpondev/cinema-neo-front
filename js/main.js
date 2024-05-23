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
getMovies(API_TOP_POPULAR)
async function getMovies(url){
    const response = await fetch(url,{
        headers:{
            'X-API-KEY':API_PERSONAL,
            'Content-Type':'application/json',
        },
    });
    const responseDATA = await response.json();
    console.log(responseDATA);
}

function PopularMovies (data) {
    const moviesEl = document.querySelector(".movies");

    data.films.forEach((movie) =>{
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie_cover_inner">
        <img
        src="${movie.posterUrlReview}"
        class="movie_cover"
        alt="${movie.nameRu}"
        />
        <div class="movie_cover_back"></div>
        </div>
        <div class="movie_info">
        <div class="movie_title">${movie.nameRu}</div>
        <div class="movie_category">${movie.geners.map((genre) =>`${genre.genre}`)}</div>
        <div class="movie_zero">9</div>
        </div>
        `;
        moviesEl.appendChild(movieEl)
    });
}
const form = document.querySelector("form");
const search = document.querySelector("#search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});
