<template>
    <div class="rightbar">
        <div class="inner">
            <p @click="showComparedModal">
                <Badge :count="comparedArr.length">
                    <img src="/images/pk.svg" width="28">
                </Badge>
            </p>
            <p>
               <img src="/images/history.svg" width="28">
            </p>    
        </div>

        <Modal
            v-model="isShowComparedModal"
            title="对比车辆"
            @on-ok="ok"
            @on-cancel="cancel"
            width="800"
            ok-text="开始对比"
        >
            <Row>
                <Col v-for="item in comparedArr" :span="24 / comparedArr.length">
                    <img :src="`http://127.0.0.1:3000/images/carimages_small/${item.id}/view/${item.avatar}`" alt="">
                    <p>{{item.brand}}{{item.series}}{{item.color}}色{{item.price | sishewuru(0) }}万</p>
                    <Button @click="delCompare(item.id)">取消对比</Button>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isShowComparedModal : false
            }
        },
        methods : {
            ok(){
                this.$router.push({"name" : "compare"})
            },
            cancel(){

            },
            showComparedModal(){
                this.isShowComparedModal = true;
            },
            delCompare(id){
                this.$store.commit("rightbarStore/delComparedArrCar" , {"id" : id})
            }
        },
        computed : {
            comparedArr(){
                return this.$store.state.rightbarStore.comparedArr;
            }
        }
    }
</script>

<style scoped lang="less">
    .rightbar{
        position: fixed;
        width:38px;
        height:100%;
        background:#333;
        right:0;
        top:0;
        padding-left:4px;
        .inner{
            height:200px;
            position: absolute;
            bottom:60px;

            p{
                margin-bottom:10px;
            }

            img{
                cursor: pointer;
            }
        }
        
    }
</style>