<template>
    <div>
        <h1>你已经有了下列数据</h1>
        {{$store.state.saleStore.step1Form}}
        <hr>
        {{$store.state.saleStore.step2Form}}
        <Button @click="add" type="primary">添加！！！</Button>
    </div>
</template>

<script>
    export default {
        methods : {
            add(){
                this.$store.dispatch("saleStore/addCar")
            }
        }
    }
</script>

<style scoped>

</style>