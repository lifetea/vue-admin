<template>
    <div id="main">
        <router-view></router-view>
        <!--<footer-bar></footer-bar>-->
    </div>
</template>

<style lang="scss">
/*@import "../scss/rest.scss";*/
    @import "../scss/main.scss";
</style>

<script>
//    import footerBar from  './FooterBar.vue';

    export  default{
        replace:true,
        name:"Main",
        data() {
            return {
                msg: 'Hello Vue!'
            }
        },
        methods:{

        },
        components:{
//            'nav-bar'    : navBar,
//            'footer-bar' : footerBar,
        }
    }
</script>
