<template>
  <div class="bg_w">
    <el-form>
      <el-form-item>
        <el-button type="primary"  class="pull-right" @click.native="bankVisible = true" icon="plus">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
            :data="list"
            style="width: 100%">
      <el-table-column
              prop="id"
              label="序号"
              width="180">
      </el-table-column>
      <el-table-column
              prop="receiveId"
              label="收件人"
              width="180">
      </el-table-column>
      <el-table-column
              prop="title"
              label="标题">
      </el-table-column>
      <el-table-column
              label="时间">
        <template scope="scope">
          <span>{{ scope.row.createTime | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="status"
              label="状态">
      </el-table-column>
      <el-table-column
              label="操作">
        <template scope="scope">
          <span>{{ scope.row.createTime | dateFormat }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加银行卡" :visible.sync="bankVisible" size="tiny" label-width="100px">
      <el-form :model="bank">
        <el-form-item label="银行名称">
          <el-select v-model="bank.bankName" placeholder="请选择银行">
            <el-option  label="请选择银行" value="null"></el-option>
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
    data () {
      return {
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
              let url         = Vue.debugUrl + '/email/sendList'

              var reqData     = {
                  userId:auth.getUser().id
              }
              Object.assign(reqData,that.bank)

              util.dataClear(reqData)


              that.$http.post(url,reqData).then(function (res) {
                  if(res.body.msg == "ok") {
                      that.list.push(res.body.data)
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
        let url         = Vue.debugUrl + '/email/sendList'

        var reqData     = { }

        that.$http && that.$http.post(url,reqData).then(function (res) {
            if(res.body.msg == "ok") {
                let data            = res.body.data
                Object.assign(that,data)
            }
        });
    }
  }
</script>

<style lang="scss">
    @import "src/scss/pages/user/bank.scss";
</style>
