<template>
	<view class="body-color-gray":style="'min-height:'+$u.sys().windowHeight+'px;'">
		<u-tabs :list="screen.list" :is-scroll="false" :current="screen.currentIndex" bar-width="175" active-color="#F1207B" @change="change"></u-tabs>
		
		<u-gap/>
		
		<block v-for="(item,index) in list" :key="index">
			<coupons-card>
				<view class="u-flex u-row-between">
					<view>
						<view class="text-bold" style="font-size: 40rpx;">满一百减59</view>
						<view class="u-font-22 u-m-t-20">有效期：2021.01.01-2021.12.30</view>
					</view>
					<u-button shape="circle" size="mini" type="primary">立即使用</u-button>
				</view>
			</coupons-card>
		</block>
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
				screen:{
					currentIndex:0,
					list:[
						{name:'未使用',id:0},
						{name:'已使用',id:1},
						{name:'已过期',id:2}
					]
				},
				list:[1]
			}
		},
		methods: {
			change(index) {
				this.screen.currentIndex = index;
			}
		}
	}
</script>

<style>
	
</style>
