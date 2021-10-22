<template>
	<view>
		<view class="loading_background u-flex u-row-center" style="flex-direction: column;" v-if="value">
			<u-image src="@/static/loading/loading.gif" width="200" mode="widthFix"></u-image>
			<view class="u-text-center loading_text">loading...</view>
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
	.loading_text{
		line-height:60rpx; text-align:center; font-size:22rpx; margin-top:28rpx;
		color: #F1207B;
	}
</style>
