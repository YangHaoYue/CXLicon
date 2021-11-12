<template>
	<view class="body-color-gray":style="'min-height:'+$u.sys().windowHeight+'px;'">
		<view class="u-page">
			<u-gap/>
			<view class="u-flex" style="padding: 0 41rpx 30rpx 33rpx;">
				<u-avatar :src="avatar" size="136" class="avatar round"/>
				<view class="u-m-l-30 u-flex-1 u-m-t-16" v-show="islogin">
					<view class="u-flex u-row-between">
						<view class="u-font-36 text-bold u-m-r-18 text-black">{{name}}</view>
						<u-icon name="zhuanfa" size="32" @click="$u.route('/pages/mine/setting/setting')"/>
					</view>
					<view class="u-m-t-6 u-font-28">
						星级：<u-rate :count="5" disabled size="28" v-model="star" gutter="2" active-color="#ED1E79" />
					</view>
				</view>
				<button v-show="!islogin" class="cu-btn round line-black text-black text-bold u-font-36 u-m-l-20" open-type="getUserInfo" @getuserinfo="getInfo" @tap="getInfo">立即登录</button>
			</view>
			
			<!-- 购卡记录 -->
			<view class="u-flex u-row-center">
				<u-image src="@/static/mine/records.png" width="730" mode="widthFix"
					@click="$u.route('/pages/mine/cardRecord/cardRecord')" />
			</view>
			<!-- 我的优惠卷 -->
			<view class="card u-flex u-row-between bg-white" @click="$u.route('/pages/mine/coupons/coupons')">
				<view class="u-flex">
					<u-image src="@/static/mine/Coupons.png" width="58" height="47" />
					<view class="u-font-28 text-bold text-black u-m-l-20">我的优惠券</view>
				</view>
				<view class="u-flex">
					<view style="font-size: 60rpx;color: #F1207B;">{{coupon_count}}<text class="u-font-26 text-black u-m-l-10">张</text></view>
				</view>
			</view>
			
			<u-cell-group>
				<u-cell-item  title="扫码核销" @click="scancode" v-show="show_scan">
					<u-icon class="u-m-r-10" slot="icon" size="32" name="scan"></u-icon>
				</u-cell-item>
				<u-cell-item  title="我的订单" @click="$u.route('/pages/mine/cardRecord/cardRecord')">
					<u-icon class="u-m-r-10" slot="icon" size="32" name="file-text"></u-icon>
				</u-cell-item>
				<u-cell-item icon="phone" title="联系客服" @click="showModal = true"></u-cell-item>
				
				<block v-for="(item,index) in menus" :key="item.id">
					<u-cell-item  :title="item.title">
						<u-image class="u-m-r-10" slot="icon" :src="item.image&&http.resourceUrl + item.image" width="32" height="32"/>
					</u-cell-item>
				</block>
			</u-cell-group>
			
			<u-popup v-model="showModal" mode="center" border-radius="15" width="600" height="600" mask-close-able>
				<view class="u-flex u-text-center u-p-t-40" style="flex-direction: column;height: 100%;">
					<u-image src="@/static/server.png" width="175" mode="widthFix" style="margin: 60rpx;"/>
					<view class="u-m-t-20 u-m-b-10 u-font-28">客户热线：{{service_tel}}</view>
					<view class="u-m-t-10 u-m-b-20 u-font-28">客户微信：{{service_wx}}</view>
				</view>
				<view class="u-flex u-row-center" style="position: fixed;bottom: 150rpx;width: 600rpx;" @click="showModal = false">
					<u-icon name="close-circle" size="50" color="#fff"/>
				</view>
			</u-popup>
			
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar  :list="list" :mid-button="true" active-color="#EC1E7B" @change="currentChange($event)"></u-tabbar>
	</view>
</template>

<script>
	import { mapState,mapActions } from "vuex"
	export default {
		onLoad() {
			if(this.http.isLogin()){
				this.islogin = true
				this.login();
			}
		},
		onShow() {
			if(this.http.isLogin()){
				this.getUser()
			}
		},
		computed: {
			...mapState({
				// list:state => state.tabbars.list,
				
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
				//显示核销按钮
				show_scan:false,
				//客服弹窗
				showModal:false,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						isDot: false,
						customIcon: false,
						pagePath: "/pages/home/home"
					},
					{
						iconPath: this.http.resourceUrl()+'static/circle.png',
						selectedIconPath: this.http.resourceUrl()+'static/circle.png',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						isDot: false,
						customIcon: false,
						pagePath: "/pages/mine/mine"
					},
				],
			}
		},
		methods: {
			...mapActions([
				'currentChange',
				'getUserInfo'
			]),
			getInfo(e){
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
							avatar:uni.getStorageSync('personImg')||e.userInfo&&e.userInfo.avatarUrl,
							name:uni.getStorageSync('nickName')||e.userInfo&&e.userInfo.nickName
						}).then(res=>{
							if(res.code==1000){
								this.islogin = true
								this.http.setUserInfo(res.data,uni.getStorageSync('personImg')||e.userInfo.avatarUrl,uni.getStorageSync('nickName')||e.userInfo.nickName);
								this.getUser()
							}else{
								this.http.toast(res.msg)
							}
						})
					}
				})
			},
			async getUser(){
				let {data,code} = await this.http.get('user/info')
				if(code === 1000){
					this.nick_name = data.name;
					this.avatarUrl = data.avatar;
					this.show_scan = data.show_scan;
					this.getUserInfo(data)
				}
			},
			//核销
			scancode(){
				uni.scanCode({
					success:(res)=> {
						console.log(res);
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						let param = JSON.parse(res.result)
						this.$u.route(`/pages/mine/coupons/detail?member_id=${param.member_id}&coupon_id=${param.coupon_id}`)
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
