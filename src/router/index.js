import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import vHome from '../components/common/Home.vue'
import vLogin from '../components/page/Login.vue'
import vRegister from '../components/page/Register.vue'

import kMeans from '../components/page/KMeans.vue'
import LinearRegression from '../components/page/LinearRegression.vue'
import ExponentialRegression from '../components/page/ExponentialRegression.vue'
import LogarithmicRegression from '../components/page/LogarithmicRegression.vue'
import PolynomialRegression from '../components/page/PolynomialRegression.vue'
import LoadCSVDemo from '../components/page/LoadCSVDemo.vue'
import ModelDemo from '../components/page/ModelDemo.vue'
import LoadCSVDemo2 from '../components/page/LoadCSVDemo2.vue'
import Cluster from '../components/page/Clustering.vue'
import Resources from '../components/page/Resources.vue'
import Notebook from '../components/page/Notebook.vue'
import Todos from '../components/page/Todos.vue'
import TensorFlowDemo from '../components/page/TensorFlowDemo.vue'

export default new Router({
  routes: [
    {
        path: '/',
        redirect: '/home/linear-regression'
    },
    {
      path: '/home',
      name: 'Home',
      component: vHome,
      children:[
        {
          path:'linear-regression',
          component: LinearRegression,
          meta:{title:'线性回归'}
        },
        {
          path:'exponential-regression',
          component: ExponentialRegression,
          meta:{title:'指数回归'}
        },
        {
          path:'logarithmic-regression',
          component: LogarithmicRegression,
          meta:{title:'对数回归'}
        },
        {
          path:'polynomial-regression',
          component: PolynomialRegression,
          meta:{title:'多项式回归'}
        },
        {
          path:'clustering',
          component: Cluster,
          meta:{title:'聚类算法'}
        },
        {
          path:'k-means',
          component: kMeans,
          meta:{title:'聚类'}
        },
        {
          path:'load-csv-demo',
          component: LoadCSVDemo,
          meta:{title:'读取csv'}
        },
        {
          path:'load-csv-demo-2',
          component: LoadCSVDemo2,
          meta:{title:'读取csv2'}
        },
        {
          path:'model-demo',
          component: ModelDemo,
          meta:{title:'model-demo'}
        },
        {
          path:'resources',
          component: Resources,
          meta:{title:'资料'}
        },
        {
          path:'notebook',
          component: Notebook,
          meta:{title:'笔记'}
        },
        {
          path:'todos',
          component: Todos,
          meta:{title:'待办'}
        },
        {
          path:'tf-demo',
          component: TensorFlowDemo,
          meta:{title:'tf-demo'}
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: vLogin,
      meta:{title:'登录'}
    },
    {
      path: '/register',
      name: 'vRegister',
      component: vRegister,
      meta:{title:'注册'}
    }
  ]
})
