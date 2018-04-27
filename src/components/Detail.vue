<template>
	<div v-if="movie" id="detail">
		<movie-item :movie="movie">
			<p class="movie-genre">{{ movie.Genre }}</p>
			<p class="movie-plot">{{ movie.Plot }}</p>
			<table>
				<tr><td>Release date:</td><td>{{ movie.Released }}</td></tr>
				<tr><td>Running time:</td><td>{{ movie.Runtime }}</td></tr>
				<tr><td>Director:</td><td>{{ movie.Director }}</td></tr>
				<tr><td>Cast:</td><td>{{ movie.Actors }}</td></tr>
			</table>
		</movie-item>
		<div class="home">
			<router-link :to="{ name: 'home' }">Back to results</router-link>
		</div>
	</div>
</template>

<script>
	import MovieItem from './MovieItem.vue';

	export default {
		props: [ 'movies' ],

		components: {
			MovieItem
		},

		created() {
			// used for testing id being passed
			// console.log(this.$route.params.id);
		},

		computed: {
			movie() {
				let movie = this.movies.find(movie => movie.id === this.$route.params.id);
				return movie ? movie.movie : null;
			}
		}
	}
</script>