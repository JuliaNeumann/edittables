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
  /* eslint-disable no-new */
  new Vue({
    el: '#epp_app',
    template: '<App/>',
    components: { App }
  })
}

if (document.getElementById('epp_app_static')) {
  /* eslint-disable no-new */
  new Vue({
    el: '#epp_app_static',
    template: '<AppStatic/>',
    components: {AppStatic}
  })
}
