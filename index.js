async function main() {
    try {const movies = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=baaa7316&s=fast");
    const data = await movies.json();
    if (data.response === 'false') {
        throw new Error(data.Error);
    }
    const moviecontainer = document.querySelector(`.movie`);
    moviecontainer.innerHTML = data.Search
    .map(
   (movie) => (`<div class="movie__picture">
        <div class="movie__container">
            <h4> <img src="${movie.Poster}" alt="${movie.Title}"> </h4>
            <h4>${movie.Title}ter</b></h4>
            <p><b>Year:</b>${movie.Year}</p>
            <p><b>imdbID:</b>${movie.imdbID}</p>
            <p><b>Type:</b>${movie.Type}</p>
            
        </div>
         </div>`))

         .join("");
   }    catch (error) {
    console.error("Error fetching movie data:", error);
    document.querySelector('.movie').innerHTML = `<p>Error: ${error.message}</p>`;

}}
main();