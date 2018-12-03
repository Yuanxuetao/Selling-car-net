<template>
    <div class="ca_wrap">
        <router-link :to="{'name':'carpic' , 'params' : {'id' : row.id}}">
            <img width="100%" :src="`http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar}`" alt="">
        </router-link>
  
        <span v-if="!isInCompare" class="jrdb" @click="addToCompare">加入对比</span>
        <span v-if="isInCompare" class="db">已加入对比</span>
        <span v-if="isInCompare" class="db2" @click="delCompare">取消对比</span>
    </div>
</template>

<script>
    export default {
        props : ["row"],
        data(){
            return {
                isInCompare : false
            }
        },
        created(){
            //当显示头像的时候，判断自己是否在对比队列中 
            this.setIn();
        },
        methods : {
            //加入对比队列
            addToCompare(){
                if(this.getCompareArr.length < 4){
                    this.$store.commit("rightbarStore/addComparedArrCar" , {"carinfo" : this.row})
                    this.$Message.info("加入对比成功");
                }else{
                    this.$Message.error("最多对比5辆车");
                }
            },
            delCompare(){
                this.$Message.info("取消对比成功");
                this.$store.commit("rightbarStore/delComparedArrCar" , {"id" : this.row.id})
            },
            //设置是否在对比
            setIn(){
                //计算自己是不是已经在队列中的
                for(let i = 0 ; i < this.getCompareArr.length ; i++){
                    if(this.getCompareArr[i].id == this.row.id){
                        this.isInCompare = true;
                        return;
                    }
                }
                this.isInCompare = false;
            }
        },
        computed : {
            //从全局要对比队列
            getCompareArr(){
                
                return this.$store.state.rightbarStore.comparedArr;
            }
        },
        watch : {
            //监控对比队列的改变
            getCompareArr(){
                this.setIn();
            }
        }
    }
</script>

<style scoped lang="less">
    .ca_wrap{
        position: relative;

        span.jrdb{
            display: none;
            position: absolute;
            right:0;
            top:0;
            width:70px;
            height:20px;
            background:orange;
            text-align: center;
            color:white;
            cursor: pointer;
        }

        span.db{
            position: absolute;
            right:0;
            top:0;
            width:70px;
            height:20px;
            background:red;
            text-align: center;
            color:white;
            cursor: pointer;
        }

        span.db2{
            display: none;
            position: absolute;
            right:0;
            top:0;
            width:70px;
            height:20px;
            background:green;
            text-align: center;
            color:white;
            cursor: pointer;
        }

        &:hover span.jrdb{
            display: block;
        }

        &:hover span.db{
            display: none;
        }

        &:hover span.db2{
            display: block;
        }
    }
</style>