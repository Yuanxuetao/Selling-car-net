<template>
    <div>
        <div v-if="isLoaded">

            <div :style="{'width':w + 'px' , 'height' : h + 'px' , 'background' : `url(${picurl})` , 'background-size' : 'contain' , 'background-repeat' : 'no-repeat' , 'background-position' :'center center'}"></div>
        </div>
        <div v-else class="loadingbox" :style="{'width':w + 'px' , 'height' : h + 'px' , 'position' : 'relative' , 'line-height' : h + 'px'}">
            <img :style="{'width':w / 2 + 'px'}" src="/images/loading.svg" >
        </div>
    </div>
</template>

<script>
    export default {
        props : ["picurl" , "w" , "h"],
        data(){
            return {
                isLoaded : false
            }
        },
        //组件加载完毕，调用自己的函数
        created(){
            this.loadPic();
        },
        methods : {
            //加载图片
            loadPic(){
                //创建一个图片对象，Image，这是JavaScript内置的对象
                var img = new Image();
                //发出请求
                img.src = this.picurl;
                //监听是否加载完毕
                var self = this;
                img.onload = function(){
                    self.isLoaded = true;
                }
            }
        },
        watch : {
            //当picurl改变的时候
            picurl(){
                this.isLoaded = false;
                //加载图片
                this.loadPic();
            }
        }
    }
</script>

<style scoped lang="less">
    .loadingbox{
        text-align: center;
    }
</style>