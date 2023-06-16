const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
 let form = document.querySelector("form")
 form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let inputEL = form.querySelector("input");
  getMovies(SEARCHAPI+inputEL.value);
inputEL.value=""
})
    async function getMovies(url){
        let response = await  fetch(url);
        let data = await response.json();
     
        showMovies(data.results);
    }
    function showMovies(movies){
        // document.body.appendChild(new Text(JSON.stringify(movies[0])));
        let mainEL=document.querySelector("main");
mainEL.innerHTML="";
if(movies && !movies.length){
    mainEL.innerHTML =      `<h1 class="nomovies">sorry! no movies found</h1>`
}
        movies.sort((a,b)=>{return b.vote_average-a.vote_average}).forEach(movie => {
  let {poster_path,title,adult,release_date,overview,vote_average} = movie;
  if(!poster_path){return;}
  let movieEl = document.createElement("div");
  movieEl.classList.add('movie');
  movieEl.innerHTML=`
                      <img src="${IMGPATH+poster_path}" alt="${title}">
                      <a class="download" target="_blank" href="${IMGPATH+poster_path}" download = "${title}.jpg">D</a>
                      <div class="movie-info">
                        <h2>${title} </h2>
                      <span class="${getColorClass(vote_average)}">${vote_average}</span>
                      <div class="overview" onclick="${toggleOverViewClass(event)}">
                      <h3>overview</h3>
                      ${overview}</div>
                      </div>
                    `;
                    mainEL.append(movieEl);

        });
    }
    function getColorClass(rating){
if(rating>8){
return 'green'
}
else if(rating>6){
    return 'orange'
}else{
    return 'red'
}
    }
    function toggleOverViewClass(e){
        if(!e) return;
        e.target.classList.toggle("overview")
    }
    getMovies(APIURL);