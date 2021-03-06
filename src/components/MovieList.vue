<template>
	<div id="movie-list">
		<div v-if="filteredMovies.length">
			<movie-item v-for="movie in filteredMovies" :movie="movie.movie">
				<div class="movie-sessions">
					<div 
						v-for="session in filteredSessions(movie.sessions)" 
						class="session-time-wrapper tooltip-wrapper"
						v-tooltip="{ seats: session.seats }"
						:key="session.id"
					>
						<div class="session-time">{{ formatSessionTime(session.time) }}</div>
					</div>
				</div>
			</movie-item>
		</div>
		<div v-else-if="movies.length" class="no-results">{{ noResults }}</div>
		<div v-else class="no-results">Loading...</div>
	</div>	
</template>

<script>
	import genres from '../util/genres';
	import times from '../util/times';
	import MovieItem from './MovieItem.vue';

	export default {
		props: ['movies', 'genre', 'time', 'day'],

		components: { MovieItem },

		created() {
			// check that moment was made available by the root component
			// and accessible Globally in other components
			// console.log(this.$moment);
		},

		computed: {
			filteredMovies() {
				return this.movies
					.filter(this.moviePassesGenreFilter)
					.filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
			},

			noResults() {
				let times = this.time.join(', ');
				let genres = this.genre.join(', ');
				return `No Results for ${times}${times.length && genres.length ? ',' : ''} ${genres}.`;
			}
		},
		
		methods: {
			formatSessionTime(raw) {
				return this.$moment(raw).format('h:mm A');
			},

			// filter sessions that are the same as today
			filteredSessions(sessions) {
				return sessions.filter(this.sessionPassesTimeFilter);
			},
			
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
			},

			sessionPassesTimeFilter(session) {
				// if session.time is not the same as the current day
				if (!this.day.isSame(this.$moment(session.time), 'day')) {
					return false;
				} else if (this.time.length === 0 || this.time.length === 2) {
					return true;
				} else if (this.time[0] === times.AFTER_6PM) {
					return this.$moment(session.time).hour() >= 18;
				} else {
					return this.$moment(session.time).hour() < 18;
				}
			}
		}
	}
</script>