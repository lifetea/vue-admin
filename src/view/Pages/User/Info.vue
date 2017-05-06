<template>
  <div class="user-info bg_w">
    <div class="wrap">
      <el-form :model="user" label-width="100px" class="demo-ruleForm">
               <!--:rules="rules" -->
               <!--ref="ruleForm" -->
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="帐号">
              <p>{{user.account}}</p>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item label="级别">
              <p>{{user.level | levelFormat}}</p>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="注册日期">
              <p>{{user.createTime | dateFormat}}</p>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item label="开通日期">
              <p>{{user.activateTime | dateFormat}}</p>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="推荐人">
          <p>{{user.activeTime}}</p>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
          <p>{{user.activeTime}}</p>
        </el-form-item>
        <el-form-item label="车牌号码">
          <el-input v-model="user.carNo" placeholder="请输入车牌号码"></el-input>
          <p>{{user.activeTime}}</p>
        </el-form-item>
        <el-form-item label="收获地址">
          <el-input type="textarea" v-model="user.address" placeholder="请输入收获地址"></el-input>
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
        user:auth.getUser()
      }
    },
    methods:{
          doSave(){
              let that        = this
              let url         = Vue.debugUrl + '/user/updateInfo'

              var reqData     = {


              }

              Object.assign(reqData,that.user)
              reqData.createTime = null
              reqData.createTime = null
              util.dataClear(reqData)

              that.$http.post(url,reqData).then(function (res) {
                  if(res.body.msg == "ok") {
                      that.user = res.body.data
                      auth.setUser(res.body.data)
                      this.$notify({
                          title: '成功',
                          message: '更新成功',
                          type: 'success'
                      });
                  }
              });
          }
    },
    ready:function () {
        let that        = this
        let url         = Vue.debugUrl + '/user/userInfo'

        var reqData     = { }

        Object.assign(reqData,that.user)

        util.dataClear(reqData)

        that.$http.post(url,reqData).then(function (res) {
            if(res.body.msg == "ok") {
                that.user = res.body.data
                auth.setUser(res.body.data)
            }
        });
    }
  }
</script>

<style lang="scss">
    @import "src/scss/pages/user/info.scss";
</style>
