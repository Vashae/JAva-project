const was = data.slice(0,6);

async function main(id){
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=baaa7316&s=${id}`);
        const data = await response.json();
       
    
        if (data.Response === "False") {
            throw new Error(data.Error);
        }
       

        const movieContainer = document.querySelector('.movie');
        movieContainer.innerHTML = data.Search
            .map((movie) => `
                <div class="movie__picture">
                    <div class="movie__container">
                        <h4></b> <img src="${movie.Poster}" alt="${movie.Title} poster"></h4>
                        <h4>${movie.Title}</h4>
                        <p><b>Year:</b> ${movie.Year}</p>
                        <p><b>imdbID:</b> ${movie.imdbID}</p>
                        <p><b>Type:</b> ${movie.Type}</p>
                    </div>
                </div>
            `)
            .join("");
        } catch (error) {
            console.error("Error fetching movie data:", error);
            document.querySelector('.movie').innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }
    
    async function onSearchChange(event){
        const id = event.target.value;
        main(id)
    }
    
    

main();



