
const API_KEY="b58dffcf-f6c0-4df6-a97d-04b68cd7cd6d";
const API_TOP_POPULAR ="https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const API_PRIMERS ="https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=APRIL";
const API_RELIEZ ="https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=JANUARY&page=1";
const API_SEARCH="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=keyword&page=1";
const API_UP_COMMING ="https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JUNE";



async function getMovies(url){
  try{
    const response = await fetch(url,{
      headers:{
          'X-API-KEY':API_KEY,
          'Content-Type':'application/json',
      },
  });
  const responseData = await response.json();
  console.log(responseData);
  renderMovies(responseData)
  }catch(error){
    console.error("error:", error);
  }
   
}



function getClassByRate(vote) {
    if (vote >= 7) {
      return "green";
    } else if (vote > 5) {
      return "orange";
    } else {
      return "red";
    }
  }
  getClassByRate()

    function renderMovies (data) {
    const moviesEl = document.querySelector(".movies");
  
    const arrMovies = data.items || data.films || data.releases;

    document.querySelector(".movies").innerHTML = "";
    
    arrMovies.forEach((movie) =>{
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        const rating = movie.rating || movie.ratingImdb;

        movieEl.innerHTML = `
        <div class="movie_cover-inner">
        <img
        src="${movie.posterUrlPreview}"
        class="movie_cover"
        alt="${movie.nameRu}"
        />
        <div class="movie_cover_dark"></div>
        </div>
        <div class="movie_info">
        <div class="movie_title">${movie.nameRu}</div>
        <div class="movie_category">${movie.genres.map((genre) =>`${genre.genre}`)}</div>
        ${ movie.rating && `<div class="movie__average movie__average--${getClassByRate(
            movie.rating
          )}">${movie.rating}</div> `
          }
          <div><ion-icon name="heart-outline"></ion-icon></div>
        </div>
          `;
        moviesEl.appendChild(movieEl)
    });
}

 
document.getElementById("premiers-btn").addEventListener("click",  () =>{
     getMovies(API_PRIMERS);
    // renderMovies(data);
});

document.getElementById("up-comming-btn").addEventListener("click",() =>{
     getMovies(API_UP_COMMING)
   
});

document.getElementById("top-popular-btn").addEventListener("click", () =>{
     getMovies(API_TOP_POPULAR)
});

document.getElementById("relases-btn").addEventListener("click", () =>{
     getMovies(API_RELIEZ)
    
});

document.getElementById("favorites-btn").addEventListener("click", () =>{
JSON.parse(localStorage.getItem("favorites"))
renderMovies(data)
})



const form = document.querySelector("form");
const search = document.querySelector("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});






