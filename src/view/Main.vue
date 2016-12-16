<template>
    <div id="main">
        <!--<nav-bar :show="true"></nav-bar>-->
        <router-view></router-view>
        <!--<footer-bar></footer-bar>-->
    </div>
</template>

<style>

</style>

<script>
//    import navBar    from  './Navbar.vue';
//    import footerBar from  './FooterBar.vue';

    export  default{
        replace: true,
        name:"Main",
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
