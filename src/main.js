import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import moment from 'moment-timezone';
import './style.scss';

import Overview from './components/Overview.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

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

import routes from './util/routes';
const router = new VueRouter({ routes });

new Vue({
	el: '#app',

	router,
	
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
		Overview
	},

	created() {
		this.$http.get('/api').then(response => {
			this.movies = response.data;
		});

									  // pass through this
		this.$bus.$on('check-filter', checkFilter.bind(this));
	}
});