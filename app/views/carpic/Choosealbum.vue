<template>
    <div>
        <div class="ca_wrap" v-if="carinfo.images">
            <ul>
                <li v-for="item in arr" :class="{'cur' : nowAlbum == item.english}" @click="changeNowAlbum(item.english)">
                    {{item.chinese}}（{{carinfo.images[item.english].length}}）
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                arr : [
                    {
                        "chinese" : "外观",
                        "english" : "view"
                    },
                    {
                        "chinese" : "内饰",
                        "english" : "inner"
                    },
                    {
                        "chinese" : "结构及发动机",
                        "english" : "engine"
                    },
                    {
                        "chinese" : "更多细节",
                        "english" : "more"
                    }
                ]
            }
        },
        computed : {
            //汽车信息
            carinfo(){
                return this.$store.state.carpicStore.carinfo;
            },
            //当前的图集名字
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum;
            }
        },
        //动作
        methods : {
            //改变相册
            changeNowAlbum(nowAlbum){
                this.$store.dispatch("carpicStore/changeNowAlbum" , {nowAlbum});
            }
        }
    }
</script>

<style scoped lang="less">
    .ca_wrap{
        ul{
            list-style:none;

            li{
                float: left;
                width:140px;
                height:40px;
                background:#eee;
                box-sizing:border-box;
                margin-right:6px;
                margin-bottom:6px;
                color:black;
                text-align: center;
                line-height: 40px;
                font-size:16px;
                cursor: pointer;

                &.cur{
                    background: gold;
                }
            }
        }
    }
</style>