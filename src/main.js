// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入 element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/scatter'

Vue.component('v-chart', ECharts)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


// import VueD3 from 'vue-d3'
// Vue.use(VueD3)

// import { VueCsvImport } from 'vue-csv-import';
// Vue.use(VueCsvImport)

import {store} from './store/store.js'

router.beforeEach((to, from, next) => {
    //对页面的标题进行设置，获取路由元信息当中的title
  document.title = `${to.meta.title} | 机器学习可视化`;
    //获取本地存储的用户名
   //  const role = localStorage.getItem('ms_username');
   // //判断是否存在用户名以及下一个钩子是否是跳转到 '/login'
   //  if (!role && to.path !== '/login') {
   //      //跳转到 '/login'
   //      next('/login');
   //  } else {
   //    next()
   //  }
   next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
