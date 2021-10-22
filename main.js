import Vue from 'vue'
import App from './App'
import store from "store"

import iconLoading from "./components/icon-loading.vue"
Vue.component('iconLoading',iconLoading)

import http from './common/httpRequest'
Vue.prototype.http = http

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	store,
    ...App
})
app.$mount()
