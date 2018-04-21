<template>
	<div id="movie-list">
		<movie-item v-for="movie in filteredMovies" 
			 class="movie"
			 :movie="movie"
		>
		</movie-item>
	</div>	
</template>

<script>
	import genres from '../util/genres';
	import MovieItem from './MovieItem.vue';

	export default {
		props: ['movies', 'genre', 'time'],

		components: { MovieItem },

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
					return this.genre.find(genre => movie.genre === genre);
				}
			}
		}
	}
</script>