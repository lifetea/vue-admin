<template>
  <div class="bg_w">
    <el-button type="primary"  class="pull-right" @click.native="bankVisible = true" icon="plus">添加</el-button>
    <el-table
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="date"
              label="日期"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="姓名"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
    </el-table>

    <el-dialog title="添加银行卡" :visible.sync="bankVisible" size="tiny" label-width="100px">
      <el-form :model="bank">
        <el-form-item label="银行名称">
          <el-select v-model="bank.bankName" placeholder="请选择银行">
            <el-option  label="中国工商银行" value="中国工商银行"></el-option>
            <el-option  label="中国农业银行" value="中国农业银行"></el-option>
            <el-option  label="中国建设银行" value="中国建设银行"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item lable="银行卡号">
          <el-input v-model="bank.cardNo" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item lable="开户行">
          <el-input v-model="bank.nickName" placeholder="请输入开户行"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="bank.remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="bankVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="doAdd">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import util from "src/js/util"
  import auth from "src/js/auth"
  export default {
      name:'Index',
  //注册组件：Message方便使用
    components: {
//        Message
    },
    data () {
      return {
          tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
          }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
          }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
          }],
          list:[],
          bank:{
            bankName:null,
          },
          bankVisible:false,
      }
    },
    methods:{
          showDialog(){
              this.bankVisible = true
              console.log("hh",this.bankVisible)
          },
          doAdd(){
              let that        = this
              let url         = Vue.debugUrl + '/bank/add'

              var reqData     = {
                  userId:auth.getUser().id
              }
              Object.assign(reqData,that.bank)

              util.dataClear(reqData)



              that.$http.post(url,reqData).then(function (res) {
                  if(res.body.msg == "ok") {
                      this.$notify({
                          title: '成功',
                          message: '添加成功',
                          type: 'success'
                      });
                      that.bankVisible = false
                  }
              });
          }
    },
      created:function () {
        let that        = this
        let url         = Vue.debugUrl + '/bank/list'

        var reqData     = { }

        that.$http.post(url,reqData).then(function (res) {
            if(res.body.msg == "ok") {
                let data            = res.body.data
                Object.assign(that,data)
            }
        });
    }
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
    @import "src/scss/pages/user/bank.scss";
</style>
