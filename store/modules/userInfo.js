export default {
	state:{
		userInfo:{
			name: "", //用户名称
			sex: null, 
			 
			birthday: null, 
			 
			address: null, 
			 
			avatar: null, //头像
			star: 0, //星级
			coupon_count: 0 //优惠卷数量
		}
	},
	actions:{
		getUserInfo({commit},userInfo){
			commit('getUserInfo',userInfo)
		}
	},
	mutations:{
		getUserInfo(state,userInfo){
			state.userInfo = userInfo;
		}
	}
}