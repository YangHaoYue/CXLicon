<template>
	<view class="body-color-gray":style="'min-height:'+$u.sys().windowHeight+'px;'">
		<u-gap/>
		<block v-for="(item,i) in list" :key="i">
			<view class="card u-flex bg-white">
				<view class="u-flex-2">
					<view class="u-font-30 text-black u-m-b-10">{{item.no}}</view>
					<view class="u-font-24 text-gray">有效期至：{{item.end_at}}</view>
				</view>
				<view class="text-black text-bold u-flex-2 u-text-center" style="font-size: 40rpx;">
					{{item.name}}
				</view>
				<view class="u-flex-1 u-text-center" style="font-size: 50rpx;color: #ED1E79;">
					{{item.price}}
				</view>
			</view>
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
	export default {
		onLoad() {
			this.getPackageRecords()
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
			async getPackageRecords(){
				let {code,data} = await this.http.get('user/getPackageRecords',{page:this.page})
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
			}
		}
	}
</script>

<style scoped>
	.card{
		width: 690rpx;
		height: 168rpx;
		margin: 30rpx;
		padding: 0 30rpx;
		border-radius: 15rpx;
		box-shadow: 0px 1px 4px 3px rgba(188, 188, 188, 0.09);
	}
</style>
