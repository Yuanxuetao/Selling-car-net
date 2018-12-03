<template>
    <div>
        <h1>网盘功能，待做</h1>
        <Button @click="submitHandler">确定</Button>
    </div>
</template>

<script>
    export default {
        methods : {
            submitHandler(){
                this.$store.commit("saleStore/changeStep" , {"step" : 4});
            }
        }
    }
</script>

<style scoped>

</style>