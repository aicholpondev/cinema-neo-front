const API_KEY_TOP = "https://kinopoiskapiunofficial.tech/api/v2.2/films/301";
const API_KEY="b58dffcf-f6c0-4df6-a97d-04b68cd7cd6d"
const API_TOP_POPULAR ="https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1"
const API_PRIMERS ="https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=APRIL";
const API_RELIEZ ="https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=JANUARY&page=1";
const API_SEARCH="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=keyword&page=1";
const API_UP_COMMING ="https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JUNE";

const premiersBtn = document.querySelector("#premiers-btn");


// getMovies(API_TOP_POPULAR)
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
    console.error("Failed to fetch movies:", error);
  }
  
  // return responseDATA 
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

function renderMovies (data) {
    const moviesEl = document.querySelector(".movies");
  
    const arrMovies = data.items || data.films || data.releases;

    document.querySelector(".movies").innerHTML = "";
    
    arrMovies.forEach((movie) =>{
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        const rating = movie.rating || movie.ratingImdb;

        movieEl.innerHTML = `
        <div class="movie_cover_inner">
        <img
        src="${movie.posterUrlPreview}"
        class="movie_cover"
        alt="${movie.nameRu}"
        />
        <div class="movie_cover_back"></div>
        </div>
        <div class="movie_info">
        <div class="movie_title">${movie.nameRu}</div>
        <div class="movie_category">${movie.genres.map((genre) =>`${genre.genre}`)}</div>
        ${ movie.rating &&
            `
          <div class="movie__average movie__average--${getClassByRate(
            movie.rating
          )}">${movie.rating}</div>
          `
          }
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
    const data = getMovies(API_UP_COMMING)
    // renderMovies(data.items)
});

document.getElementById("top-popular-btn").addEventListener("click", () =>{
    const data = getMovies(API_TOP_POPULAR)
});

document.getElementById("relases-btn").addEventListener("click", () =>{
    const data = getMovies(API_RELIEZ)
    // renderMovies(data.releases)
});



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


// let time = new Date();

// const API_KEY = "b58dffcf-f6c0-4df6-a97d-04b68cd7cd6d";
// const API_URL_PREMIERS = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JANUARY`;
// const API_URL_SEARCH ="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
// const API_URL_RELEASES = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=JANUARY`;
// const API_URL_BESTS ="https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
// const API_URL_EXPECTED ="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS";



// //button handlings and listeners
// const form = document.querySelector("form");
// const search = document.querySelector(".header__search");
// const releases = document.getElementById("relases-btn");
// const premiers = document.getElementById("premiers-btn");
// const top_expected = document.getElementById("up-comming-btn");
// const top_best = document.getElementById("top-popular-btn");



// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const SearchUrl = `${API_URL_SEARCH}${search.value}`;
//   console.log(SearchUrl);
//   if (search.value) {
//     getMovies(SearchUrl);
//     search.value = "";
//   } else {
//     alert("Please enter a movie name");
//   }
// });

// releases.addEventListener("click", () => {
//   getMovies(API_URL_RELEASES);
// });

// premiers.addEventListener("click", () => {
//   getMovies(API_URL_PREMIERS);
// });

// top_expected.addEventListener("click", () => {
//   getMovies(API_URL_EXPECTED);
// });

// top_best.addEventListener("click", () => {
//   getMovies(API_URL_BESTS);
// });

// //functions to show movies
// async function getMovies(url){      //fetchhing
//     try {
//         const resp = await fetch(url, {
//           headers: {
//             "Content-Type": "application/json",
//             "X-API-KEY": API_KEY,
//           },
//         });
//         if (!resp.ok) {
//           throw new Error(`HTTP error! status: ${resp.status}`);
//         }
//         const respData = await resp.json();
//         console.log(respData);
//         displayMovies(respData);
//         }catch (error){
//         console.error("Failed to fetch movies:", error);
//     }
// }
// function getColorByRate(vote) {
//     if (vote >= 7) {
//       return "green";
//     } else if (vote > 5) {
//       return "orange";
//     } else {
//       return "red";
//     }
// }
// function displayMovies(data) {
//     console.log(typeof data);
//     const moviesEl = document.querySelector(".movies");
//     // Очищаем предыдущие фильмы
//     const movies = data.items || data.films || data.releases;
//     document.querySelector(".movies").innerHTML = "";

//     movies.forEach((movie) => {
//     const movieEl = document.createElement("div");
//     movieEl.classList.add("movie");
//     const rating = movie.rating || movie.ratingImdb;
//     movieEl.innerHTML = `
//       <div class="movie__cover-inner">
//         <img
//           src="${movie.posterUrlPreview}"
//           class="movie__cover"
//           alt="${movie.nameRu}"
//         />
//         <div class="movie__cover--darkened"></div>
//       </div>
//       <div class="movie__info">
//         <div class="movie__title">${movie.nameRu}</div>
//         <div class="movie__category">${movie.genres.map(
//           (genre) => ` ${genre.genre}`
//         ).join(', ')}</div>
//         ${
//           rating ? 
//           `<div class="movie__average movie__average--${getColorByRate(rating)}">
//             ${rating}
//           </div>` : ''
//         }`;
//     moviesEl.appendChild(movieEl);
//   });
// }



