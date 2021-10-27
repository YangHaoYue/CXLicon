<template>
	<view>
		<image :src="http.resourceUrl()+cooperate_img" mode="widthFix" style="width: 100%;"></image>
		<u-image src="@/static/phone.png" width="100" height="100" class="phone" @click="makeCall"/>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed: {
			...mapState({
				cooperate_img:state => state.tabbars.cooperate_img,
				cooperate_mobile:state => state.tabbars.cooperate_mobile
			})
		},
		data() {
			return {
			}
		},
		methods: {
			makeCall(){
				uni.makePhoneCall({
					phoneNumber:this.cooperate_mobile
				})
			}
		}
	}
</script>

<style>
	body{
		padding: 0 !important;
		margin: 0 !important;
	}
	.phone{
		position: fixed;
		bottom: 300rpx;
		right: 30rpx;
	}
</style>
