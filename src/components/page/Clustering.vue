<template>
  <div>
    <el-container style="height: 600px; border: 1px solid #eee">
      <el-main>
      <h3>聚类算法</h3>
      <data-loader></data-loader>
      <!-- <el-button icon="el-icon-upload" @click="dialogUploadVisible = true">选择数据</el-button> -->
      <el-divider></el-divider>
      <!-- <div class="toolBar">
        <div>
          <el-button @click='handleShowData'>查看数据</el-button>

          <span class="demonstration">选择散点颜色：</span>
          <el-color-picker v-model="scatterColor" size="small" @change="changeScatterColor"></el-color-picker>
          <el-popover
            placement="top-start"
            title=""
            width="200"
            trigger="hover"
            content="右键图片保存">
            <el-button slot="reference">保存</el-button>
          </el-popover>
        </div>
      </div>
      <div class="hello">
        <v-chart ref="scatter" :options="scatterOptions" :auto-resize="true"></v-chart>
      </div> -->
      <!-- <div class="toolBar">
        <div>
          <el-button @click='handleShowRegression'>拟合</el-button>
          <span class="demonstration">选择散点颜色：</span>
          <el-color-picker v-model="scatterColor" size="small" @change="changeScatterColor"></el-color-picker>
          <span class="demonstration">选择直线颜色：</span>
          <el-color-picker v-model="lineColor" size="small" @change="changeLineColor"></el-color-picker>
        </div>
      </div>
      <div>
        <v-chart ref="regression" :options="regressionOptions" :auto-resize="true"></v-chart>
      </div> -->

      <div>
        <el-button @click='initEchart'>show</el-button>
        <div ref="chartDv" style="height: 600px;"></div>
      </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import DataLoader from './DataLoader.vue'
  import ecStat from 'echarts-stat'
  export default{
    name:'cluster',
    components:{
      DataLoader
    },
    data () {
      return {
        scatterColor: '#409EFF',
        lineColor:'#000',
        scatterOptions: {},
        regressionOptions:{},
        // dialogUploadVisible:false
      }
    },
    computed:{
      data(){
        return this.$store.state.data
      }
    },
    methods:{
      initEchart() {
        //用ref获取dom元素，而不要用传统的document.getElementById('main')这种方式，因为会出现BUG
        let bar_dv = this.$refs.chartDv;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(bar_dv);
        let option;
        let data = this.data

        let clusterNumber = 6;
        // See https://github.com/ecomfe/echarts-stat
        let step = ecStat.clustering.hierarchicalKMeans(data, clusterNumber, true);
        let result;

        option = {
          timeline: {
            top: 'center',
            right: 35,
            height: 300,
            width: 10,
            inverse: true,
            playInterval: 2500,
            symbol: 'none',
            orient: 'vertical',
            axisType: 'category',
            autoPlay: true,
            label: {
              normal: {
                show: false
              }
            },
            data: []
          },
          baseOption: {
            title: {
              text: '聚类算法可视化',
              left: 'center'
            },
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              type: 'scatter'
            }]
          },
          options: []
        };

        for(let i = 0; !(result = step.next()).isEnd; i++) {

          option.options.push(getOption(i,result, clusterNumber));
          option.timeline.data.push(i + '');

        }

        function getOption(i,result, k) {
          let clusterAssment = result.clusterAssment;
          let centroids = result.centroids;
          let ptsInCluster = result.pointsInCluster;
          let color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
          let series = [];
          for(i = 0; i < k; i++) {
            series.push({
              name: 'scatter' + i,
              type: 'scatter',
              animation: false,
              data: ptsInCluster[i],
              markPoint: {
                symbolSize: 29,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true,
                    position: 'top',
                    formatter: function(params) {
                      return Math.round(params.data.coord[0] * 100) / 100 + '  ' +
                        Math.round(params.data.coord[1] * 100) / 100 + ' ';
                    },
                    textStyle: {
                      color: '#000'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    opacity: 0.7
                  }
                },
                data: [{
                  coord: centroids[i]
                }]
              }
            });
          }

          return {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            series: series,
            color: color
          };
        }
        myChart.setOption(option);
      }
    }
  }
</script>

<style>
</style>
