<template>
	<div v-if="movie" id="detail">
		<movie-item :movie="movie.movie" :sessions="[]"></movie-item>
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
			console.log(this.$route.params.id);
		},

		computed: {
			movie() {
				let movie = this.movies.find(movie => movie.id === this.$route.params.id);
				return movie ? movie : null;
			}
		}
	}
</script>