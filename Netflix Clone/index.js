const baseUrl = "https://api.themoviedb.org/3";
const baseImgPath = "https://image.tmdb.org/t/p/original";
const apiKey = "56e81bc233109a23c91a7faf4deb6901";

const apiPaths = {
	fetchTrending: `${baseUrl}/trending/all/day?api_key=${apiKey}&language=en-US`,
	fetchAllCategories: `${baseUrl}/genre/movie/list?api_key=${apiKey}`,
	fetchMoviesList: (id) =>
		`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
};

function init() {
	fetchTrendingMovies();
	fetchAllBuildAllSections();
}

function fetchTrendingMovies() {
	fetchAndBuildSection(apiPaths.fetchTrending, "Trending Now!!")
		.then((list) => {
			const randomNumber = parseInt(Math.random() * list.length);
			buildBannerSection(list[randomNumber]);
		})
		.catch((err) => {
			console.error(err);
		});
}
function buildBannerSection(movie) {
	const bannerCont = document.getElementById("banner-section");
	bannerCont.style.backgroundImage = `url('${baseImgPath}${movie.backdrop_path}')`;
	const div = document.createElement("div");
	div.innerHTML = `
		<h1 class="banner-title">${movie.title}</h1>
		<p class="banner-info">Trending in movies | Released on:  ${movie.release_date}</p>
		<p class="banner-overview">${movie.overview}</p>
		<div class="action-button-cont"> 
			<button class="action-button"><i class="fa-solid fa-play"></i>&nbsp; Play</button>
			<button class="action-button"><i class="fa-solid fa-circle-info"></i>&nbsp; More Info</button>
		</div>
	`;
	div.className = "banner-content container";
	bannerCont.append(div);
}

function fetchAllBuildAllSections() {
	fetch(apiPaths.fetchAllCategories)
		.then((res) => res.json())
		.then((res) => {
			const categories = res.genres;
			if (Array.isArray(categories) && categories.length) {
				categories.forEach((category) => {
					fetchAndBuildSection(
						apiPaths.fetchMoviesList(category.id),
						category.name
					);
				});
			}
		})
		.catch((err) => console.error(err));
}
function fetchAndBuildSection(fetchUrl, categoryName) {
	return fetch(fetchUrl)
		.then((res) => res.json())
		.then((res) => {
			const movies = res.results;
			if (Array.isArray(movies) && movies.length) {
				buildMoviesSection(movies, categoryName);
			}
			return movies;
		})
		.catch((err) => console.error(err));
}

function buildMoviesSection(movieList, categoryName) {
	const moviesCont = document.getElementById("movies-cont");
	console.log(movieList);
	moviesListHTML = movieList
		.map((item) => {
			return `
			<img class="movie-item" src="${baseImgPath}${item.backdrop_path}" alt="${item.title}" onclick="searchMovieTrailer('${item.title}')"/>
				`;
		})
		.join("");
	const movieSectionHTML = `
        <h2 class="section-heading">${categoryName}  <span class="explore-nudge"> Explore All</span> </h2>
        <div class="movies-row">
            ${moviesListHTML}
        </div>
    `;

	const div = document.createElement("div");
	div.className = "movies-section";
	div.innerHTML = movieSectionHTML;
	moviesCont.append(div);
}

window.addEventListener("load", function () {
	init();
	window.addEventListener("scroll", function () {
		const header = this.document.getElementById("header");
		if (window.scrollY > 5) header.classList.add("black-bg");
		else header.classList.remove("black-bg");
	});
});
