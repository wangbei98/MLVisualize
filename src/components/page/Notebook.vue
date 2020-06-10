<template>
  <el-container style="height: 550px; border: 1px solid #eee">
    <el-main>
      <!-- 用表格展示所有笔记 -->
      <el-table
        :data="notes"
        style="width: 100%"
        max-height="1000">
        <!-- 用noteFormatter展示缩略后的笔记内容 -->
        <el-table-column
          fixed
          prop="content"
          :formatter="noteFormatter"
          label="文件名">
        </el-table-column>
        <!-- 编辑按钮 -->
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editRow(scope.$index, notes)"
              type="text"
              size="small">
              编辑
            </el-button>
          </template>
        </el-table-column>
        <!-- 删除按钮 -->
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, notes)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <el-button @click='newNote'>新建笔记</el-button>
      <el-divider></el-divider>
      <mavon-editor v-model="curNote.content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
      <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </el-main>
  </el-container>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default{
    name:'notebook',
    components: {
        mavonEditor
    },
    data(){
      return{
        notes:[
          {content:'# 1'},
          {content:'# 2'}
        ],
        curNote:{
          content:'# hhhhh'
        }
      }
    },
    methods:{
      // 当笔记内容过长时，需要展示缩略后的内容
      // 笔记内容缩略，取前50个字符，后面的用。。。代替
      noteFormatter(row,col){
        var len = 50
        var str = row.content
        var reg = /[\u4e00-\u9fa5]/g,    //专业匹配中文
        slice = str.substring(0, len),
        chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length)),
        realen = slice.length*2 - chineseCharNum;
        return str.substr(0, realen) + (realen < str.length ? "..." : "");
      },
      submit(){
        this.notes.push(this.curNote)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      editRow(index,rows){
        this.curNote = rows[index]
      },
      newNote(){
        console.log('new note')
        this.curNote = {content:''}
      },
      $imgAdd(pos, $file){
          console.log('add img')
          // // FormData对象用以将数据编译成键值对。
          // var formdata = new FormData();
          // // 第一步.将图片上传到服务器.
          // formdata.append('file', $file);
          // // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
          // this.$axios({
          //     url: '/common/upload',
          //     method: 'post',
          //     data: formdata,
          //     headers: { 'Content-Type': 'multipart/form-data' },
          // }).then((url) => {
          //     // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          //     /**
          //      * $vm 指为mavonEditor实例，可以通过如下两种方式获取
          //      * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
          //      * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
          //      */
          //     this.$refs.md.$img2Url(pos, url);
          // })
      },
      change(value, render){
          // render 为 markdown 解析后的结果
          this.html = render;
      },
    }

  }
</script>

<style>
</style>
