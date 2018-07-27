// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMq from 'vue-mq'

Vue.config.productionTip = false

// custom filters
Vue.filter('timestampToLocalString', function (timestamp) {
  return new Date(timestamp).toLocaleDateString()
})

Vue.use(VueMq, {
  breakpoints: {
    sm: 450,
    md: 1250,
    lg: Infinity
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
