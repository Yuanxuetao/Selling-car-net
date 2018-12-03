<template>
    <div class="wrap_bi">
        <div class="inner">
            <div class="picbox" ref="picbox">
                <!-- 图片 -->
                <img ref="img" class="img">
                <!-- loading图 -->
                <img src="/images/loading.svg" ref="loadinggif" class="loadinggif">
                <!-- 两个按钮 -->
                <div class="leftBtn"  @click="goPrev()"></div>
                <div class="rightBtn" @click="goNext()"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed : {
            id(){
                return this.$route.params.id;
            },
            //当前的图集名字
            nowAlbum(){
                return this.$store.state.carpicStore.nowAlbum;
            },
            nowIdx(){
                return this.$store.state.carpicStore.nowIdx;
            },
            carinfo(){
                return this.$store.state.carpicStore.carinfo;
            }
        },
        mounted() {
            //监听窗口改变尺寸
            window.addEventListener("resize" , this.setMargin ,true);
        },
        //当组件下树的时候去掉监听
        destroyed() {
            window.removeEventListener("resize" ,  this.setMargin ,true);
        },
        methods : {
            //下一张
            goNext(){
                this.$store.dispatch("carpicStore/goNext");
            },
            //上一张
            goPrev(){
                this.$store.dispatch("carpicStore/goPrev");
            },
            changePic() {
                //小图地址
                const SMALLPICURL = `http://127.0.0.1:3000/images/carimages_small/${this.id}/${this.nowAlbum}/${this.carinfo.images[this.nowAlbum][this.nowIdx]}`;

                //大图地址
                const BIGPICURL = `http://127.0.0.1:3000/images/carimages/${this.id}/${this.nowAlbum}/${this.carinfo.images[this.nowAlbum][this.nowIdx]}`;


                //隐藏图片
                this.$refs.img.style.display = "none";
                //显示gif图
                this.$refs.loadinggif.style.display = "block";

                // 创建小图的虚拟对象
                var smallimg = new Image();
                //对小图的请求
                smallimg.src = SMALLPICURL;
                // 创建大图的虚拟对象
                var bigimg = new Image();
                //请求地址
                bigimg.src = BIGPICURL;

                //备份
                var self = this;
                //监听小图加载完毕
                smallimg.onload = function(){
                    //显示图片
                    self.$refs.img.style.display = "block";
                    //让图片显示为小图
                    self.$refs.img.src = SMALLPICURL;
                    //隐藏loading的gif图
                    self.$refs.loadinggif.style.display = "none";
                }
                //监听大图加载完毕
                bigimg.onload = function(){
                    //图片加载完毕
                    self.$refs.img.src = bigimg.src;
                    //设置负marign 
                    self.setMargin();
                }
            },
            setMargin(){
                //拉回自己的一半
                var imgW = (document.documentElement.clientWidth - 320) * 0.9;
                this.$refs.picbox.style.width = imgW+ 'px';
                this.$refs.picbox.style.marginLeft = -imgW / 2 + 'px';
                //高度已经自动变化了，img就有这个特点，改变width，高度就会变化。
                var imgH = parseInt(getComputedStyle(this.$refs.img)["height"]);
                this.$refs.picbox.style.marginTop = -imgH / 2 + 'px';
            }
        },
        watch : {
            nowIdx(){
                this.changePic();
            },
            nowAlbum(){
                this.changePic();
            },
            carinfo(){
                this.changePic();
            }
        }
    }
</script>

<style scoped lang="less">
    .wrap_bi{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        padding-right:320px;
        
        .inner{
            position: relative;
            height:100%;

            .picbox{
                position: absolute;
                left:50%;
                top: 50%;
                height:100%;

                .img{
                    width: 100%;
                    max-width:600px;
                    max-width:400px;
                }

                .loadinggif{
                    position: absolute;
                    width:100px;
                    height:100px;
                    left:50%;
                    top:30%;
                    margin-left:-50px;
                    margin-top:-50px;
                }
                .leftBtn{
                    position: absolute;
                    width:50%;
                    height:100%;
                    left:0;
                    top:0;
                    cursor: url(/images/cursor_left.cur),auto;
                }
                .rightBtn{
                    position: absolute;
                    width:50%;
                    height:100%;
                    right:0;
                    top:0;
                    cursor: url(/images/cursor_right.cur),auto;
                }
            }
        }
    }
</style>