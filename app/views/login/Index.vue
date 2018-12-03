<template>
    <div class="login_wrap">
        <div class="inner">
            <h1>二手车交易市场内部系统</h1>
            <div style="height:40px;"></div>
            <Form ref="formInline" >
                <FormItem prop="username">
                    <Input autofocus type="text" v-model="formInline.username" placeholder="username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit()">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data(){
            return {
                formInline : {
                    password : "",
                    username : ""
                }
            }
        },
        methods : {
            handleSubmit(){
                axios.post("/api/login" , {
                    "username" : this.formInline.username,
                    "password" : this.formInline.password
                }).then(data=>{
                    if(data.data.result == 1){
                        this.$router.push({"name" : "index"});
                    }else{
                        this.$Message.error('用户名或密码不正确');
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .login_wrap{
        position: fixed;
        width:100%;
        height:100%;
        background-image:-webkit-radial-gradient(left bottom, #033253, #048ea5);


        @w : 500px;
        @h : 300px;
        .inner{
            box-sizing: border-box;
            padding:20px;
            position: absolute;
            top:50%;
            left:50%;
            width:@w;
            height:@h;
            background:white;
            margin-top:-@h / 2;
            margin-left:-@w / 2;
        }
    }
</style>