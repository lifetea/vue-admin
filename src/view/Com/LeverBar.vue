<template>
    <div class="crumbs-wrp">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>{{lever.p}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{lever.c}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
    export default{
        data(){
            return{
            }
        },
        props:{
            lever:{
                type:Object,
                default:{
                    p:'统计',
                    c:'借款合同'
                }
            }
        },
        components:{
        }
    }
</script>
<style lang="scss">
    @import "../../scss/com/leverbar.scss";
</style>