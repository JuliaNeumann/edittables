import Vue from 'vue'
import App from './App'
import AppStatic from './AppStatic'
import Buefy from 'buefy'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// custom filters
Vue.filter('timestampToLocalString', function (timestamp) {
  return timestamp ? new Date(timestamp).toLocaleDateString() : ''
})

Vue.use(Buefy)

if (document.getElementById('epp_app')) {
  new Vue(App).$mount('#epp_app')
}

if (document.getElementById('epp_app_static')) {
  new Vue(AppStatic).$mount('#epp_app_static')
}
