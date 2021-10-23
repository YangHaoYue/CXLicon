import route from "../../uview-ui/libs/function/route.js"
export default {
	state:{
		list: [{
				iconPath: "home",
				selectedIconPath: "home-fill",
				text: '首页',
				isDot: false,
				customIcon: false,
				pagePath: "/pages/home/home"
			},
			{
				iconPath: "https://7778-wxpay-yai0c-1303163285.tcb.qcloud.la/circle.png?sign=98c5a7974a6b5fcc905dcc508c7c4627&t=1634823926",
				selectedIconPath: "https://7778-wxpay-yai0c-1303163285.tcb.qcloud.la/circle.png?sign=98c5a7974a6b5fcc905dcc508c7c4627&t=1634823926",
				midButton: true,
				customIcon: false,
			},
			{
				iconPath: "account",
				selectedIconPath: "account-fill",
				text: '我的',
				isDot: false,
				customIcon: false,
				pagePath: "/pages/mine/mine"
			},
		],
		current: 0,
		iconUrl:''
	},
	actions:{
		currentChange({commit},currentIndex){
			commit('currentChange',currentIndex)
		}
	},
	mutations:{
		setIconUrl(state,iconUrl){
			state.iconUrl = iconUrl;
		},
		currentChange(state,currentIndex){
			state.current = currentIndex;
			if(currentIndex === 1){
				route('/pages/questionare/questionare')
			}
		}
	}
}