export default {
	state:{
		menus:[],//
		service_tel:'',//客服电话
		service_wx:''//客服微信
	},
	actions:{
		getMenu({commit},data){
			commit('getMenu',data)
		}
	},
	mutations:{
		getMenu(state,{menus,service_tel,service_wx}){
			state.menus = menus;
			state.service_tel = service_tel;
			state.service_wx = service_wx;
		}
	}
}