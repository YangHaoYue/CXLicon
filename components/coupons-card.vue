<template>
	<view>
		<view class="base-coupons u-flex " :class="currentIndex===2?'bg-gray':''" 
		@click="currentIndex === 0?$u.route(`/pages/mine/coupons/detail?coupon_id=${coupon_id}`):''">
			<view class="u-flex u-row-center" style="width: 200rpx;">
				<image :src="http.resourceUrl()+image" mode="aspectFit" style="width: 180rpx;height: 180rpx;"></image>
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
		props:['image','index','currentIndex','coupon_id'],
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	.base-coupons {
		width: 700rpx;
		height: 200rpx;
		position: relative;
		background: radial-gradient(circle at right top, transparent 10rpx,  #fff 0) top left / 200rpx 51% no-repeat,
		  radial-gradient(circle at right bottom, transparent 10rpx,  #fff 0) bottom left /200rpx 51% no-repeat,
		  radial-gradient(circle at left top, transparent 10rpx, #fff 0) top right /500rpx 51% no-repeat,
		  radial-gradient(circle at left bottom, transparent 10rpx, #fff 0) bottom right /500rpx 51% no-repeat;
		// filter: drop-shadow(3rpx 3rpx 3rpx rgba(0,0,0,.3));
		border-radius: 20rpx;
		margin: 20rpx 25rpx;
	  }
	  .base-coupons::before {
	  content: '';
	  height: 130rpx;
	  border-right: 1rpx dashed #8C898C;
	  transform: translateY(0.5);
	  position: absolute;
	  left: 196rpx;
	  top: 0;
	  bottom: 0;
	  margin: auto;
	}
	.bg-gray{
		background: radial-gradient(circle at right top, transparent 10rpx,  #C3C0C1 0) top left / 200rpx 51% no-repeat,
		  radial-gradient(circle at right bottom, transparent 10rpx,  #C3C0C1 0) bottom left /200rpx 51% no-repeat,
		  radial-gradient(circle at left top, transparent 10rpx, #C3C0C1 0) top right /500rpx 51% no-repeat,
		  radial-gradient(circle at left bottom, transparent 10rpx, #C3C0C1 0) bottom right /500rpx 51% no-repeat;
		z-index: 9999;
		image{
			-webkit-filter: grayscale(1);/* Webkit */
			filter:gray;/* IE6-9 */
			filter: grayscale(1);/* W3C */
		}
	}
</style>
