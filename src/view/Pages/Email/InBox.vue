<template>
  <div class="bg_w">
    <!--<el-form>-->
      <!--<el-form-item>-->
        <!--<el-button type="primary"  class="pull-right" @click.native="bankVisible = true" icon="plus">添加</el-button>-->
      <!--</el-form-item>-->
    <!--</el-form>-->

    <el-table
            :data="list"
            style="width: 100%">
      <el-table-column
              prop="id"
              label="序号"
              width="180">
      </el-table-column>
      <el-table-column
              prop="sendId"
              label="发件人"
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
        <template scope="scope">
          <span>{{ scope.row.status | emailStatusFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="操作">
        <template scope="scope">
          <a @click="doDetail(scope.row)" href="javascript:(0)">查看</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-box">
      <span v-if="startRow" class="pull-left">显示{{startRow}}-{{endRow}} 总共有{{total}}条目</span>
      <div class="pagination pull-right">
        <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="detail.title" :visible.sync="bankVisible">
      <el-form :model="bank">
        <el-form-item>
          <p>{{detail.content}}</p>
        </el-form-item>
        <!--<el-form-item lable="开户行">-->
          <!--<el-input v-model="bank.nickName" placeholder="请输入开户行"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="回复">
          <el-input type="textarea" v-model="bank.remark" placeholder="回复"></el-input>
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
          pageNum:1,
          detail:{

          }
      }
    },
    methods:{
          showDialog(){
              this.bankVisible = true
              console.log("hh",this.bankVisible)
          },
          doAdd(){
              let that        = this
              let url         = Vue.debugUrl + '/email/inList'

              var reqData     = {
                  receiveId:auth.getUser().id
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
          },
          handleCurrentChange(val) {
              this.pageNum = val
              this.doSearch()
          },
          doSearch(){
              let that        = this
              let url         = Vue.debugUrl + '/email/inList'

              var reqData     = {
                  receiveId:auth.getUser().id,
                  pageSize:10,
                  pageNum:that.pageNum
              }

              that.$http && that.$http.post(url,reqData).then(function (res) {
                  if(res.body.msg == "ok") {
                      let data            = res.body.data
                      Object.assign(that,data)
                  }
              });
          },
          doDetail(item){
              let that          = this
              that.bankVisible  = true
              Object.assign(that.detail,item)
              if(item.status == 0){
                  that.doView(item)
              }
          },
          doView(item){
              let that        = this
              let url         = Vue.debugUrl + '/email/doView'

              var reqData     = {
                  id:item.id,
              }

              that.$http && that.$http.post(url,reqData).then(function (res) {
                  if(res.body.msg == "ok") {
                      item.status = "1"
                  }
              });

          }
    },
      created:function () {
        let that        = this
        let url         = Vue.debugUrl + '/email/inList'

        console.log(auth.getUser().id)

        var reqData     = {
            receiveId:auth.getUser().id,
            pageSize:10,
            pageNum:that.pageNum
        }

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
