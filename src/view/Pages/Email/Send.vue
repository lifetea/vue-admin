<template>
  <div class="user-info bg_w">
    <div class="wrap">
      <el-form :model="email" label-width="100px" class="demo-ruleForm">
               <!--:rules="rules" -->
               <!--ref="ruleForm" -->
        <el-form-item label="类型">
          <el-radio class="radio" v-model="email.type" label="1">普通用户</el-radio>
          <el-radio class="radio" v-model="email.type" label="2">管理员</el-radio>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="email.receiveId" placeholder="请输入收件人ID"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="email.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea" v-model="email.content" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="doSave">提交</el-button>
          <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import auth from 'src/js/auth.js'
  import util from 'src/js/util'
  export default {
      name:'Index',
  //注册组件：Message方便使用
    components: {
//        Message
    },
    data () {
      return {
        email:{
            type:"1"
        }
      }
    },
    methods:{
          doSave(){
              let that        = this
              let url         = Vue.debugUrl + '/email/send'
              var reqData     = {
                  sendId:auth.getUser().id,
              }

              Object.assign(reqData,that.email)
              util.dataClear(reqData)

              that.$http.post(url,reqData).then(function (res) {
                  if(res.body.msg == "ok") {
                      this.$notify({
                          title: '成功',
                          message: '发送成功',
                          type: 'success'
                      });
                  }
              });
          }
    }
  }
</script>

<style lang="scss">
    @import "src/scss/pages/user/info.scss";
</style>
