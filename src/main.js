import Vue from 'vue';
import VueResource from 'vue-resource';
import './style.scss';

Vue.use(VueResource);

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

new Vue({
	el: '#app',
	data() {
		return {
			genre: [],
			time: [],
			movies: []
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