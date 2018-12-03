<template>
    <div>
        <div class="picwrap" :style="{'width':picW + 'px' , 'height' : picH + 'px'}">
            <img 
                :src="`http://127.0.0.1:3000/${picurl}`" 
                :style="{'width':picW + 'px' , 'height' : picH + 'px'}"
            >

            <!-- 裁图框 -->
            <div ref="cut_rect" class="cut_rect">
                <img 
                    :src="`http://127.0.0.1:3000/${picurl}`" 
                    :style="{'width':picW + 'px' , 'height' : picH + 'px' , 'left' : -cutInfo.cut_rect_x - 1 + 'px' , 'top' : -cutInfo.cut_rect_y - 1 + 'px'}"
                >
                <div class="u"></div>
                <div class="r"></div>
                <div class="b"></div>
                <div class="l"></div>
            </div>

            <!-- 遮罩 -->
            <div class="mask">
                
            </div>
        </div>

        <!-- 预览图 -->
        <div class="priview_wrap">
            <div class="p_box" v-for="w in p_box_arr" :style="{'width' : w + 'px' , 'height' : w + 'px'}">
                <img :src="`http://127.0.0.1:3000/${picurl}`" :style="{'left' : -cutInfo.cut_rect_x / cutInfo.cut_rect_w * w + 'px' , 'top' : -cutInfo.cut_rect_y / cutInfo.cut_rect_h * w + 'px' , 'width' : picW / cutInfo.cut_rect_w * w  +'px', 'height' : picH / cutInfo.cut_rect_h * w + 'px'}">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : ["picurl","picW","picH","picRealW","picRealH","cutInfo"],
        data(){
            return {
                
                //三个预览图的宽高
                p_box_arr : [120 , 90 , 60]
            }
        },
        mounted(){
            //备份
            var self = this; 
            //允许拖拽
            $(this.$refs.cut_rect).draggable({
                //箍住
                containment : "parent",
                //当用户拖拽的时候的事情
                drag(event , ui){
                    //得到方向框的left值和top值
                    var left = ui.position.left;
                    var top = ui.position.top;
                    //改变data
                    self.cutInfo.cut_rect_x = left;
                    self.cutInfo.cut_rect_y = top;
                }
            });

            //允许改变尺寸
            $(this.$refs.cut_rect).resizable({
                //箍住
                containment : "parent",
                //比例
                aspectRatio  : true ,
                //改变尺寸的时候
                resize(event , ui){
                    //得到方向框的width值和height值
                    var width = ui.size.width;
                    var height = ui.size.height;

                    //改变data
                    self.cutInfo.cut_rect_w = width;
                    self.cutInfo.cut_rect_h = height;
                }
            });
        }
    }
</script>

<style scoped lang="less">
    .priview_wrap{
        float: left;
        margin-left:20px;
        width:160px;

        .p_box{
            border:1px solid #333;
            margin-bottom:10px;
            overflow: hidden;

            img{
                position: relative;
            }
        }
    }

    .picwrap{
        position: relative;
        float: left;
        .cut_rect{
            position: absolute;
            width:60px;
            height:60px;
            top:0;
            left:0;
            z-index: 999;
            overflow: hidden;

            img{
                position: relative;
            }

            &>div{
                position: absolute;
            }


            @time : 140s;
            .u{
                height:0;
                width:5000px;
                border-top:2px dotted white;
                top:0;
                left:0;
                animation:move_r @time linear 0s infinite;
            }
            .r{
                height:5000px;
                width:0px;
                border-right:2px dotted white;
                top:0;
                right:0;
                animation:move_b @time linear 0s infinite;
            }
            .b{
                height:0;
                width:5000px;
                border-bottom:2px dotted white;
                left:0;
                bottom:0;
                animation:move_l @time linear 0s infinite;
            }
            .l{
                height:5000px;
                width:0px;
                border-left:2px dotted white;
                top:0;
                left:0;
                animation:move_u @time linear 0s infinite;
            }

            @-webkit-keyframes move_r{
                from{
                    left:-2500px;
                }
                to{
                    left:0;
                }
            }
            @-webkit-keyframes move_b{
                from{
                    top:-2500px;
                }
                to{
                    top:0;
                }
            }
            @-webkit-keyframes move_l{
                from{
                    left:0px;
                }
                to{
                    left:-2500px;
                }
            }
            @-webkit-keyframes move_u{
                from{
                    top:0;
                }
                to{
                    top:-2500px;
                }
            }
        }

        .mask{
            position: absolute;
            width:100%;
            height:100%;
            background:black;
            opacity: 0.68;
            top:0;
            left:0;
        }
    }
</style>