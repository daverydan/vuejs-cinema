import Vue from 'vue';
import VueResource from 'vue-resource';
import moment from 'moment-timezone';
import './style.scss';

Vue.use(VueResource);

moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() {
	return this.$root.moment;
}});

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

new Vue({
	el: '#app',
	data() {
		return {
			genre: [],
			time: [],
			movies: [],
			moment,
			day: moment() // current day (i.e. today)
		};
	},
	methods: {
		checkFilter(category, title, checked) {
			if (checked) {
				this[category].push(title);
			} else {
				let index = this[category].indexOf(title);
				if (index > -1) { // if in the category array
					this[category].splice(index, 1);
				}
			}
		}
	},
	components: {
		MovieList,
		MovieFilter
	},
	created() {
		this.$http.get('/api').then(response => {
			this.movies = response.data;
		});
	}
});