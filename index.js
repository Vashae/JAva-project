const movieContainer = document.querySelector(".movie");



function renderMovies(filter){
 if (!filter) return; 
 const movies = [...document.querySelectorAll('.movie__container')];
    let sortedMovies; 
    switch (filter) {
      case `Year Ascending`:
        sortedMovies = movies.sort((a, b) => {const yearA =
          parseInt(a.querySelector(`.yr`).textContent.split(`:`)[1]); 
          const yearB = parseInt(b.querySelector(`.yr`).textContent.split(`:`)[1]);
          return yearA - yearB;
         });
         break;
         case `Year Descending`:
          sortedMovies = 
          movies.sort((a, b) => {const num1 = parseInt(a.querySelector(`.yr`).textContent.split(`:`)[1]);
            const num2 = parseInt(b.querySelector(`.yr`).textContent.split(`:`)[1]);
            return num2 - num1;
          } );
          break;
          case `Title`:
            sortedMovies = 
            movies.sort((a, b) => {const titleA = a.querySelector(`.title`).textContent.toLowerCase();
              const titleB = b.querySelector(`.title`).textContent.toLowerCase();
              return titleA.localeCompare(titleB);
            });
            break;

            default: 
            return;
            }
            const tempContainer = document.createElement(`div`);
            tempContainer.className = `movie`;

            sortedMovies.forEach(movie => {const pictureWrapper =
              document.createElement(`div`);
              pictureWrapper.className = `movie__picture`;
              pictureWrapper.appendChild(movie.cloneNode(true));
              tempContainer.appendChild(pictureWrapper);
            }); 
            movieContainer.innerHTML =
            tempContainer.innerHTML;
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

