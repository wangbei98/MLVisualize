<template>
  <div>
        <!-- <div>选择数据</div> -->
        <el-button icon="el-icon-upload" @click="dialogUploadVisible = true">选择数据</el-button>

        <el-dialog
          title="上传"
          :visible.sync="dialogUploadVisible"
          width="50%">
          <vue-csv-import v-model="parseCsv" :map-fields="{field1: 'X', field2: 'Y'}"></vue-csv-import>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogUploadVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitData">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
  import { VueCsvImport } from 'vue-csv-import';
  export default{
    name:'data-loader',
    components:{
      VueCsvImport
    },
    data(){
      return{
        parseCsv:null,
        field1:[],
        field2:[],
        dialogUploadVisible:false
      }
    },
    methods:{
      json2Array(json){
        // console.log('json is ')
        // console.log(json)
        var res = []
        for(var i in json){
          var obj = json[i]
          var row = []
          for(var key in obj){
            row.push(parseFloat(obj[key]))
          }
          res.push(row)
        }
        return res
      },
      submitData(){
        this.$store.dispatch('refreshData',this.json2Array(this.parseCsv))
        this.$message({
          message: '恭喜你，提交成功',
          type: 'success'
        });
        this.dialogUploadVisible=false
      }
    }
  }
</script>

<style>
</style>
