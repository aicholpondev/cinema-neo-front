
const API_KEY="b58dffcf-f6c0-4df6-a97d-04b68cd7cd6d";
const API_TOP_POPULAR ="https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const API_PRIMERS ="https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=APRIL";
const API_RELIEZ ="https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=JANUARY&page=1";
const API_SEARCH="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=keyword&page=1";
const API_UP_COMMING ="https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JUNE";
const LIKE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/{id}"






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
    console.log("error:", error);
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

async function fetchFavorites() {
  let favoriteIds = JSON.parse(localStorage.getItem("likedMovies")) || [];
 


  
  for (let id of favoriteIds) {
      try {
          let response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
              headers: {
                  'X-API-KEY': API_KEY,
                  'Content-Type': 'application/json'
              }
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          let movie = await response.json();
          // showMovie(movie);
      
      } catch (error) {
          console.log('Error fetching movie:', error);
      }
  }
}
  


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
        <div class="movie_cover"
        alt="${movie.nameRu}"div/>
        <div class="movie__rating ${getClassByRate(rating)}">${rating}</div>
        <div class="movie_cover_dark"></div>
        </div>
        <div class="movie_info">
        <div class="movie_title">${movie.nameRu}</div>
        <button class="like-btn" data-movie-id="${movie.kinopoiskId}" onclick="toggleMovieLike(this)">
        <i class="fa-regular fa-heart"></i>
    </button>
        
         
      
          }
          </div>
          <div class="movie_category">${movie.genres.map((genre) =>`${genre.genre}`)}</div> 
  
          `;
        moviesEl.appendChild(movieEl)
    });
}

function toggleMovieLike(currLikeBtn) {
  const movieId = currLikeBtn.getAttribute('data-movie-id');
  let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];

  if (likedMovies.includes(movieId)) {
      likedMovies = likedMovies.filter(id => id !== movieId);
      currLikeBtn.querySelector('i').style.color = "#FFFFFF";
  } else {
      likedMovies.unshift(movieId);
      currLikeBtn.querySelector('i').style.color = "#FF0000";
  }

  localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
}

function updateLikedMovies() {
  const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
  const likeButtons = document.querySelectorAll('.like-btn');

  likeButtons.forEach(button => {
      const movieId = button.getAttribute('data-movie-id');
      if (likedMovies.includes(movieId)) {
          button.querySelector('i').style.color = "#FF0000";
      }
  });
}

const favoriteBtn = document.querySelector("#favorites-btn");
favoriteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // const favoriteMovies = fetchFavorites();
  getMovies(fetchFavorites, true);
});

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



const form = document.querySelectorAll("form");
const search = document.querySelector("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const SearchUrl = `${API_SEARCH}${search.value}`;
  console.log(SearchUrl);
  if (search.value) {
    getMovies(SearchUrl);
    search.value = "";
  } else {
    alert("Please enter a movie name");
  }
});







