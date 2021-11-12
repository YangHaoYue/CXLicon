<template>
	<view>
		<web-view :src="url" style="width: 100vw;"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			if(!e.url){
				this.url = this.$store.state.tabbars.iconUrl
			}else{
				this.url = JSON.parse(decodeURIComponent(e.url))
			}
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
