import Vue from "vue"
import Vuex  from "vuex"
import tabbars from "./modules/tabbars.js"
import mineMenu from './modules/mineMenu.js';
import userInfo from './modules/userInfo.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		tabbars,
		mineMenu,
		userInfo
	}
})

export default store