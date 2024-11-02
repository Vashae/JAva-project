const movieContainer = document.querySelector(".movie");



function renderMovies(filter){
  if (filter === `Year`){
  console.log(filter)
  const fr = movieContainer.sort((a, b) => a.movie.Year - b.movie.Year);
  console.log(fr)
  }
  

}


async function main(id = "") {
  
movieContainer.classList.add("loading");
 
  
  try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=baaa7316&s=${id}`
      );
      const data = await response.json();  
  
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
     
   
     
      movieContainer.innerHTML = data.Search.slice(0, 6)
        .map(
          (movie) => `
                    <div class="movie__picture">
                        <div class="movie__container">
                            <div class="pic"> <h4><img src="${movie.Poster}" alt="${movie.Title} poster"></h4></div>
                            <h4 class="title">${movie.Title}</h4>
                            <p class="yr"><b>Year:</b> ${movie.Year}</p>
                            <p class="identity"><b>imdbID:</b> ${movie.imdbID}</p>
                            <p class="genre"><b>Type:</b> ${movie.Type}</p>
                        </div>
                    </div>
                `
        )
        .join("");
    }
    catch (error) {
      console.error("Error fetching movie data:", error);
      document.querySelector(
        ".movie"
      ).innerHTML = `<p>Error: ${error.message}</p>`;
    }
    finally {
     
      movieContainer.classList.remove("loading");
  }

  }
  
   function onSearchChange(event) {
    const id = event.target.value;
    main(id);
  }
  function filtermovies(event) {
   renderMovies(event.target.value);

  }
  renderMovies()

