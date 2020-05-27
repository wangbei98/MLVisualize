<template>
  <div>
    <h3>一元线性回归</h3>
    <el-button @click='handleShow'>show</el-button>
    <div class="hello">
      <v-chart ref="chart1" :options="orgOptions" :auto-resize="true"></v-chart>
    </div>
  </div>
</template>

<script>
  export default{
    name:'unary-lr',
    data () {
      return {
        orgOptions: {},
      }
    },
    methods:{
      handleShow(){
        var data1 = [
            [1, 4862.4],
            [2, 5294.7],
            [3, 5934.5],
            [4, 7171.0],
            [5, 8964.4],
            [6, 10202.2],
            [7, 11962.5],
            [8, 14928.3],
            [9, 16909.2],
            [10, 18547.9],
            [11, 21617.8],
            [12, 26638.1],
            [13, 34634.4],
            [14, 46759.4],
            [15, 58478.1],
            [16, 67884.6],
            [17, 74462.6],
            [18, 79395.7]
        ];
        var data2 = [
            [1, 4162.4],
            [2, 4982.7],
            [3, 5964.5],
            [4, 7139.0],
            [5, 8545.4],
            [6, 10229.2],
            [7, 12245.5],
            [8, 14657.3],
            [9, 17545.2],
            [10, 21002.9],
            [11, 25140.8],
            [12, 30094.1],
            [13, 36023.4],
            [14, 43120.4],
            [15, 51616.1],
            [16, 61786.6],
            [17, 73960.6],
            [18, 88532.7]
        ];
        this.orgOptions = {

          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
          },
          xAxis: {
              type: 'value',
              splitLine: {
                  lineStyle: {
                      type: 'dashed'
                  }
              },
              splitNumber: 20
          },
          yAxis: {
              type: 'value',
              splitLine: {
                  lineStyle: {
                      type: 'dashed'
                  }
              }
          },
          series: [{
              name: 'scatter',
              type: 'scatter',
              emphasis: {
                  label: {
                      show: true,
                      position: 'left',
                      color: 'blue',
                      fontSize: 16
                  }
              },
              data: data1
          }, {
              name: 'line',
              type: 'line',
              showSymbol: false,
              smooth: true,
              data: data2
          }]
        }
      }
    }
  }
</script>

<style>
</style>
