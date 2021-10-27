<template>
	<view class="body-color-gray":style="'min-height:'+$u.sys().windowHeight+'px;'">
		<u-tabs :list="screen.list" :is-scroll="false" :current="screen.currentIndex" bar-width="175" active-color="#F1207B" @change="change"></u-tabs>
		
		<u-gap/>
		
		<block v-for="(item,index) in list" :key="index">
			<coupons-card :image="item.image" :index='index' :currentIndex="screen.currentIndex" :coupon_id="item.id">
				<view class="u-flex u-row-between">
					<view>
						<view class="text-bold" style="font-size: 40rpx;" :class="index%2===0?'text-primary':'text-red'" v-if="screen.currentIndex === 0">{{item.name}}</view>
						<view class="text-bold" style="font-size: 40rpx;" v-else>{{item.name}}</view>
						<view class="u-font-22 u-m-t-20 u-line-1">有效期：{{item.start_at}}-{{item.end_at}}</view>
					</view>
					<view class="u-line-1 cu-btn round u-font-26" :class="index%2===0?'primary':'red'" v-if="screen.currentIndex === 0">立即使用</view>
					<view class="u-line-1 cu-btn round bg-gray u-font-26" v-else-if="screen.currentIndex === 1">已使用</view>
					<view class="u-line-1 cu-btn round bg-gray u-font-26" v-else>已过期</view>
				</view>
			</coupons-card>
		</block>
		
		<!-- 数据为空 -->
		<view style="padding-top: 80rpx;" v-if="list.length==0&&status=='nomore'" >
			<u-empty text="数据为空" mode="list"></u-empty>
		</view>
		<!-- 加载更多 -->
		<view class="u-m-t-20" v-if="!(list.length<10&&status=='nomore')">
			<u-loadmore :status="status"/>
		</view>
	</view>
</template>

<script>
	import couponsCard from '@/components/coupons-card.vue';
	export default {
		onLoad() {
			this.getMineCoupon()
		},
		components:{
			couponsCard
		},
		onReachBottom() {
			if(this.page >= this.last_page) return ;
			this.page = ++ this.page;
			setTimeout(() => {
				this.getPackageRecords();
			}, 50)
		},
		data() {
			return {
				//type=0 未使用  1 已经使用  2超期
				screen:{
					currentIndex:0,
					list:[
						{name:'未使用',id:0},
						{name:'已使用',id:1},
						{name:'已过期',id:2}
					]
				},
				/* 列表 */
				page:1,
				last_page:'',
				list:[],
				/* 加载更多 */
				status: 'loading',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
				
			}
		},
		methods: {
			change(index) {
				this.screen.currentIndex = index;
				this.clearData()
			},
			async getMineCoupon(){
				let {code,data} = await this.http.get('coupon/getMine',{page:this.page,type:this.screen.currentIndex})
				if(code === 1000){
					if(this.list.length === 0){
						this.last_page = data.last_page;
						this.list = data.data
					}else{
						this.list.concat(data.data)
					}
					if(this.page >= this.last_page) this.status = 'nomore';
					else this.status = 'loadmore';
				}
			},
			clearData(){
				this.status = "loading";
				this.list = [];
				this.page = 1;
				this.last_page = 1;
				this.getMineCoupon()
			}
		}
	}
</script>

<style scoped>
	.primary{
		background-color: #0F58FB;
		color: #FFFFFF;
	}
	.red{
		background-color: #ED1E79;
		color: #FFFFFF;
	}
	.text-red{
		color: #ED1E79;
	}
	.text-primary{
		color: #0F58FB;
	}
	.bg-gray{
		background-color: #9B999A;
		color:#FFFFFF;
	}
</style>
