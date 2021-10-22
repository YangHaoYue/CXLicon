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
				<view class="text-gray u-m-l-10 u-font-24">辰溪里：九曲里与竹园路交叉路口</view>
			</view>
			<!-- 九宫格按钮 -->
			<view class="u-flex u-row-around">
				<block v-for="(item,index) in btnList" :key="index">
					<view class="u-flex-1 u-flex" style="flex-direction: column;">
						<image :src="item.img" mode="aspectFit" style="height: 71rpx !important;width: 71rpx;"></image>
						<!-- <u-image src="../../static/home/introduce.png" mode="heightFix" height="71"></u-image> -->
						<view class="u-m-t-20 u-text-center text-bold u-font-30 text-black">{{item.name}}</view>
					</view>
				</block>
			</view>
			
			<!-- hot -->
			<view class="u-flex u-row-center u-m-t-50">
				<image src="../../static/home/hot.png" mode="heightFix" style="height: 27rpx;"></image>
			</view>
			
			<!--  -->
			<view class="u-m-l-30 u-m-t-20">
				<u-image  src="@/static/home/bg_img.png" border-radius="20" width="690" height="376" />
			</view>
			
			<icon-loading v-model="showLoading" />
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar  :list="list" :mid-button="true" @change="change"></u-tabbar>
	</view>
</template>

<script>
	import { mapState,mapActions } from "vuex"
	export default {
		onLoad() {
			setTimeout(()=>{
				this.showLoading = false
			},1500)
		},
		computed: {
			...mapState({
				list:state => state.tabbars.list
			})
		},
		data() {
			return {
				showLoading:true,
				imgList:[{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}],
				btnList:[
					{name:'项目介绍',img:'../../static/home/introduce.png',url:''},
					{name:'合作洽谈',img:'../../static/home/teamwork.png',url:''},
					{name:'问卷调查',img:'../../static/home/questionnaire.png',url:''},
					{name:'最新活动',img:'../../static/home/activity.png',url:''}
				]
				
			}
		},
		methods: {
			change(index){
				console.log(index);
			}
		}
	}
</script>

<style>

</style>
