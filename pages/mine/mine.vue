<template>
	<view class="body-color-gray":style="'min-height:'+$u.sys().windowHeight+'px;'">
		<view class="u-page">
			<u-gap/>
			<view class="u-flex" style="padding: 0 41rpx 30rpx 33rpx;">
				<u-avatar :src="avatarUrl" size="136" class="avatar round"/>
				<view class="u-m-l-30 u-flex-1 u-m-t-16" v-show="islogin">
					<view class="u-flex u-row-between">
						<view class="u-font-36 text-bold u-m-r-18 text-black">{{nick_name}}</view>
						<u-icon name="zhuanfa" size="32" @click="$u.route('/pages/mine/setting/setting')"/>
					</view>
					<view class="u-m-t-6 u-font-28">
						星级：<u-rate :count="5" disabled size="28" v-model="star" gutter="2" active-color="#ED1E79" />
					</view>
				</view>
				<button v-show="!islogin" class="text-black text-bold u-font-36 u-m-l-20 u-reset-button" open-type="getUserInfo" @getuserinfo="getUserInfo" @tap="getUserInfo">立即登录</button>
			</view>
			
			<!-- 购卡记录 -->
			<u-image class="u-m-t-20 u-m-b-20" src="@/static/mine/records.png" height="168" width="750" mode="aspectFit" 
				@click="$u.route('/pages/mine/cardRecord/cardRecord')" />
			<!-- 我的优惠卷 -->
			<view class="card u-flex u-row-between bg-white" @click="$u.route('/pages/mine/coupons/coupons')">
				<view class="u-flex">
					<u-image src="@/static/mine/Coupons.png" width="58" height="47" />
					<view class="u-font-28 text-bold text-black u-m-l-20">我的优惠卷</view>
				</view>
				<view class="u-flex">
					<view style="font-size: 60rpx;color: #F1207B;">{{coupon_count}}<text class="u-font-26 text-black u-m-l-10">张</text></view>
				</view>
			</view>
			
			<u-cell-group>
				<u-cell-item  title="我的订单">
					<u-icon slot="icon" size="32" name="file-text"></u-icon>
				</u-cell-item>
				<u-cell-item icon="phone" title="联系客服" @click="showModal = true"></u-cell-item>
				<block v-for="(item,index) in menus" :key="item.id">
					<u-cell-item  :title="item.title">
						<u-image class="u-m-r-10" slot="icon" :src="item.image&&http.resourceUrl + item.image" width="32" height="32"/>
					</u-cell-item>
				</block>
			</u-cell-group>
			
			<u-popup v-model="showModal" mode="center" border-radius="15" width="600" height="600" mask-close-able>
				<view class="u-flex u-text-center" style="flex-direction: column;height: 100%;">
					<view>客户热线：{{service_tel}}</view>
					<view>客户微信：{{service_wx}}</view>
				</view>
				<view class="u-flex u-row-center" style="position: fixed;bottom: 150rpx;width: 600rpx;" @click="showModal = false">
					<u-icon name="close-circle" size="50" color="#fff"/>
				</view>
			</u-popup>
			
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar  :list="list" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import { mapState,mapActions } from "vuex"
	export default {
		onLoad() {
			if(this.http.isLogin()){
				this.login();
				console.log(this.star);
				console.log(this.coupon_count);
			}
		},
		computed: {
			...mapState({
				list:state => state.tabbars.list,
				
				menus:state => state.mineMenu.menus,
				service_tel:state => state.mineMenu.service_tel,
				service_wx:state => state.mineMenu.service_wx,
				
				coupon_count:state => state.userInfo.userInfo.coupon_count,
				star:state => state.userInfo.userInfo.star,
				avatar:state => state.userInfo.userInfo.avatar,
				name:state => state.userInfo.userInfo.name,
			})
		},
		data() {
			return {
				islogin:false,
				nick_name:'',
				avatarUrl:'',
				value:1,
				//客服弹窗
				showModal:false
			}
		},
		methods: {
			getUserInfo(e){
				if(wx.getUserProfile){
					wx.getUserProfile({
					    desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					    success: (res) => {
							if(res.userInfo){
								console.log(res);
							 	//用户按了允许授权按钮
								this.login(res)
							}
					    }
					})
				}else if(e.type == "getuserinfo"){
					this.http.toast('由于您的版本不支持getUserProfile，暂时获取不到您的头像和昵称。');
					setTimeout(()=>{
						this.login(e.detail);
					},1000)
				}
			},
			login(e){
				uni.login({
					provider:'weixin',
					success: (res) => {
						this.http.post('user/auth',{
							code:res.code,
							avatar:uni.getStorageSync('personImg')||e.userInfo.avatarUrl,
							name:uni.getStorageSync('nickName')||e.userInfo.nickName
						}).then(res=>{
							if(res.code==1000){
								this.islogin = true
								this.http.setUserInfo(res.data,uni.getStorageSync('personImg')||e.userInfo.avatarUrl,uni.getStorageSync('nickName')||e.userInfo.nickName);
								this.nick_name = uni.getStorageSync('nickName')||e.userInfo.nickName;
								this.avatarUrl = uni.getStorageSync('personImg')||e.userInfo.avatarUrl;
							}else{
								this.http.toast(res.msg)
							}
						})
					}
				})
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
