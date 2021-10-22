<template>
	<view>
		<view class="base-coupons u-flex" @click="$u.route('/pages/mine/coupons/detail')">
			<view class="u-flex u-row-center" style="width: 200rpx;">
				<u-image src="" width="180" height="180"></u-image>
			</view>
			<view  style="width: 500rpx;padding: 0 20rpx;">
				<slot/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"coupons-card",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.base-coupons {
		width: 700rpx;
		height: 200rpx;
		position: relative;
		background: radial-gradient(circle at right top, transparent 10rpx,  #fff 0) top left / 200rpx 51% no-repeat,
		  radial-gradient(circle at right bottom, transparent 10rpx,  #fff 0) bottom left /200rpx 51% no-repeat,
		  radial-gradient(circle at left top, transparent 10rpx, #fff 0) top right /500rpx 51% no-repeat,
		  radial-gradient(circle at left bottom, transparent 10rpx, #fff 0) bottom right /500rpx 51% no-repeat;
		filter: drop-shadow(3rpx 3rpx 3rpx rgba(0,0,0,.3));
		border-radius: 20rpx;
		margin: 20rpx 25rpx;
	  }
	  .base-coupons::before {
	  content: '';
	  height: 130rpx;
	  border: 1rpx dashed #EEEEEE;
	  position: absolute;
	  left: 198rpx;
	  top: 0;
	  bottom: 0;
	  margin: auto;
	}
</style>
