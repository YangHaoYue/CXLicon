<template>
	<view>
		<u-parse :html="data"></u-parse>
		<u-gap height="120" />
		<view class="bottom-btn bg-white">
			<u-button :custom-style="customStyle" type="error" shape="circle" @click="pay">立即购买</u-button>
		</view>
	</view>
</template>

<script>
	import { mapActions } from "vuex"
	export default {
		onLoad() {
			this.getDetail()
		},
		data() {
			return {
				id:'',
				data:'',
				customStyle:{
					backgroundColor:"#ED1E79",
				}
			}
		},
		methods: {
			...mapActions([
				'getUserInfo'
			]),
			async getDetail(){
				let {code,data,msg} = await this.http.get('package/getDetail')
				if(code === 1000){
					this.data = data.content;
					this.id = data.id;
				}
			},
			async pay(){
				let {code,data,msg} = await this.http.get('package/pay',{payment_no:this.id})
				if(code != 1000) return this.$u.toast(msg) 
				wx.requestPayment({
					timeStamp: data.timestamp,
					nonceStr:data.nonceStr,
					package: data.package,
					paySign: data.paySign,
					signType: 'MD5',
					success:(res)=> {
						 console.log('get url',res)
						if (res.errMsg == 'requestPayment:ok') {
							this.$u.toast('支付成功！')
							this.getUser()
							setTimeout(()=>uni.navigateBack({delta:1}),1500)
						}
					},
					fail:(res)=> {
						this.$u.toast(res.errMsg)
					}
				})
			},
			async getUser(){
				let {data,code} = await this.http.get('user/info')
				if(code === 1000){
					this.getUserInfo(data)
				}
			},
		}
	}
</script>

<style scoped>
	.rich-img {
		width: 100% ;
		height: auto ;
	}
	.bottom-btn{
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		padding: 20rpx;
	}
</style>
