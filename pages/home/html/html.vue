<template>
	<view>
		<view v-html="value"></view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.nav_id = e.nav_id
		},
		data() {
			return {
				nav_id:'',
				value:''
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
