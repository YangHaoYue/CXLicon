<template>
	<view>
		<!-- 所有内容的容器 -->
		<view class="u-page">
			<!-- 顶部轮播图 -->
			<u-swiper :list="banners" height="589" @click="changSwipers"></u-swiper>
			<!-- 立即购买 -->
			<view style="margin: -90rpx 30rpx 0 ;" @click="toBuy">
				<u-image :src="http.resourceUrl()+package.image" height="168" width="690" mode="aspectFit" />
			</view>
			<!-- 地址 -->
			<view class="u-flex u-m-l-30 u-m-t-40 u-m-b-40" @click="openMap">
				<u-image src="@/static/home/location.png" height="30" mode="heightFix" />
				<view class="text-gray u-m-l-10 u-font-24">{{address}}</view>
			</view>
			<!-- 九宫格按钮 -->
			<view class="u-flex u-row-around">
				<block v-for="(item,index) in navs" :key="index">
					<view class="u-flex-1 u-flex" style="flex-direction: column;" @click="route(item)">
						<image :src="http.resourceUrl() + item.image" mode="aspectFit" style="height: 71rpx !important;width: 71rpx;"></image>
						<view class="u-m-t-20 u-text-center text-bold u-font-30 text-black">{{item.title}}</view>
					</view>
				</block>
			</view>
			
			<!-- hot -->
			<view class="u-flex u-row-center u-m-t-50">
				<image src="../../static/home/hot.png" mode="heightFix" style="height: 27rpx;"></image>
			</view>
			
			<!--  -->
			<view class="u-m-l-30 u-m-t-20 u-m-r-30">
				<block v-for="(item,i) in activities" :key="i">
					<view class="u-m-b-20 u-m-t-20" @click="route(item)">
						<u-image :src="item.image" width="690" height="376" border-radius="20"  />
					</view>
				</block>
				<!-- <u-swiper :list="activities" height="376" :showIndicator="false" border-radius="20" /> -->
			</view>
			
			<icon-loading v-model="showLoading" :time="500" />
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar  :list="list" :mid-button="true" active-color="#EC1E7B" @change="currentChange($event)"></u-tabbar>
	</view>
</template>

<script>
	import { mapState,mapActions } from "vuex"
	export default {
		onLoad() {
			this.getInfo();
			this.getMineMenu();
		},
		computed: {
			...mapState({
				// list:state => state.tabbars.list
			})
		},
		data() {
			return {
				showLoading:true,
				had_buy:0,//是否买过卡
				banners:[],
				package:'',
				address:'',
				navs:[],
				activities:[],
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
				'getMenu',
				'getUserInfo'
			]),
			async getInfo(){
				let {code,data,msg} = await this.http.get('index/index')
				if(code != 1000) return this.$u.toast(msg)
				this.navs = data.navs;
				this.package = data.package;
				this.address = data.address;
				this.banners = data.banners.map(v=>this.__format(v));
				this.activities = data.activities.map(v=>this.__format(v));
				this.$store.commit('setIconUrl',data.icon_url);
				this.$store.commit('setCooperate_img',data.cooperate_img);
				this.$store.commit('setCooperate_mobile',data.cooperate_mobile);
			},
			async getMineMenu(){
				let {code,data,msg} = await this.http.get('user/getMenu')
				if(code != 1000) return this.$u.toast(msg)
				if(this.http.isLogin()) this.getUser()
				this.getMenu(data)
			},
			async getUser(){
				let {data,code} = await this.http.get('user/info')
				if(code === 1000){
					this.had_buy = data.had_buy
					this.getUserInfo(data)
				}
			},
			__format(data){
				return{
					image:data.image?this.http.resourceUrl()+data.image:'',
					link:data.link,
					target:data.target
				}
			},
			//打开地图
			openMap(){
				const latitude = 30.740144;
				const longitude = 120.796931;	
				wx.openLocation({
					latitude,
					longitude,
					success: function () {
						console.log('success');
					}
				});
			},
			toBuy(){
				// if(this.had_buy === 1) return this.$u.toast('您已购买XXX卡，请至个人中心查看优惠信息')
				this.$u.route('/pages/home/buyCard/buyCard')
			},
			route(item){
				//0的话跳转小程序页面1公众号网页2html
				if(item.target === 0){
					this.$u.route(item.link)
				}else if(item.target === 1){
					this.$u.route(`/pages/home/webView/webView?url=${encodeURIComponent(JSON.stringify(item.link))}`)
				}else{
					this.$u.route(`/pages/home/html/html?nav_id=${item.id}`)
				}
				
			},
			changSwipers(e){
				this.route(this.banners[e])
			}
		}
	}
</script>

<style>

</style>
