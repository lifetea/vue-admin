<template>
    <div class="sidebar sidebar-wrp">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <el-menu-item index="readme">
                <i class="fa fa-home" aria-hidden="true"></i> 主页
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="fa fa-tachometer" aria-hidden="true"></i> 统计
                </template>
                <el-menu-item index="stat-contract">借款合同</el-menu-item>
                <el-menu-item index="stat-repayment">还款计划</el-menu-item>
                <el-menu-item index="stat-returned">回款计划</el-menu-item>
                <el-menu-item index="stat-credit">授信查询</el-menu-item>
                <el-menu-item index="stat-info">客户信息</el-menu-item>
                <el-menu-item index="stat-invest">投资记录</el-menu-item>
                <el-menu-item index="stat-operate">运营数据</el-menu-item>
            </el-submenu>
            <!--<el-submenu index="3">-->
                <!--<template slot="title"><i class="el-icon-date"></i> 表单</template>-->
                <!--<el-menu-item index="baseform">基本表单</el-menu-item>-->
                <!--<el-menu-item index="vueeditor">编辑器</el-menu-item>-->
                <!--<el-menu-item index="markdown">markdown</el-menu-item>-->
                <!--<el-menu-item index="upload">文件上传</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="4">-->
                <!--<template slot="title"><i class="el-icon-star-on"></i> 图表</template>-->
                <!--<el-menu-item index="basecharts">基础图表</el-menu-item>-->
                <!--<el-menu-item index="mixcharts">混合图表</el-menu-item>-->
            <!--</el-submenu>-->
        </el-menu>
    </div>
</template>
<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style lang="scss">
    @import "../../scss/com/sidebar.scss";
</style>