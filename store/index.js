import Vue from "vue"
import Vuex  from "vuex"
import tabbars from "./modules/tabbars.js"


Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		tabbars
	}
})

export default store