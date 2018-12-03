<template>
    <div class="carpic_wrap">
        <div class="bigimg">
            <Bigimg></Bigimg>
        </div>
         
        <div class="rightpart">
            <div class="carinfo">
                <Carinfo></Carinfo>
            </div>
            <div class="choosealbum">
                <Choosealbum></Choosealbum>
            </div>
            <div class="smallpicnav">
                <Smallpicnav></Smallpicnav>
            </div>
        </div>

      
    </div>
</template>

<script>
    import Bigimg from "./Bigimg";
    import Choosealbum from "./Choosealbum";
    import Smallpicnav from "./Smallpicnav";
    import Carinfo from "./Carinfo";
   
    export default {
        //在组件创建之前，拉去信息
        beforeCreate() {
            //发出请求
            this.$store.dispatch("carpicStore/init" , {"id" : this.$route.params.id})
        },
        computed: {
            id(){
                return this.$route.params.id;
            }
        },
        //注册组件
        components : {
            Bigimg,Choosealbum,Smallpicnav,Carinfo 
        },
        mounted() {
             
        }
    }
</script>

<style scoped lang="less">
    .carpic_wrap{
        position: absolute;
        width: 100%;
        height:100%;
        min-height: 600px;
        background:black;
        top:0;
        left:0;
        color:white;
        box-sizing:border-box;
        padding-right:320px;

        .rightpart{
            position: absolute;
            right:0;
            top: 0;
            width:320px;
            height:100%;
            border-left:1px solid #888;
            box-sizing:border-box;
            padding:10px;

            &>div{
                overflow: hidden;
                margin-bottom:20px;
                clear:both;
            }
        }
    }
</style>