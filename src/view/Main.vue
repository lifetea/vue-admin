<template>
    <div id="app">
        <!--<nav-bar :show="true"></nav-bar>-->
        <!--<router-view></router-view>-->
        <!--<footer-bar></footer-bar>-->
    </div>
</template>

<style rel="stylesheet/scss">
    html,body,#app{
        height: 100%;
    }
    img{
        border-style:none;
    }
    .app-content {
        padding: 20px;
    }

    .animated {
        animation-duration: .377s;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    .clear-fix:after{
        content:".";
        display:block;
        height:0;
        clear:both;
        visibility:hidden
    }
    .clear-fix{
        *+height:1%;
        overflow: hidden;
    }
    .center{
        text-align: center;
    }

    .cert-dark{
        background-color: #656565;
        color: white;
    }
    .cert-success{
        background-color: #00d1b2;
        color: white;
    }
    .cert-ing{
        background-color: #23d160;
        color: white;
    }
    .cert-fail{
        background-color: #ff3860;
        color: white;
    }
    .cert-author{
        background-color: #20b7ff;
        color: white;
    }
</style>

<script>
//    import navBar    from  './Navbar.vue';
//    import footerBar from  './FooterBar.vue';

    export  default{
        replace: true,
        name:"App",
        data() {
            return {
                msg: 'Hello Vue!'
            }
        },
        components:{
//            'nav-bar'    : navBar,
//            'footer-bar' : footerBar,
        }
    }
</script>
