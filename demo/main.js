import './promise'
import Vue from 'vue/dist/vue.js'
import Demo from './Demo.vue'

/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: {
    demo: Demo
  },
  render: h => h(Demo)

})
