<template>
	<view class="body-color-gray":style="'min-height:'+$u.sys().windowHeight+'px;'">
		<coupons-card>
			<view class="text-bold u-text-center" style="font-size: 40rpx;">满一百减59</view>
		</coupons-card>
		
		<view class="bg-white card u-flex u-row-center" style="flex-direction: column;">
			<view class="u-font-28 text-gray u-text-center">21 3213  223 324323</view>
			<u-image src="" width="600" height="250" class="u-m-t-20"/>
			<u-image src="" width="350" height="350" class="u-m-t-30"/>
		</view>
		
		<view class="u-flex">
			
		</view>
	</view>
</template>

<script>
	import couponsCard from '@/components/coupons-card.vue';
	export default {
		components:{
			couponsCard
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.card{
		width: 700rpx;
		height: 790rpx;
		border-radius: 20rpx;
		margin: 30rpx 25rpx;
		padding: 60rpx 0 0;
	}
</style>
