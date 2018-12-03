<template>
    <div>
        <table>
            <tr v-for="item in ziduanname" :key="item">
                <td>{{item.c}}</Col>
                <td v-for="i in comparedArr.length" :key="i">
                    <div v-if="item.e == 'avatar'">
                        <img :src="`http://127.0.0.1:3000/images/carimages_small/${comparedArr[i - 1]['id']}/view/${comparedArr[i - 1]['avatar']}`">
                    </div>
                    <div v-else-if="item.e == 'buydate'">
                        {{comparedArr[i - 1]['buydate'] | getyearfromtimestamp(true)}}年
                    </div>
                    <div v-else>
                        {{comparedArr[i - 1][item.e]}}
                    </div>
                </td>
            </tr>
        </table>
        
    </div>
</template>

<script>
    export default {
        computed : {
            comparedArr(){
                return this.$store.state.rightbarStore.comparedArr;
            }
        },
        data(){
            return {
                ziduanname : [
                    {"e" : "avatar" , "c" : "预览图"},
                    {"e" : "id" , "c" : "id"},
                    {"e" : "brand" , "c" : "品牌"},
                    {"e" : "series" , "c" : "车系"},
                    {"e" : "color" , "c" : "颜色"},
                    {"e" : "price" , "c" : "价格"},
                    {"e" : "km" , "c" : "公里数"},
                    {"e" : "engine" , "c" : "发动机"},
                    {"e" : "buydate" , "c" : "购买日期"}
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    table,tr,td{
        border:1px solid orange;
    }
    table{
        width:100%;
        text-align: center;
    }
    td{
        line-height: 30px;
    }
</style>