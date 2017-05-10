<template>
  <div class="user-info bg_w">
    <div class="wrap">
      <el-form :model="user" label-width="100px" class="demo-ruleForm">
               <!--:rules="rules" -->
               <!--ref="ruleForm" -->
        <el-form-item label="原密码" prop="name">
          <el-input type="password" v-model="prePwd" placeholder="原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="password" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input type="password" v-model="checkPwd" placeholder="确认新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click.native="doSave">提交</el-button>
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
        prePwd:"",
        password:'',
        checkPwd:''
      }
    },
    methods:{
          doSave(){
              let that        = this
              let url         = Vue.debugUrl + '/user/updatePwd'

              var reqData     = {
                  id:auth.getUser().id,
                  password:that.password,
                  prePwd:that.prePwd
              }

              that.$http.post(url,reqData).then(function (res) {
                  if(res.body.msg == "ok") {
                      this.$notify({
                          title: '成功',
                          message: '更新成功',
                          type: 'success'
                      });
                  }else {
                      this.$notify.error({
                          title: '错误',
                          message: res.body.msg
                      });
                  }
                  that.prePwd = ""
                  that.password = ""
                  that.checkPwd = ""

              });
          }
    },
//    ready:function () {
//        let that        = this
//        let url         = Vue.debugUrl + '/user/userInfo'
//
//        var reqData     = { }
//
//        Object.assign(reqData,that.user)
//
//        util.dataClear(reqData)
//
//        that.$http.post(url,reqData).then(function (res) {
//            if(res.body.msg == "ok") {
//                that.user = res.body.data
//                auth.setUser(res.body.data)
//            }
//        });
//    }
  }
</script>

<style lang="scss">
    @import "src/scss/pages/user/info.scss";
</style>
