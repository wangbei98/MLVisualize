<template>
  <el-container style="height: 600px; border: 1px solid #eee">
    <el-main>
      <el-card shadow="hover" style="height:600px;">
          <div slot="header" class="clearfix">
              <span>待办事项</span>
              <!-- 添加todo 按钮 -->
              <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">添加</el-button>
          </div>
          <!-- 用表格展示所有todo -->
          <el-table :data="todoList" :show-header="false" height="600" style="width: 100%;font-size:14px;">
              <!-- 复选框 -->
              <el-table-column width="40">
                  <!--  slot-scope：作用域插槽，已经废弃。现在使用v-slot代替  -->
                  <template v-slot:default="scope">
                      <el-checkbox v-model="scope.row.status"></el-checkbox>
                  </template>
              </el-table-column>
              <el-table-column>
                  <template v-slot:default="scope">
                      <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
                  </template>
              </el-table-column>
              <!-- 删除某个Todo -->
              <el-table-column width="60">
                  <template v-slot:default="scope">
                      <!-- <i class="el-icon-edit"></i> -->
                      <!-- <i class="el-icon-delete"></i> -->
                      <el-button size="small"
                       @click.native.prevent="deleteRow(scope.$index, todoList)"
                      icon="el-icon-delete"></el-button>
                  </template>
              </el-table-column>
          </el-table>
      </el-card>
      <el-dialog title="新建todo" :visible.sync="dialogVisible">
        <el-form :model="form">
          <el-form-item label="todo" :label-width="formLabelWidth">
            <el-input v-model="form.todo" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  export default{
    name:'to-do',
    data(){
      return{
        todoList: [{
                title: '今天要修复100个bug',
                status: false,
            },
            {
                title: '今天要修复100个bug',
                status: false,
            },
            {
                title: '今天要写100行代码加几个bug吧',
                status: false,
            }, {
                title: '今天要修复100个bug',
                status: false,
            },
            {
                title: '今天要修复100个bug',
                status: true,
            },
            {
                title: '今天要写100行代码加几个bug吧',
                status: true,
            }
        ],
        //新建todo的值，与表单绑定
        form:{
          todo:''
        },
        //对话框默认关闭
        dialogVisible:false,
        // 对话框的宽度
        formLabelWidth:'120px'
      }
    },
    methods:{
      submitAdd(){
        //提交添加todo

        // 关闭对话框
        this.dialogVisible = false
        //将新建的todo放到todoList
        this.todoList.push({
          title:this.form.todo,
          status:false
        })
      },
      deleteRow(index, rows) {
        //删除某个todo
        rows.splice(index, 1);
      }
    }

  }
</script>

<style>
  .todo-item {
      font-size: 14px;
  }

  .todo-item-del {
      text-decoration: line-through;
      color: #999;
  }
</style>
