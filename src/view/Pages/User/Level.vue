<template>
  <div class="home_news_con">
    <div class="tit r_button">
      <span>升级中心</span>
    </div>
    <div class="wdyj">您当前级别是：<span class="regc">普通会员</span>，注册积分帐户余额：<span class="regc">100</span></div>
    <div class="bg_w">
      <table class="email_con" border="0" cellpadding="0" cellspacing="1" width="100%">
        <tbody>
        <tr style="background: #F4F5F9;">
          <td>级别</td>
          <td>金额</td>
          <td>操作</td>
        </tr>
        <form action="control.php" method="post"></form><input type="hidden" name="act" value="uplevel"><input type="hidden" name="uplevel" value="0">
        <tr><td style="line-height:45px;height:45px">普通会员</td>
          <td style="color:#f00">500</td>
          <td>
            <input type="submit" name="" value="升级" onclick="return boxcheck('系统将会扣您的 0 注册积分帐户,您确定要升级吗?','升级正在执行中,请耐心等待！');" style="line-height:42px;height:42px;width:60px;text-decoration:line-through;color:#f00" disabled="disabled"></td>
        </tr>

        <form action="control.php" method="post"></form><input type="hidden" name="act" value="uplevel"><input type="hidden" name="uplevel" value="1">
        <tr><td style="line-height:45px;height:45px">初级服务中心</td>
          <td style="color:#f00">20000</td>
          <td>
            <input type="submit" name="" value="升级" onclick="alert('您的注册积分帐户余额为100.00，升级需要注册积分帐户19500！');return false;" style="line-height:42px;height:42px;width:60px;"></td>
        </tr>

        <form action="control.php" method="post"></form><input type="hidden" name="act" value="uplevel"><input type="hidden" name="uplevel" value="2">
        <tr><td style="line-height:45px;height:45px">高级服务中心</td>
          <td style="color:#f00">40000</td>
          <td>
            <input type="submit" name="" value="升级" onclick="alert('您的注册积分帐户余额为100.00，升级需要注册积分帐户39500！');return false;" style="line-height:42px;height:42px;width:60px;"></td>
        </tr>


        </tbody>
      </table>
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
            name:'徐士学'
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
