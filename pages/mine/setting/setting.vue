<template>
	<view >
		<view class="u-flex u-row-center u-p-30" style="flex-direction: column;">
			<view class="u-flex u-p-l-30 u-p-r-30 u-m-b-20" style="width: 100%;">
				<view class="u-font-32 text-black text-bold u-m-r-18 u-flex-1 ">姓名<text style="color: #ED1E79;">*</text></view>
				<u-input class="u-flex-3" border borderColor="#F01C77" type="text" v-model="name" placeholder="请输入您的姓名" />
			</view>
			<view class="u-flex u-p-l-30 u-p-r-30 u-m-b-20" style="width: 100%;">
				<view class="u-font-32 text-black text-bold u-m-r-18 u-flex-1 ">性别</view>
				<u-radio-group class="u-flex-3" v-model="sex" @change="sex = $event">
					<u-radio 
						v-for="(item, index) in list" :key="index" 
						:name="item.name"
						active-color="#ED1E79"
					>
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="u-flex u-p-l-30 u-p-r-30 u-m-b-20" style="width: 100%;">
				<view class="u-font-32 text-black text-bold u-m-r-18 u-flex-1 ">生日</view>
				<u-input class="u-flex-3" border borderColor="#F01C77" type="text" disabled v-model="birthday" placeholder="请选择您的生日" @click="showTime = true"/>
			</view>
			<view class="u-flex u-p-l-30 u-p-r-30 u-m-b-20" style="width: 100%;">
				<view class="u-font-32 text-black text-bold u-m-r-18 u-flex-1 ">地址</view>
				<u-input class="u-flex-3" border borderColor="#F01C77" v-model="address"  placeholder="请输入您的详细地址"/>
			</view>
			<view class="u-font-28 u-m-30" style="color: #ED1E79;">
				温馨提示：为保障您的最大权益，请必须填写正确。
			</view>
		</view>
		
		<u-picker v-model="showTime" mode="time" :params="params" confirm-color="#ED1E79" @confirm="change" />
		
		
		<u-button :custom-style="customStyle" type="error" shape="circle" @click="setUserInfo">提交</u-button>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				name:this.$store.state.userInfo.userInfo.name,
				sex: this.$store.state.userInfo.userInfo.sex === 0?'男':'女',
				birthday:this.$store.state.userInfo.userInfo.birthday,
				address:this.$store.state.userInfo.userInfo.address,
				list: [{name: '男'},{name: '女'}],
				showTime:false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
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
			...mapActions([
				'getUserInfo'
			]),
			async getUser(){
				let {data,code} = await this.http.get('user/info')
				if(code === 1000){
					this.$store.commit('getUserInfo',data)
				}
			},
			async setUserInfo(){
				let {code,msg} = await this.http.post('user/setUserInfo',{name:this.name,sex:this.sex==='男'?0:1,birthday:this.birthday,address:this.address})
				this.$u.toast(msg)
				if(code != 1000) return 
				this.getUser()
				setTimeout(()=>uni.navigateBack({delta:1}),1500)
			},
			change(e){
				this.birthday = `${e.year}-${e.month}-${e.day}`
			}
		}
	}
</script>

<style>

</style>
