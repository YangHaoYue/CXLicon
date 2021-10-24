<template>
	<view class="body-color-gray":style="'min-height:'+$u.sys().windowHeight+'px;'">
		<u-gap/>
		<coupons-card :image="data.image">
			<view class="text-bold u-text-center" style="font-size: 40rpx;">{{data.name}}</view>
		</coupons-card>
		
		<view class="bg-white card u-flex u-row-center" style="flex-direction: column;">
			<view class="u-font-28 text-gray u-text-center">{{}}</view>
			<u-image src="" width="600" height="250" class="u-m-t-20"/>
			<u-image src="" width="350" height="350" class="u-m-t-30"/>
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
			<view class="u-flex">
				<image src="/static/mine/notice.png" mode="widthFix"/>
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
					image: "images/1f61aff1dbd139f6cf78a858fdf4f57d.png", //图片
					name: "满200减100", //优惠卷名称
					store: "嘉兴秀洲区xx广场店", //店铺名称
					notice: "时间：仅限在19-22点使用\r\n要求：必须带女盆友来" //使用事项
				}
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
		height: 790rpx;
		border-radius: 20rpx;
		margin: 30rpx 25rpx;
		padding: 60rpx 0 0;
	}
	.detail{
		padding: 30rpx;
		line-height: 2.2;
		image{
			width: 18rpx;
		}
	}
</style>
