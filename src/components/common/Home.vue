<template>
<!-- 公共Home组件 -->
    <div class="wrapper">
        <!-- 头部组件 -->
        <v-head></v-head>
        <!-- 侧边栏组件 -->
        <v-sidebar></v-sidebar>
        <div class="content-box" >
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        data() {
            return {
                collapse: false
            };
        },
        components: {
            vHead,
            vSidebar,
        },
        created() {
        }
    };
</script>
