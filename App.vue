<script>
	import Vue from 'vue';
	export default {
		onLaunch: function() {
			uni.hideTabBar()
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import "./colorui/main.css";
	@import "./colorui/animation.css";
	@import "./colorui/icon.css";
	.body-color-gray{
		background-color: #F6F7FB;
	}
</style>
