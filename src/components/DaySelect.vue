<template>
	<div id="day-select">
		<ul class="days">
			<li :class="{ day: true, active: isActive(day) }" v-for="day in days" @click="selectDay(day)">{{ formatDay(day) }}</li>
			<li class="day-selector">
				<span class="dec" @click="changeDay(-1)"></span>
				<span class="inc" @click="changeDay(1)"></span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: [ 'selected' ],

		data() {
			return {
				// selected: this.$moment(),
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
			},
			isActive(day) {
				return day.isSame(this.selected, 'day');
			},
			selectDay(day) {
				this.$bus.$emit('set-day', day);
			},
			changeDay(change) {
				let newDay = this.$moment(this.selected).add(change, 'days');
				// is there a day that matches our current selected day
				if (this.days.find(day => newDay.isSame(day, 'day'))) {
					this.selectDay(newDay);
				}
			}
		}
	}
</script>