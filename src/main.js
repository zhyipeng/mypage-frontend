import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'


import './assets/css/main.css'
import './assets/css/index.css'

Vue.config.productionTip = false
    // Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')