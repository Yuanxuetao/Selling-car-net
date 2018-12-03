<template>
    <div>
        <Modal
            :value="true"
            title="更改头像"
            @on-cancel="cancel"
            :width="modalW"
        >

            <!-- 第一步 -->
            <div v-if="step == 1">
                <input type="file" ref="file" hidden @change="changeHandler">
                <Button type="primary" @click="upbtnHandler">上传计算机中的文件...</Button>
                <p>
                    只能上传.jpg、.png类型，大小不超过300kb
                </p>
            </div>

            <!-- 第二步 -->
            <div v-if="step == 2">
                <Progress :percent="percent" status="active" />
            </div>

            <!-- 第三步 -->
            <div v-if="step == 3" style="overflow:hidden;">
                <div class="step3_wrap" :style="{'width' : picW + paddingRight + 'px' , 'height' : (picH > 280 ? picH : 280) + 'px'}">
                    <CutPic :cutInfo="cutInfo" :picurl="picurl" :picW="picW" :picH="picH" :picRealW="picRealW" :picRealH="picRealH"></CutPic>
                </div>
            </div>

            <div slot="footer">
                <Button>取消</Button>
                <Button type="primary" v-show="step == 3"  @click="okHandler">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import CutPic from "./CutPic";
    import axios from "axios";

    export default {
        data(){
            return {
                //图片真实宽度（由服务器返回的）
                picRealW : 0,
                //图片真实高度（由服务器返回的）
                picRealH : 0,
                //图片的地址（由服务器返回的）
                picurl : "" ,
                //第几步
                step : 1,
                //进度条的白分别
                percent : 0,
                //图片的最小宽度
                picWMin : 400,
                //图片的最大宽度
                picWMax : 700,
                //图片的最小高度
                picHMin : 250,
                //图片的最大高度
                picHMax : 390,
                //右边的padding，就是放置预览图的宽度
                paddingRight : 180,
                //图片最终显示的宽度(计算而来)
                picW : 0,
                //图片最终显示的高度(计算而来)
                picH : 0,
                //模态框的top值
                modalTop : 30,
                //裁图框的数据
                cutInfo : {
                    cut_rect_x : 0,
                    cut_rect_y : 0,
                    cut_rect_w : 60,
                    cut_rect_h : 60,
                }
            }
        },
        mounted() {
            this.setWH();
        },
        methods: {
            okHandler() {
                axios.post("/api/cut" , {
                    picurl : this.picurl,
                    cut_rect_x : this.cutInfo.cut_rect_x,
                    cut_rect_y : this.cutInfo.cut_rect_y,
                    cut_rect_w : this.cutInfo.cut_rect_w,
                    cut_rect_h : this.cutInfo.cut_rect_h,
                    picRealW : this.picRealW,
                    picRealH : this.picRealH,
                    picW : this.picW,
                    picH : this.picH
                });

                alert("成功！");
                //刷新浏览器
                window.location.reload();
            },
            cancel () {
               
                this.$emit("close");
            },
            upbtnHandler(){
                //模拟触发inputtype=file框的点击事件
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click",false,false);
                this.$refs.file.dispatchEvent(evt);
            },
            //当input框改变的时候做的事情
            changeHandler(){
                var thefile = this.$refs.file.files[0];
                
                //本分
                var self = this;
                //创建虚拟表单
                var form = new FormData();
                //在虚拟表单中追加一个头像项
                form.append("avatar" , thefile);
                //创建小黄人
                var xhr = new XMLHttpRequest();
                //回调
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                        var o = JSON.parse(xhr.responseText);
                        self.picurl =  o.filename;
                        self.picRealW = o.width;
                        self.picRealH = o.height;
                        self.setWH();
                    }
                }
                //上传进度
                xhr.upload.onprogress = function(e){
                    //百分比
                    self.percent = (e.loaded / e.total) * 100;
                    //改变状态，视图就自己切换了
                    self.step = 3;
                }
                //配置
                xhr.open("POST" , "/api/upavatar" , true);
                //发出
                xhr.send(form);
                //改变状态
                this.step = 2;
            },
            setWH(){
                this.picW = this.picRealW;
                this.picH = this.picRealH;
                //如果图片的最大宽度大于了能够写的最大宽度
                if(this.picRealW > this.picWMax){
                    //就让图片的宽度为最大宽度
                    this.picW = this.picWMax;
                    //高度等比例变化
                    this.picH = this.picRealH / (this.picRealW / this.picWMax);
                }
                //验证高度是不是合法
                if(this.picRealH > this.picHMax){
                    //就让图片的高度为最大高度
                    this.picH = this.picHMax;
                    //宽度等比例变化
                    this.picW = this.picRealW / (this.picRealH / this.picHMax);
                }

                this.modalTop = (parseInt(document.documentElement.clientHeight) - this.picH - 100) / 2
                 
            }
        },
        computed : {
            modalW(){
                if(!this.picurl){
                    return "500px";
                }
                return this.picW + this.paddingRight + "px";
            }
        },
        components : {
            CutPic
        }
    }
</script>

<style scoped>

</style>