<template>
	<view class="body-color-gray":style="'min-height:'+$u.sys().windowHeight+'px;'">
		<view class="u-page">
			<view class="u-flex text-white" style="padding: 0 41rpx 30rpx 33rpx;">
				<u-avatar src="" size="136" class="avatar round"/>
				<view class="u-m-l-30 u-flex-1 u-m-t-16" v-show="http.isLogin()">
					<view class="u-flex">
						<view class="u-font-36 text-bold u-m-r-18">王律师</view>
						<u-icon name="setting-fill" size="32" @click="$u.route('/pages/mine/setting/setting')"/>
					</view>
					<view class="u-m-t-6 u-font-28">1627****987</view>
				</view>
				<button class="text-blue text-bold u-font-36 u-m-l-20 u-reset-button">立即登录</button>
			</view>
			
			<!-- 购卡记录 -->
			<u-image class="u-m-t-20 u-m-b-20" src="@/static/mine/records.png" height="168" width="750" mode="aspectFit" />
			<!-- 我的优惠卷 -->
			<view class="card u-flex u-row-between" @click="$u.route('/pages/mine/coupons/coupons')">
				<view class="u-flex">
					<u-image src="@/static/mine/Coupons.png" width="58" height="47" />
					<view class="u-font-28 text-bold text-black u-m-l-20">我的优惠卷</view>
				</view>
				<view class="u-flex">
					<view style="font-size: 60rpx;color: #F1207B;">0<text class="u-font-26 text-black u-m-l-10">张</text></view>
				</view>
			</view>
			
			<u-cell-group>
				<u-cell-item  title="我的订单">
					<u-icon slot="icon" size="32" name="file-text"></u-icon>
				</u-cell-item>
				<u-cell-item icon="phone" title="联系客服" @click="showModal = true"></u-cell-item>
			</u-cell-group>
			
			<u-popup v-model="showModal" mode="center" border-radius="15" width="600" height="600" mask-close-able>
				<view class="u-flex" style="flex-direction: column;height: 100%;">
				</view>
				<view class="u-flex u-row-center" style="position: fixed;bottom: 150rpx;width: 600rpx;" @click="showModal = false">
					<u-icon name="close-circle" size="50" color="#fff"/>
				</view>
			</u-popup>
			
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar  :list="list" :mid-button="true" @change="change"></u-tabbar>
	</view>
</template>

<script>
	import { mapState,mapActions } from "vuex"
	export default {
		computed: {
			...mapState({
				list:state => state.tabbars.list
			})
		},
		data() {
			return {
				//客服弹窗
				showModal:false
			}
		},
		methods: {
			change(index){
				console.log(index);
			}
		}
	}
</script>

<style scoped>
	.card{
		width: 710rpx;
		height: 168rpx;
		border-radius: 20rpx;
		box-shadow: 0px 1px 4px 3px rgba(188, 188, 188, 0.09);
		margin: 20rpx;
		padding: 0 40rpx;
	}
</style>
