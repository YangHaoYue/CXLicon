<template>
	<view>
		<!-- 所有内容的容器 -->
		<view class="u-page">
			<!-- 顶部轮播图 -->
			<u-swiper :list="imgList" height="589"></u-swiper>
			<!-- 立即购买 -->
			<view style="margin: -90rpx 30rpx 0 ;">
				<u-image src="@/static/home/buy.png" height="168" width="690" mode="aspectFit" />
			</view>
			<!-- 地址 -->
			<view class="u-flex u-m-l-30 u-m-t-40 u-m-b-40">
				<u-image src="@/static/home/location.png" height="30" mode="heightFix" />
				<view class="text-gray u-m-l-10 u-font-24">{{address}}</view>
			</view>
			<!-- 九宫格按钮 -->
			<view class="u-flex u-row-around">
				<block v-for="(item,index) in navs" :key="itam.id">
					<view class="u-flex-1 u-flex" style="flex-direction: column;" @click="$u.route(item.link)">
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
				<u-swiper :list="activities" height="376" :showIndicator="false" border-radius="20" />
			</view>
			
			<icon-loading v-model="showLoading" />
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar  :list="list" :mid-button="true" @change="currentChange"></u-tabbar>
	</view>
</template>

<script>
	import { mapState,mapActions } from "vuex"
	export default {
		onLoad() {
			this.getInfo();
		},
		computed: {
			...mapState({
				list:state => state.tabbars.list
			})
		},
		data() {
			return {
				showLoading:true,
				imgList:[],
				address:'',
				navs:[
					{name:'项目介绍',img:'../../static/home/introduce.png',url:''},
					{name:'合作洽谈',img:'../../static/home/teamwork.png',url:''},
					{name:'问卷调查',img:'../../static/home/questionnaire.png',url:''},
					{name:'最新活动',img:'../../static/home/activity.png',url:''}
				],
				activities:[]
			}
		},
		methods: {
			...mapActions([
				'currentChange'
			]),
			async getInfo(){
				let {code,data} = await this.http.get('index/index')
				this.navs = data.navs;
				this.address = data.address;
				this.imgList = data.banners.map(v=>this.__format(v));
				this.activities = data.activities.map(v=>this.__format(v));
				this.$store.commit('setIconUrl',data.icon_url);
				setTimeout(()=>{
					this.showLoading = false
				},500)
			},
			__format(data){
				return{
					image:data.image?this.http.resourceUrl()+data.image:'',
					link:data.link,
					target:data.target
				}
			}
		}
	}
</script>

<style>

</style>
