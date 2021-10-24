<template>
	<view>
		<view v-html="data"></view>
		
		<u-button :custom-style="customStyle" type="error" shape="circle" @click="pay">立即购买</u-button>
	</view>
</template>

<script>
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
					position:'fixed',
					bottom:"30rpx",
					left:'10rpx',
					right:'10rpx'
				}
			}
		},
		methods: {
			async getDetail(){
				let {code,data,msg} = await this.http.get('package/getDetail')
				if(code === 1000){
					this.data = data.content;
					this.id = data.id
				}
			},
			async pay(){
				let {data} = await this.http.get('package/pay',{id:this.id})
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
							setTimeout(()=>uni.navigateBack({delta:1}),1500)
						}
					},
					fail:(res)=> {
						this.$u.toast(res.errMsg)
						console.log(res);
					}
				})
			},
		}
	}
</script>

<style>

</style>
