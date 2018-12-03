<template>
    <div>
        <Row>
            <Col :span="10">
                <Form ref="myform" :model="formdata" :rules="rules" :label-width="160">
                    <FormItem label="车主姓名" prop="name">
                        <Input v-model="formdata.name"></Input>
                        <p>请按身份证填写准确，少数民族可以加·</p>
                    </FormItem>
                    <FormItem label="身份证号码" prop="idcard">
                        <Input v-model="formdata.idcard"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="sex">
                        <RadioGroup v-model="formdata.sex">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="品牌和车系" prop="brandandseries">
                        <Cascader :data="bAndsOptions" v-model="bands"></Cascader>
                    </FormItem>
                    <FormItem label="颜色" prop="color">
                        <RadioGroup v-model="formdata.color">
                            <Radio label="红"></Radio>
                            <Radio label="黄"></Radio>
                            <Radio label="白"></Radio>
                            <Radio label="黑"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="里程表读数" prop="km">
                        <Input v-model="formdata.km"></Input>
                    </FormItem>
                    <FormItem label="购买日期" prop="buydate">
                        <DatePicker v-model="formdata.buydate"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Button @click="submit">确定</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                //表单控件
                formdata : {
                    name : "",
                    idcard : "",
                    sex : "",
                    brand : "",
                    series : "",
                    km : "",
                    color : "",
                    buydate : ""
                },
                //教验规则
                rules : {
                    name: [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' },
                        //字符串的正则
                        { type : "string" , pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请正确填写', trigger: 'blur'}
                    ],
                    idcard : [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' },
                        //字符串的正则
                        { type : "string" , pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请正确填写', trigger: 'blur'}
                    ],
                    sex : [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' }
                    ],
                    brandandseries : [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' }
                    ],
                    color : [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' }
                    ],
                    km : [
                        //必填
                        { required: true, message: '必须填写本项', trigger: 'blur' },
                        //必填
                        { type : "string" , pattern: /^\d+$/, message: '请正确填写', trigger: 'blur'}
                    ],
                    buydate : [
                        //必填
                        { required: true  , message: '必须填写本项' },
                    ]
                },
                bAndsOptions : [
                    {
                        value : "A",
                        label : "A",
                        children : [
                            {
                                value : "奥迪",
                                label : "奥迪",
                                children : [
                                    {
                                        value : "A4",
                                        label : "A4"
                                    },
                                    {
                                        value : "A3",
                                        label : "A3"
                                    },
                                    {
                                        value : "A6",
                                        label : "A6"
                                    }
                                ]
                            },
                            {
                                value : "阿斯顿马丁",
                                label : "阿斯顿马丁",
                                children : [
                                    {
                                        value : "Rapide",
                                        label : "Rapide"
                                    },
                                    {
                                        value : "DB9",
                                        label : "DB9"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value : "B",
                        label : "B",
                        children : [
                            {
                                value : "宝马",
                                label : "宝马",
                                children : [
                                    {
                                        value : "5系",
                                        label : "5系"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        computed : {
            bands : {
                get(){
                    return [];
                },
                set(v){
                    this.formdata.brand = v[1];
                    this.formdata.series = v[2];
                }
            }
        },
        methods : {
            submit(){
                var self = this;
                //校验整个表单
                this.$refs.myform.validate(data=>{
                    //校验通过之后
                    self.$store.commit("saleStore/changeStep1Form" , {"step1Form" : self.formdata});
                    self.$store.commit("saleStore/changeStep" , {"step" : 2});
                });
            }
        }
    }
</script>

<style scoped>

</style>