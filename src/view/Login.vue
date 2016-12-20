<template>
    <section class="app-main">
        <div class="logo-wrap">
            <img src='../assets/login_logo.png'/>
        </div>
        <div class="box login-wrap">
            <p class="control has-icon">
                <input class="input" v-model="account"  placeholder="用户名">
                <i class="fa fa-user is-20"  aria-hidden="true"></i>
            </p>
            <p class="control has-icon">
                <input class="input" v-model="password" type="password" placeholder="密码">
                <i class="fa fa-lock is-20"  aria-hidden="true"></i>
            </p>
            <p class="control">
                <button  class="button is-success">
                    登录
                </button>
            </p>
            <p class="login-links">
                <a href="" class="forget-pwd right">
                    找回密码
                </a>
            </p>
        </div>
    </section>
</template>
<style lang="scss" scoped>
    @import "../scss/media-queries.scss";
    .app-main {
        transform: translate3d(0, 0, 0);
        padding-top: 6rem;
        @include mobile-only() {
            padding-bottom: 0;
        }
        @include desktop-only(){
            padding-top: 10rem;
        }
    }
    .logo-wrap{
        width: 14rem;
        margin: 0 auto;
        padding-bottom: 2rem;
        @include desktop-only(){
            width: 20rem;
        }
    }
    .login-wrap{
        width: 26rem;
        margin: 0 auto;
        @include mobile-only() {
            width: 20rem;
        }
        @include desktop-only(){
            padding:2rem 3rem;
        }
    }
    .control{
        height: 42px;
        margin:20px auto;
        width: 100%;
    }
    .input{
        height: 42px;
        text-indent: 10px;
        font-size: 14px;
        font-weight: 100;
    }
    .button{
        width: 100%;
        height: 42px;
        font-size: 17px;
        letter-spacing: 2rem;
        text-indent: 2rem;
    }
    .fa{
        margin: 4px;
    }
    .login-links{
        text-align: right;
    }
    .login-links a{
        color: #6c6c6c;
        font-size: 0.8rem;
    }
    .login-links a:hover{
        color: #006030;
    }
    .login-wrap .is-20 {
        font-size: 20px;
    }
</style>
<script>
    export default{
        'name':'Login',
        'data':function(){
            return{
                msg:'this is login',
                account:"",
                password:""
            }
        },
    }
</script>
