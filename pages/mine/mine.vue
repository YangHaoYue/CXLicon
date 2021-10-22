<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar  :list="list" :mid-button="true" @change="change"></u-tabbar>
	</view>
</template>

<script>
	import { mapState,mapActions } from "vuex"
	export default {
		computed: {
			...mapState({
				list:state => state.tabbars.list
			})
		},
		data() {
			return {
					
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
