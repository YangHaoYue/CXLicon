<template>
	<view>
		<u-parse :html="value"></u-parse>
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
						this.value = res.data;
						// this.value = res.data.replace(/\<img/gi,'<img style="width:100% ! important;" ' );
					}
				})
			}
		}
	}
</script>

<style>

</style>
