<template>
<!-- 公共头部组件 -->
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <!-- 通过v-if和v-else来判定侧边栏打开状态 -->
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">机器学习可视化系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <!-- 通过三元表达式来显示不同的文字提示，placement属性控制文字提示出现的位置 -->
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单：trigger属性配置 click 激活 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <!-- slot设置下拉列表 -->
                    <el-dropdown-menu slot="dropdown">
                        <a href="https:wangbei.xyz" target="_blank">
                            <el-dropdown-item>访问博客</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'AsunaCC',
            };
        },


    // 监控自定义属性
        computed: {
            username() {
                // 从本地存储中获取值
                let username = localStorage.getItem('ms_username');
                // 对获取到的值进行判断，如果从本地存储能够获取到值，则使用该值，如果不能获取到，则使用 data 中设置的值
                return username ? username : this.name;
            }
        },


        methods: {
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                //退出登录事件
                if (command == 'loginout') {
                    // 从本地存储中删除用户名
                    localStorage.removeItem('ms_username');
                    // 跳转到登录页面
                    this.$router.push('/login');
                }
            },


            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                // 通过bus发送信息
                // bus.$emit('collapse', this.collapse);
            },


            // 全屏事件
            handleFullScreen() {
                // 获取文档对象的根元素
                let element = document.documentElement;
                if (this.fullscreen) {
                    // 设置不同浏览器下的退出全屏模式
                    // -webkit- 兼容chrome 和 safari
                    // -moz- 兼容firefox
                    // -ms- 兼容IE浏览器
                    // -o- 兼容opera
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    // 设置不同浏览器下的进入全屏模式
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },


        // 初始化页面完成后，对页面可见区域宽度进行判定，如果页面宽度小于1500，则触发 collapseChage 方法。
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            }
            //通过 bus 通信获取 message 的值。
            // bus.$on('msg', (e) => {
            //     this.message = e;
            // })
        }
    };
</script>


<!-- CSS样式 -->
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo {
        float: left;
        width: 250px;
        line-height: 70px;
    }
    .header-right {
        float: right;
        padding-right: 50px;
    }
    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell {
        color: #fff;
    }
    .user-name {
        margin-left: 10px;
    }
    .user-avator {
        margin-left: 20px;
    }
    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
