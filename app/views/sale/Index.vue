<template>
    <div>
        <Layout :style="{padding: '20px 24px'}">  
            <Card>
                <Steps :current="step - 1">
                    <Step :title="showTitle(1)" content="这里是该步骤的描述信息"></Step>
                    <Step :title="showTitle(2)" content="这里是该步骤的描述信息"></Step>
                    <Step :title="showTitle(3)" content="这里是该步骤的描述信息"></Step>
                    <Step :title="showTitle(4)" content="这里是该步骤的描述信息"></Step>
                </Steps>
            </Card>
            <div style="height:20px;"></div>
            <Card>
                <div :is="'Step' + step"></div>
            </Card>
        </Layout>
    </div>
</template>
 

<script>
    import Step1 from "./Step1";
    import Step2 from "./Step2";
    import Step3 from "./Step3";
    import Step4 from "./Step4";

    export default {
        computed : {
            //全局的step序号
            step(){
                return this.$store.state.saleStore.step;
            }
        },
        methods : {
            showTitle(n){
                if(n > this.step){
                    return "待进行";
                }else if(n == this.step){
                    return "进行中";
                }else{
                    return "已完成";
                }
            }
        },
        components : {
            Step1,
            Step2,
            Step3,
            Step4
        }
    }
</script>

<style scoped>

</style>