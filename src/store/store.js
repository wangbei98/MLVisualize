import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    //state用来存储需要用到的公共数据
    data:[]
  },
  getters:{
    //getters用来从外界获取这些数据
  },
  mutations:{
    // mutations 负责对state中的数据操作
    refreshData(state,data){
      state.data = data
    }
  },
  actions:{
    // actions负责接收其他组件对公共数据的操作，并将操作传递到mutations中执行
    // 为了降低耦合性，外部组件不允许直接修改state中的数据，需要先调用actions中的函数
    // actions中的函数监听到外部组件对其的调用后，将行为转发给mutations中的函数
    // 由mutations中函数直接对state进行操作。
    refreshData(context,data){
      //调用第15行的refreshData函数刷新state中的数据
      context.commit('refreshData',data)
    }
  }

})
