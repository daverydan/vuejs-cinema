<template>
	<div id="day-select">
		<ul class="days">
			<li class="day" v-for="day in days">{{ formatDay(day) }}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// return 7 objs & start w/ today & add extra day for each one
				days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, 'days'))
			};
		},

		methods: {
			formatDay(raw) {
				// if the raw value is the same as today
				if (raw.isSame(this.$moment(), 'day')) {
					return 'Today';
				} else {
							// DayName Date/Month
					return raw.format('ddd DD/MM');
				}
			}
		}
	}
</script>