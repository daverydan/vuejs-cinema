<template>
	<div :class="{ 'check-filter': true, active: checked }" 
		 @click="checkFilter"
	>
		<span class="checkbox"></span>
		<span class="check-filter-title">{{ title }}</span>
	</div>	
</template>

<script>
	export default {
		props: ['title', 'category'],
		
		data() {
			return {
				checked: false
			};
		},
		
		methods: {
			checkFilter() {
				this.checked = !this.checked;
				this.$bus.$emit('check-filter', this.category, this.title, this.checked);
			}
		}
	}
</script>