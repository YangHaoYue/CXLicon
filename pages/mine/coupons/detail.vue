<template>
	<view class="body-color-gray":style="'min-height:'+$u.sys().windowHeight+'px;'">
		<u-gap/>
		<coupons-card :image="data.image">
			<view class="text-bold u-text-center" style="font-size: 40rpx;">{{data.name}}</view>
		</coupons-card>
		
		<view class="bg-white card u-flex u-row-center" style="flex-direction: column;">
			<image :src="data.qrcode" mode="aspectFit" style="height: 350rpx;width: 350rpx;"></image>
			<!-- <u-image :src="" width="350" height="350"/>/ -->
		</view>
		
		<view class="detail">
			<view class="u-flex">
				<image src="/static/mine/store.png" mode="widthFix"/>
				<view class="u-font-26 text-gray u-m-l-10">适用门店：{{data.store}}</view>
			</view>
			<view class="u-flex">
				<image src="/static/mine/lock.png" mode="widthFix"/>
				<view class="u-font-26 text-gray u-m-l-10">有效期：{{data.store}}</view>
			</view>
			<view class="u-flex u-col-top">
				<image src="/static/mine/notice.png" mode="widthFix" class="u-m-t-10"/>
				<view class="u-font-26 text-gray u-m-l-10">
					<view >使用须知：</view>
					<view >{{data.notice}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import couponsCard from '@/components/coupons-card.vue';
	export default {
		components:{
			couponsCard
		},
		onLoad(e) {
			this.coupon_id = e.coupon_id
			this.getCouponDetail()
		},
		data() {
			return {
				coupon_id:'',
				data:{
					image: "", //图片
					name: "", //优惠卷名称
					store: "", //店铺名称
					notice: "" ,//使用事项
					qrcode:''//二维码
				},
			}
		},
		methods: {
			async getCouponDetail(){
				let {code,data} = await this.http.get('coupon/getCouponDetail',{coupon_id:this.coupon_id})
				if(code === 1000){
					this.data = data
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.card{
		width: 700rpx;
		height: 500rpx;
		border-radius: 20rpx;
		margin: 30rpx 25rpx;
	}
	.detail{
		padding: 30rpx;
		line-height: 2.2;
		image{
			width: 30rpx;
			
		}
	}
</style>
