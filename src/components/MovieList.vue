<template>
	<div id="movie-list">
		<div v-if="filteredMovies.length">
			<movie-item v-for="movie in filteredMovies" :movie="movie.movie"></movie-item>
		</div>
		<div v-else-if="movies.length" class="no-results">No Results.</div>
		<div v-else class="no-results">Loading...</div>
	</div>	
</template>

<script>
	import genres from '../util/genres';
	import MovieItem from './MovieItem.vue';

	export default {
		props: ['movies', 'genre', 'time'],

		components: { MovieItem },

		created() {
			// check that moment was made available by the root component
			// and accessible Globally in other components
			console.log(this.$moment);
		},

		computed: {
			filteredMovies() {
				return this.movies.filter(this.moviePassesGenreFilter);
			}
		},
		
		methods: {
			moviePassesGenreFilter(movie) {
				if (!this.genre.length) {
					return true;
				} else {
					let movieGenres = movie.movie.Genre.split(", ");
					let matched = true;
					this.genre.forEach(genre => {
						if (movieGenres.indexOf(genre) === -1) {
							matched = false;
						}
					});
					return matched;
				}
			}
		}
	}
</script>