// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// custom filters
Vue.filter('timestampToLocalString', function (timestamp) {
  return timestamp ? new Date(timestamp).toLocaleDateString() : ''
})

Vue.use(Buefy)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
