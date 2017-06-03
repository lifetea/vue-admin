<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row class="layout-wrp" type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu @on-select="menuSelected" active-name.sync="index" theme="light" width="auto">
                    <div class="layout-logo-left"></div>
                    <template v-for="menu in menus">
                        <Menu-item v-if="!menu.children" :name="menu.index">
                            <router-link class="link" :to="menu.path">
                                <Icon :type="menu.icon" :size="iconSize"></Icon>
                                <span class="layout-text">{{menu.name}}</span>
                            </router-link>
                        </Menu-item>
                        <Submenu v-if="!!menu.children">
                            <template slot="title">
                                <Icon :type="menu.icon" :size="iconSize"></Icon>
                                <span class="layout-text">{{menu.name}}</span>
                            </template>
                            <template v-for="subMenu in menu.children">
                                <Menu-item  :name="subMenu.index">
                                    <router-link class="link" :to="subMenu.path">
                                        <span class="link-text">{{subMenu.name}}</span>
                                    </router-link>
                                </Menu-item>
                            </template>
                        </Submenu>
                    </template>

                    <!--<Submenu name="5">-->
                        <!--<template slot="title">-->
                            <!--<Icon type="ios-analytics" :size="iconSize"></Icon>-->
                            <!--<span class="layout-text">市场团队</span>-->
                        <!--</template>-->
                        <!--<Menu-item name="5-1">选项 1</Menu-item>-->
                        <!--<Menu-item name="5-2">选项 2</Menu-item>-->
                    <!--</Submenu>-->
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click.native="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                    <div class="fr nav_fr pull-right">
                        <span>尊敬的会员：cbxsx7410</span>
                        <a href="index.php?u=out" onclick="return confirm('您确定要退出吗')">安全退出</a>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="index">首页</Breadcrumb-item>
                        <Breadcrumb-item v-if="!!lever.parent">{{lever.parent}}</Breadcrumb-item>
                        <Breadcrumb-item>{{lever.name}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <transition name="move" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </i-col>
        </Row>
    </div>
    <!--<div class="main-wrp">-->
        <!--&lt;!&ndash;<side-bar :show="config.sidebar"></side-bar>&ndash;&gt;-->
        <!--&lt;!&ndash;<section class="app-main" :class="{ appLeft: $store.state.config.sidebar}">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="container is-fluid is-marginless app-content">&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<levelbar></levelbar>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<router-view></router-view>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</section>&ndash;&gt;-->
        <!--<v-head></v-head>-->
        <!--<div class="layout-wrp">-->
            <!--<v-sidebar></v-sidebar>-->
            <!--<div class="layout-content">-->
                <!--<transition name="move" mode="out-in">-->
                    <!--<router-view></router-view>-->
                <!--</transition>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
</template>
<style lang="scss">
    @import "../../scss/com/layout.scss";
</style>
<script>
    import vHead        from  './Header.vue'
    import vSidebar     from  './Sidebar.vue';


    import {list}       from  'src/js/router'
//    import Levelbar from './Levelbar.vue'
    export default{
        name:"Layout",
        data:function(){
            return{
                spanLeft: 4,
                spanRight: 20,
                menus:list,
                lever:{
                    parent:"",
                    name:'',
                }
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 4) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                }
            },
            menuSelected:function (val) {
                let lever = this.lever
                list.forEach((ele,index)=>{
                    if(!!ele.children){
                        let menus = ele.children
                        menus.forEach((menu,i)=>{
                            if(menu.index == val){
                                lever.name = menu.name
                                lever.parent = ele.name
                            }
                        })
                    }else{
                        if(ele.index == val){
                            lever.name = ele.name
                            lever.parent = null
                        }
                    }
                })
                console.log(val)
            }
        },
        components:{
            'v-head'   : vHead,
            'v-sidebar'  :vSidebar
        }
    }
</script>
