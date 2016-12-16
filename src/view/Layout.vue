<template>
    <div>
        <section class="app-main">
            <div class="container">
                {{msg}}
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        name:"LayOut",
        data:function(){
            return{
                msg:'this is layout'
            }
        },
    }
</script>
