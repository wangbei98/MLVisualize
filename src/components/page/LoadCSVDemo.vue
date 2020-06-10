<template>
  <div>
    <el-container style="height: 600px; border: 1px solid #eee">
      <el-main>
        <vue-csv-import v-model="parseCsv" :map-fields="{field1: 'X', field2: 'Y'}"></vue-csv-import>
        <div class="mt-2">
            {{ parseCsv }}
        </div>
        <div>
          {{this.json2Array(parseCsv)}}
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { VueCsvImport } from 'vue-csv-import';
  export default{
    name:'load-csv-demo',
    components:{
      VueCsvImport
    },
    data(){
      return{
        parseCsv:null,
        field1:[],
        field2:[]
      }
    },
    methods:{
      json2Array(json){
        // console.log('json is ')
        // console.log(json)
        var res = []
        for(var i in json){
          var obj = json[i]
          console.log('obj is')
          console.log(obj)
          var row = []
          for(var key in obj){
            row.push(parseFloat(obj[key]))
          }
          res.push(row)
        }
        return res
      }
    }
  }
</script>

<style>
</style>
