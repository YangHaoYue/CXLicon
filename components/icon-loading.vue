<template>
	<view>
		<view class="loading_background" v-if="value">
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"icon-loading",
		props:{
			value:{
				type:Boolean,
				default:false
			}
		},
		watch: {
			value(newVal) {
				this.show = newVal
			}
		},
		data() {
			return {
				show:false
			};
		},
		methods: {
			input() {
				let value = this.show
				this.$emit('input',value)
			}
		},
	}
</script>

<style scoped lang="scss">
	.loading_background{
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: #FFFFFF;
		
	}
</style>
