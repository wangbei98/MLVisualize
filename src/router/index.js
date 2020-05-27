import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import vHome from '../components/common/Home.vue'
import vLogin from '../components/page/Login.vue'
import unaryLR from '../components/page/UnaryLR.vue'
import multiLR from '../components/page/MultiLR.vue'
import logigR from '../components/page/LogicLR.vue'
import decisionTree from '../components/page/DecisioinTree.vue'
import kMeans from '../components/page/KMeans.vue'
import svm from '../components/page/SVM.vue'


export default new Router({
  routes: [
    {
        path: '/',
        redirect: '/home/unary-lr'
    },
    {
      path: '/home',
      name: 'Home',
      component: vHome,
      children:[
        {
          path:'unary-lr',
          component: unaryLR,
          meta:{title:'一元线性回归'}
        },
        {
          path:'multi-lr',
          component: multiLR,
          meta:{title:'多元线性回归'}
        },
        {
          path:'logic-regression',
          component: logigR,
          meta:{title:'逻辑回归'}
        },
        {
          path:'decision-tree',
          component: decisionTree,
          meta:{title:'决策树'}
        },
        {
          path:'k-means',
          component: kMeans,
          meta:{title:'聚类'}
        },
        {
          path:'svm',
          component: svm,
          meta:{title:'支持向量机'}
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: vLogin
    }
  ]
})
