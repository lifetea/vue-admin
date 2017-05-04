<template>
  <div class="user-info bg_w">
    <div class="wrap">
      <el-form :model="user" label-width="100px" class="demo-ruleForm">
               <!--:rules="rules" -->
               <!--ref="ruleForm" -->
        <el-form-item label="帐号">
          <p>{{user.account}}</p>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <p>{{user.level}}</p>
        </el-form-item>
        <el-form-item label="注册日期">
          <p>{{user.createdTime}}</p>
        </el-form-item>
        <el-form-item label="开通日期">
          <p>{{user.createdTime}}</p>
        </el-form-item>
        <el-form-item label="推荐人">
          <p>{{user.activeTime}}</p>
        </el-form-item>

      </el-form>
      <form action="control.php" method="post">
        <div class="grzl">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>

            <tr>
              <td width="25%" align="right">级别：</td>
              <td>普通会员</td>
            </tr>

            <tr>
              <td width="25%" align="right">注册日期：</td>
              <td>2017-02-25</td>
            </tr>
            <tr>
              <td width="25%" align="right">开通日期：</td>
              <td>2017-02-25</td>
            </tr>
            <tr>
              <td width="25%" align="right">推荐人：</td>
              <td>cbxsx7410</td>
            </tr>
            <input type="hidden" name="ptd[]" value="rgmobile">                        <tr>
              <td width="25%" align="right">手机号码：</td>
              <td>
                <Input type="text" name="rgmobile" value="" class="reginput" maxlength="20"></Input>
              </td>
            </tr>
            <input type="hidden" name="ptd[]" value="rgaddress">                        <tr>
              <td width="25%" align="right">收货地址：</td>
              <td><input type="text" name="rgaddress" value="" class="reginput" maxlength="20">
              </td>
            </tr>
            <input type="hidden" name="ptd[]" value="rgfax">                        <tr>
              <td width="25%" align="right">车牌号码：</td>
              <td><input type="text" name="rgfax" value="" class="reginput" maxlength="20">
              </td>
            </tr>

            <tr>
              <td width="25%" align="right" style="height:50px;line-height:50px"></td>
              <td style="height:50px;line-height:50px" align="left"><input type="submit" value="修改" class="reg_button" style="margin:0px;"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
//Message功能-提示框，本网页中为黄色警告框。[刘]
//  import Message from 'vue-bulma-message'
  export default {
      name:'Index',
  //注册组件：Message方便使用
    components: {
//        Message
    },
    data () {
      return {
        data: [300, 50, 100,50],
        totalDoctorCount:0,
        balanceDate:1,
        //如果没有读取到数据，直接默认为0[刘]
        Num:{
          userNum: 0,
          newUserNum: 0,
          newDoctorNum: 0,
          doctorNum: 0,
        },
        user:{
            name:'徐士学',
            account:"cbxsx74102",
            level:'普通会员',
            createdTime:'2017-02-25',
            activeTime:'2017-02-25',
            referrer:''
        }
      }
    },
//    computed: {
//        monthClosingHint:function () {
//            let balanceDate = this.balanceDate
//            return `结算日期已设定为本月${balanceDate}号,请及时操作!`
//        }
//    },
//    //进入页面便开始通过create方法得到接口链接numsUrl[刘]
//    created:function () {
//      let that            = this
//      var numsUrl         = V.debugUrl+'statisticsAdmin/userAndDoctorCount';
//      var numReqData      = {
//        pageSize:30
//      };
//      //链接接口，如果返回SUCCEED，就得到res.body.date内容，赋值给Num[刘]
//      this.$http.get(numsUrl,{params:numReqData}).then(function (res) {
//        if(res.body.status == "SUCCEED") {
//          this.Num = res.body.data;
//        }
//      });
//      //得到结算日期中值[刘]
//      var closingHintUrl = V.debugUrl+'systemSettingAdmin/queryMonthClosingHintSetting';
//
//      this.$http.get(closingHintUrl).then(function (res) {
//          if(res.body.status == "SUCCEED") {
//              that.balanceDate = res.body.data.value;
//          }
//      });
//    },
  }
</script>

<style lang="scss">
    @import "src/scss/pages/user/info.scss";
</style>
