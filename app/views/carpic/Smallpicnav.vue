<template>
    <div v-if="carinfo.images" @mouseleave="backtopage()">
        <div class="huoche" :style="{'left' : -300 * page + 'px'}">
            <ul v-for="i in totalPages" style="margin-bottom:20px;">
                <li v-for="j in 6"  v-if="getImgName(i,j)" :class="{'cur' : nowIdx == (i - 1) * 6 + (j - 1)}" @click="changeIdx((i - 1) * 6 + (j - 1))">
                    <Tutu :picurl="`http://127.0.0.1:3000/images/carimages_small/${id}/${nowAlbum}/${getImgName(i,j)}`" :w="140" :h="93"></Tutu>
                </li>
            </ul>
        </div>
        <div class="nav">
            <span v-for="i in totalPages" :style="{'width':290 / totalPages + 'px'}" @mouseenter="changePage(i - 1)" :class="{'cur' : page == i - 1}"></span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                page : 0
            }
        },
        computed : {
            //当前车的id
            id(){
                return this.$route.params.id;
            },
            //当前的图集名字
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum;
            },
            //当前序号
            nowIdx(){
                return this.$store.state.carpicStore.nowIdx;
            },
            //汽车信息
            carinfo(){
                return this.$store.state.carpicStore.carinfo;
            },
            //总页数
            totalPages(){
               return Math.ceil(this.carinfo.images[this.nowAlbum].length / 6);
            }
        },
        methods : {
            //得到i、j这个图片的图片名
            getImgName(i , j){
                return this.carinfo.images[this.nowAlbum][(i - 1) * 6 + (j - 1)];
            },
            //改变page
            changePage(n){
                this.page = n;
            },
            //回到page页，鼠标离开的事件监听
            backtopage(){
                this.page = parseInt(this.nowIdx / 6);
            },
            changeIdx(n){
                this.$store.commit("carpicStore/changeNowIdx" , {"nowIdx"  : n});
            }
        },
        watch : {
            //当全局的nowIdx变化的时候，要改变一下局部page。
            nowIdx(){
                this.page = parseInt(this.nowIdx / 6);
            }
        }
    }
</script>

<style scoped lang="less">
    .huoche {
        padding-top:30px;
        width:8000px;
        position: relative;
        transition:all 0.3s ease 0s;

        ul{
            list-style: none;
            float: left;
            width:300px;

            li{
                width:140px;
                height:93px;
                margin-right:6px;
                margin-bottom:6px;
                float: left;
                position: relative;

                &::before{
                    content:"";
                    position: absolute;
                    width:100%;
                    height: 100%;
                    background:black;
                    opacity:0.6;
                    transition:all 0.3s ease 0s;
                }

                &.cur::before{
                    opacity: 0;
                }

                img{
                    width:100%;
                    height:100%;
                }
            }
        }
       
    }
    .nav{
        width:290px;
        clear:both;

        span{
            float: left;
            height:10px;
            background:#eee;
            border-right:6px solid black;

            &::last-child{
                border-right:none;
            }

            &.cur{
                background:gold;
            }
        }
    }
</style>