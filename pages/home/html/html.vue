<template>
	<view>
		<view v-html="value"></view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.nav_id = e.nav_id;
			this.getNavDetail()
		},
		data() {
			return {
				nav_id:'',
				value:''
			}
		},
		methods: {
			getNavDetail(){
				this.http.get('index/getNavDetail',{
					nav_id:this.nav_id
				}).then(res=>{
					if(res.code === 1000){
						this.value = res.data
					}
				})
			}
		}
	}
</script>

<style>

</style>
