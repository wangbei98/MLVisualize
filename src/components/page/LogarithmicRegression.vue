<template>
  <div>
    <el-container style="height: 600px; border: 1px solid #eee">
      <el-main>
      <h3>对数回归</h3>
      <data-loader></data-loader>
      <!-- <el-button icon="el-icon-upload" @click="dialogUploadVisible = true">选择数据</el-button> -->
      <el-divider></el-divider>
      <!-- 直方图 -->
      <el-divider></el-divider>
      <div class="toolBar">
        查看数据直方图
        <div>

          <el-radio v-model="radio" label='0'>X轴</el-radio>
          <el-radio v-model="radio" label='1'>Y轴</el-radio>
          <el-button @click='handleShowHist'>查看直方图</el-button>
          <span class="demonstration">选择直方图颜色：</span>
          <el-color-picker v-model="histColor" size="small" @change="changeHistColor"></el-color-picker>
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
        <v-chart ref="hist" :options="histOptions" :auto-resize="true"></v-chart>
      </div>
      <div class="toolBar">
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
      </div>
      <div class="toolBar">
        <div>
          <el-button @click='handleShowRegression'>拟合</el-button>
          <span class="demonstration">选择散点颜色：</span>
          <el-color-picker v-model="scatterColor" size="small" @change="changeScatterColor"></el-color-picker>
          <span class="demonstration">选择直线颜色：</span>
          <el-color-picker v-model="lineColor" size="small" @change="changeLineColor"></el-color-picker>
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
      <div>
        <v-chart ref="regression" :options="regressionOptions" :auto-resize="true"></v-chart>
      </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import DataLoader from './DataLoader.vue'
  import echarts from 'echarts'
  import ecStat from 'echarts-stat'
  export default{
    name:'logarithmic-regression',
    components:{
      DataLoader
    },
    data () {
      return {
        scatterColor: '#409EFF',
        lineColor:'#000',
        scatterOptions: {},
        regressionOptions:{},
        radio:'0',
        histColor:'#409EFF',
        histOptions:{}
      }
    },
    computed:{
      data(){
        return this.$store.state.data
      }
    },
    methods:{
      changeHistColor(){
        this.handleShowHist()
      },
      changeScatterColor(){
        this.handleShowData()
        this.handleShowRegression()
      },
      changeLineColor(){
        this.handleShowData()
        this.handleShowRegression()
      },
      handleShowHist(){
        //参考 https://echarts.apache.org/examples/zh/editor.html?c=bar-histogram
        var dim = parseInt(this.radio)
        var histData = this.data.map(function(value,index) { return value[dim]; });
        var bins = ecStat.histogram(histData);
        var interval;
        var min = Infinity;
        var max = -Infinity;
        var data = echarts.util.map(bins.data, function (item, index) {
            var x0 = bins.bins[index].x0;
            var x1 = bins.bins[index].x1;
            interval = x1 - x0;
            min = Math.min(min, x0);
            max = Math.max(max, x1);
            return [x0, x1, item[1]];
        });
        function renderItem(params, api) {
            var yValue = api.value(2);
            var start = api.coord([api.value(0), yValue]);
            var size = api.size([api.value(1) - api.value(0), yValue]);
            var style = api.style();

            return {
                type: 'rect',
                shape: {
                    x: start[0] + 1,
                    y: start[1],
                    width: size[0] - 2,
                    height: size[1]
                },
                style: style
            };
        }
        this.histOptions = {
          title: {
              text: '可视化直方图',
              left: 'center',
              top: 10
          },
          color: [this.histColor],
          grid: {
              top: 80,
              containLabel: true
          },
          xAxis: [{
              type: 'value',
              min: min,
              max: max,
              // interval: interval
          }],
          yAxis: [{
              type: 'value',
          }],
          series: [{
              name: 'height',
              type: 'custom',
              renderItem: renderItem,
              label: {
                  show: true,
                  position: 'insideTop'
              },
              encode: {
                  x: [0, 1],
                  y: 2,
                  tooltip: 2,
                  label: 2
              },
              data: data
          }]
        }
      },
      handleShowData(){
        var scatterData = this.data
        this.scatterOptions = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
          },
          // color:'#409EFF',
          xAxis: {
              type: 'value',
              splitLine: {
                  lineStyle: {
                      type: 'dashed'
                  }
              },
          },
          yAxis: {
              type: 'value',
              splitLine: {
                  lineStyle: {
                      type: 'dashed'
                  }
              },
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
              data: scatterData,
              itemStyle:{
                color:this.scatterColor
              }
          }]
        }
      },
      handleShowRegression(){
        console.log('show regression')
        var data = this.data
        var myRegression = ecStat.regression('logarithmic', data);
        myRegression.points.sort(function(a, b) {
            return a[0] - b[0];
        });
        this.regressionOptions = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
          },
          // color:'#409EFF',
          xAxis: {
              type: 'value',
              splitLine: {
                  lineStyle: {
                      type: 'dashed'
                  }
              },
          },
          yAxis: {
              type: 'value',
              splitLine: {
                  lineStyle: {
                      type: 'dashed'
                  }
              },
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
              data: data,
              itemStyle:{
                color:this.scatterColor
              }
          },{
              name: 'line',
              type: 'line',
              showSymbol: false,
              data: myRegression.points,
              itemStyle:{
                color:this.lineColor
              },
              markPoint: {
                  itemStyle: {
                      color: 'transparent'
                  },
                  label: {
                      show: true,
                      position: 'left',
                      formatter: myRegression.expression,
                      color: '#333',
                      fontSize: 14
                  },
                  data: [{
                      coord: myRegression.points[myRegression.points.length - 1]
                  }]
              }
          }]
        }
      }
    }
  }
</script>

<style>
</style>
