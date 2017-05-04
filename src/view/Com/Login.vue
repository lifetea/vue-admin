<template>
    <div class="login-wrap">
        <div class="ms-title">某系统</div>
        <div class="ms-login">
            <el-form :model="user" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="user.username" placeholder="帐号"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="user.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="14">
                        <el-input v-model="user.mobile" placeholder="手机"></el-input>
                    </el-col>
                    <el-col :span="8" :offset="2">
                        <el-input type="password" placeholder="验证码"></el-input>
                    </el-col>
                    <!--<el-col :span="12">-->
                        <!--<div class="code">-->
                            <!--<img height="36" alt="" src="https://passport.netease.im/czc/cregcp?&amp;t=1489112941457">-->
                        <!--</div>-->
                    <!--</el-col>-->
                </el-form-item>
                <!--<el-form-item>-->
                    <!--<el-input type="password" placeholder="手机验证码"></el-input>-->
                <!--</el-form-item>-->
                <div class="login-btn">
                    <el-button v-show="action == 'login'" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button v-show="action == 'register'" type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    <el-button v-show="action == 'find'" type="primary" @click="submitForm('ruleForm')">找回</el-button>
                </div>
                <p class="link-box">
                    <a class="pull-left" @click="doSwitch('register')" href="javascript:void(0)">注册</a>
                    <a class="pull-right" @click="doSwitch('find')" href="javascript:void(0)">找回密码</a>
                    <!--<a class="pull-right" @click="switch('find')" href="javascript:void(0)">找回密码</a>-->
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import auth from '../../js/auth.js'
    export default {
        data: function(){
            return {
                user: {
                    username: '',
                    mobile:'',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入帐号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                action:'register'
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        switch (self.action){
                            case 'login':
                                self.doLogin()
                            case 'register':
                                self.doRegister()
                            default:
                                self.doFindBack()
                        }
//                        auth.login();
                        //localStorage.setItem('ms_username',self.ruleForm.username);
                        //self.$router.push('/index');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            doSwitch(val){
                this.action = val
            },
            doLogin(){

            },
            doRegister(){
                let that        = this
                let url         = Vue.debugUrl + '/stat/outcomePlan/search'
                var reqData     = { }

                Object.assign(reqData,that.user)

                that.$http.get(url,reqData).then(function (res) {
                    if(res.body.msg == "OK") {
                        let data            = res.body.data
                        Object.assign(that,data)
                    }
                });
                console.log("登录")
            },
            doFindBack(){

            }
        }
    }
</script>

<style lang="scss">
    @import "../../scss/com/login.scss";
</style>

<!--<template>-->
    <!--<section class="app-main">-->
        <!--<div class="box login-wrap">-->
            <!--<p class="control has-icon">-->
                <!--<input class="input" v-model="account"  placeholder="用户名">-->
                <!--<i class="fa fa-user is-20"  aria-hidden="true"></i>-->
            <!--</p>-->
            <!--<p class="control has-icon">-->
                <!--<input class="input" v-model="password" type="password" placeholder="密码">-->
                <!--<i class="fa fa-lock is-20"  aria-hidden="true"></i>-->
            <!--</p>-->
            <!--<p class="control">-->
                <!--<button @click="doLogin" class="button is-success">-->
                    <!--登录-->
                <!--</button>-->
            <!--</p>-->
            <!--<p class="login-links">-->
                <!--<a href="" class="forget-pwd right">-->
                    <!--找回密码-->
                <!--</a>-->
            <!--</p>-->
        <!--</div>-->
    <!--</section>-->
<!--</template>-->
<!--<style type="text/scss">-->

<!--</style>-->
<!--<script>-->
<!--//    import auth      from  '../js/auth';-->
<!--//    let md5 = require('../js/md5')-->
    <!--export default{-->
        <!--name:'login',-->
        <!--'data':function(){-->
            <!--return{-->
                <!--msg:'hello vue',-->
                <!--account:"",-->
                <!--password:""-->
            <!--}-->
        <!--},-->
        <!--methods:{-->
            <!--doLogin:function () {-->
<!--//                var url         = V.debugUrl+'index/login';-->
<!--//-->
<!--//                var reqData     = {-->
<!--//                    userName: this.account,-->
<!--//                    password: md5(this.password)-->
<!--//                }-->
<!--//-->
<!--//                this.$http.post(url, reqData).then((response) => {-->
<!--//                    if(response.body.status == "SUCCEED"){-->
<!--//                        auth.login();-->
<!--//                        this.$router.replace("/index");-->
<!--//                    }-->
<!--//                }, (response) => {-->
<!--//                });-->


            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->
