<template>
    <div>
        <Row>
            <Col :span="3">
                品牌
            </Col>
            <Col :span="21">
                <div class="tab_wrap">
                    <Tabs value="A">
                        <TabPane v-for="item in brands" :key="item.char" :label="item.char" :name="item.char">
                            <a v-for="(link,index) in item.bs" :class="{'cur' : link == brand}" :key="index" href="javascript:;" @click="changeBrand(link)">
                                {{link}}
                            </a>
                        </TabPane>
                    </Tabs>
                    <div style="clear:both;"></div>
                </div>
                <div style="height:12px;"></div>
            </Col>
        </Row>
        <div style="clear:both;"></div>
        <Row v-show="brand != ''">
            <Col :span="3">
                车系
            </Col>
            <Col :span="21">
                <a href="javascript:void(0);" :class="{'cur' : series == ''}" @click="quanbuHandler()">全部</a>
                <a href="javascript:void(0)" v-for="(link,index) in seriesOptions" :key="index" :class="{'cur' : link == series}" @click="changeSeries(link)">
                    {{link}}
                </a>
            </Col>
        </Row>
        
        <Row v-for="item in filterControls" :key="item.english">
            <Col :span="3">
                {{item.chinese}}
            </Col>
            <Col :span="21">
                <Fuxuankuang v-if="item.type == 'Fuxuankuang'" :options="item.options" :english="item.english"></Fuxuankuang>
                <Huadongtiao v-if="item.type == 'Huadongtiao'" :english="item.english" :min="item.min" :max="item.max" :conversion="item.conversion"></Huadongtiao>
                <Riqifanwei  v-if="item.type == 'Riqifanwei'" :english="item.english"></Riqifanwei>
            </Col>
        </Row>
        <div style="height:20px;clear:both;"></div>
        <Row>
            <Col :span="24">
                <Tag closable v-for="item in filters" :key="item.k" @on-close="closeHandler(item.k)">
                    {{getK(item.k)}} ：{{getV(item.k , item.v)}}
                </Tag>
            </Col>
        </Row>
    </div>
</template>

<script>
    import moment from "moment";
    import Fuxuankuang from "./filtercontrols/Fuxuankuang";
    import Huadongtiao from "./filtercontrols/Huadongtiao";
    import Riqifanwei from "./filtercontrols/Riqifanwei";

    import axios from "axios";

    export default {
        //组件已经创建，最早能够用this的生命周期
        async created() {
            const {brands} = await axios.get("/api/brands").then(data=>data.data);
            this.brands = brands;
        },
        computed : {
            //全局已经有的筛选条件
            filters(){
                return this.$store.state.findcarStore.filters;
            },
            //品牌
            brand(){
                var o = this.$store.state.findcarStore.filters.filter(item=>item.k == "brand")[0];
                if(o){
                    return o.v;
                }else{
                    return "";
                }
            },
            //车系
            series(){
                var o = this.$store.state.findcarStore.filters.filter(item=>item.k == "series")[0];
                if(o){
                    return o.v;
                }else{
                    return "";
                }
            }
        },
        //数据
        data(){
            return {
                //所有的筛选控件
                filterControls : [
                    {
                        "chinese" : "颜色",
                        "english" : "color",
                        "type" : "Fuxuankuang",
                        "options" : ["红","黄","绿","蓝","黑","白","灰","银灰","咖啡"]
                    },
                    {
                        "chinese" : "发动机",
                        "english" : "engine",
                        "type" : "Fuxuankuang",
                        "options" : ["1.0L","1.2L","1.6T","2.0L","2.0T","3.0L","4.0L"]
                    },
                    {
                        "chinese" : "排放标准",
                        "english" : "exhaust",
                        "type" : "Fuxuankuang",
                        "options" : ["国一","国二","国三","国四","国五"]
                    },
                    {
                        "chinese" : "变速箱",
                        "english" : "gearbox",
                        "type" : "Fuxuankuang",
                        "options" : ["手动","自动","手自一体"]
                    },
                    {
                        "chinese" : "燃料",
                        "english" : "fuel",
                        "type" : "Fuxuankuang",
                        "options" : ["汽油","柴油","纯电动","油电混合"]
                    },
                    {
                        "chinese" : "售价（万元）",
                        "english" : "price",
                        "type" : "Huadongtiao",
                        "min" : 0,
                        "max" : 120,
                        "conversion" : 1
                    },
                    {
                        "chinese" : "公里数（万公里）",
                        "english" : "km",
                        "type" : "Huadongtiao",
                        "min" : 0,
                        "max" : 2000000,        //真值
                        "conversion" : 10000    //将10000当做1
                    },
                    {
                        "chinese" : "购买日期",
                        "english" : "buydate",
                        "type" : "Riqifanwei"
                    }
                ],
                brands : [],
                seriesOptions : []
            }
        },
        //组件
        components : {
            Fuxuankuang,
            Huadongtiao,
            Riqifanwei
        },
        methods : {
            //英语名字换中文
            getK(k){
                if(k == "brand"){
                    return "品牌";
                }
                if(k == "series"){
                    return "车系";
                }
                return this.filterControls.filter(item=>item.english == k)[0].chinese;
            },
            //规整一下v
            getV(k , v){
                //特例品牌
                if(k == "brand"){
                    return v;
                }
                //特例车系
                if(k == "series"){
                    return v;
                }

                //看类型
                var type = this.filterControls.filter(item=>item.english == k)[0].type;

                //区别
                if(type == "Fuxuankuang"){
                    return v.replace(/v/g , " 或 ");
                }else if(type == "Riqifanwei"){
                    return v.split("to").map(item=>{
                        return moment(Number(item)).format("YYYY年MM月DD日");
                    }).join(" 到 ");
                }
                //几个特例
                if(k == "price"){
                    return v.split("to").map(item=>item + "万元").join(" 到 ");
                }else if(k == "km"){
                    return v.split("to").map(item=>item / 10000 + "万公里").join(" 到 ");
                }
            },
            closeHandler(k){
                this.$store.dispatch("findcarStore/delFilter", {k})
            },
            //改变品牌，直接调用store中定义的changeFilter函数即可。
            changeBrand(brand){
                this.$store.dispatch("findcarStore/changeFilter", {"k" : "brand" , "v" : brand})
            },
            //改变车系，直接调用store中定义的changeFilter函数即可。
            changeSeries(series){
                this.$store.dispatch("findcarStore/changeFilter", {"k" : "series" , "v" : series})
            },
            //全部超级链接
            quanbuHandler(){
                this.$store.dispatch("findcarStore/delFilter", {"k" : "series"});
            }
        },
        watch : {
            //当且仅当brand改变车系候选项才改变，此时就要相当watch这个东西
            async brand(v){
                //请求
                const {series} = await axios.get("/api/series?brand=" + v).then(data=>data.data);
                //改变车系选项
                this.seriesOptions = series;
            }
        }
    }
</script>

<style scoped lang="less">
    .ivu-row{
        height:30px;
        line-height:30px;
    }
    a{
        line-height: 30px;
        margin-right:20px;

        &.cur{
            background:orangered;
            padding:4px 10px;
            color:white;
        }
    }
    .tab_wrap{
        border: 1px solid #eee;
        padding:20px;
    }
</style>