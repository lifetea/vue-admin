<template>
  <div class="home_news">
    <div class="home_news_padd">
      <el-form>
        <el-form-item>
          <el-button type="text"  class="pull-right" @click.native="back" >返回</el-button>
        </el-form-item>
      </el-form>
      <div class="home_news_con">
        <div class="bg_w">
          <div class="pxzx_tit">
            <span>{{news.title}}</span>
          </div>
          <div class="pxzx_fbr">
            <span class="pull-left">发布人：</span>
            <span class="pull-right">点击数： 18   发布时间：2017-05-18 15:32:32 </span>
          </div>
          <div class="pxzx_con" >
            <div v-html="news.content"></div>
          </div>
        </div>
      </div>
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
        news:{
            content:"",
            type:null,
            title:null
        },
      }
    },
    methods:{
        doSave(){
            let that        = this
            let url         = Vue.debugUrl + '/news/add'
            var reqData     = {
                userId:auth.getUser().id,
            }

            Object.assign(reqData,that.news)
            util.dataClear(reqData)

            that.$http.post(url,reqData).then(function (res) {
                if(res.body.msg == "ok") {
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                    });
                    util.dataReset(that.news)
                }
            });
        },
        back(){
            this.$router.go(-1)
        }
    },
    created:function () {
        let that        = this
        let newsId      = this.$route.query.newsId
        let url         = Vue.debugUrl + '/news/detail'


        var reqData     = {
            newsId:newsId
        }

        that.$http && that.$http.post(url,reqData).then(function (res) {
            if(res.body.msg == "ok") {
                that.news            = res.body.data
            }
        });
    }
  }
</script>

<style lang="scss">
    @import "src/scss/pages/news/detail.scss";
</style>
