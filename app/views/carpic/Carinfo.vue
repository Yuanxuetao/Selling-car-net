<template>
    <div>
        <h1>{{carinfo.brand}}{{carinfo.series}}{{carinfo.color}}色{{carinfo.price | sishewuru(0) }}万</h1>
        <h2>{{carinfo.km / 10000 | sishewuru(1)}}万公里{{carinfo.engine}}{{carinfo.gearbox}}{{carinfo.exhaust}}{{carinfo.buydate | getyearfromtimestamp}}年</h2>
    </div>
</template>

<script>
    export default {
        computed : {
            carinfo(){
                return this.$store.state.carpicStore.carinfo;
            }
        }
    }
</script>

<style scoped lang="less">

</style>