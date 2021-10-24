<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(url) {
			this.url = e.url
		},
		data() {
			return {
				url:''
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
