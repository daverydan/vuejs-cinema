import Vue from 'vue';
import VueResource from 'vue-resource';
import moment from 'moment-timezone';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

Vue.use(VueResource);

moment.tz.setDefault("UTC");
// makes moment available to all components for use
Object.defineProperty(Vue.prototype, '$moment', { get() {
	return this.$root.moment;
}});

import { checkFilter } from './util/bus';
const bus = new Vue();
// makes bus available to all components for use
Object.defineProperty(Vue.prototype, '$bus', { get() {
	return this.$root.bus;
} })

new Vue({
	el: '#app',
	data() {
		return {
			genre: [],
			time: [],
			movies: [],
			moment,
			day: moment(), // current day (i.e. today)
			bus
		};
	},

	components: {
		MovieList,
		MovieFilter
	},

	created() {
		this.$http.get('/api').then(response => {
			this.movies = response.data;
		});

									  // pass through this
		this.$bus.$on('check-filter', checkFilter.bind(this));
	}
});