<template>
  <div class="home_con">

    <div class="home_hy">
      <div class="home_hy_con">
        <div class="w30">
          <div class="hy_con_padd">
            <table width="100%" border="0" bgcolor="#FFFFFF">
              <tbody><tr>
                <td rowspan="3" align="center" bgcolor="#F9FAFC" width="77px;"><img src="http://www.bjcmh999.com/yimaotheme/img/l4.png" alt=""></td>
                <td>账号： cbxsx74102 </td>
                <td>状态： <span style="color:#707070">已激活</span> </td>
              </tr>
              <tr>
                <td>昵称： 徐士学 </td>
                <td>级别： 普通会员 </td>
              </tr>
              <tr>
                <td colspan="2">注册日期： 2017-02-25</td>
              </tr>
              </tbody></table>
          </div>
        </div>
        <div class="w30">
          <div class="hy_con_padd">
            <table width="100%" border="0" bgcolor="#FFFFFF">
              <tbody><tr>
                <td rowspan="3" align="center" bgcolor="#F9FAFC" width="77px;"><img src="http://www.bjcmh999.com/yimaotheme/img/l4.png" alt=""></td>
                <td>未阅邮件： 0</td>
              </tr>
              <tr>
                <td>直推数： 1 </td>
              </tr>
              <tr>
                <td>推荐人：cbxsx7410</td>
              </tr>
              </tbody></table>
          </div>
        </div>
        <div class="w30">
          <div class="hy_con_padd">
            <table width="100%" border="0" bgcolor="#FFFFFF">
              <tbody><tr>
                <td rowspan="3" align="center" bgcolor="#F9FAFC" width="77px;"><img src="http://www.bjcmh999.com/yimaotheme/img/l4.png" alt=""></td>
                <td colspan="2">总奖金： 180</td>
              </tr>
              <tr>
                <td>奖金积分： 0</td>
                <td>注册积分： 100</td>
              </tr>
              <tr>
                <td colspan="2">团购积分： 0</td>
              </tr>
              </tbody></table>
          </div>
        </div>
      </div>
    </div>
    <div class="home_news">
      <div class="home_news_padd">
        <div class="home_news_con">
          <div class="tit">
            <span>新闻公告</span>
            <a href="http://www.bjcmh999.com/home.php?yim=newslist" class="fr">更多&gt;&gt;</a>
          </div>
          <div class="bg_w">
            <div class="in_news">
              <ul>

                <li>
                  <span class="hint">[公告]</span>
                  <a href="http://www.bjcmh999.com/home.php?yim=newsview&amp;veid=36"> &#8203;新会员须知（非常重要，一定要看）</a>
                  <span class="time">2016-06-11</span>
                </li>

                <li>
                  <span class="hint">[公告]</span>
                  <a href="http://www.bjcmh999.com/home.php?yim=newsview&amp;veid=35"> 报单中心须知</a>
                  <span class="time">2016-05-09</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
    @import "src/scss/pages/index/index.scss";
</style>
