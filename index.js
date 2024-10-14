async function main() {
    const movies = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=baaa7316&s=fast");
    const moviesData = await movies.json();
    const movie = document.querySelector(`.movie`);
    movie.innerHTML = moviesData
    .map(
   (movie) => (`<div class="movie__picture">
        <div class="movie__container">
            <h4><b>poster</b> <a href="https://website.website"></a></h4>
            <h4>Movie Title</h4>
            <p><b>Year:</b>0000</p>
            <p><b>imdbID:</b>000000000</p>
            <p><b>Type</b>movie</p>
            
        </div>
         </div>`))

         .join("");

}
main();