<template>
    <div>
        <router-view></router-view>

        <RightBar v-if="isShowRightbar"></RightBar>
    </div>
</template>

<script>
    import RightBar from "./components/RightBar.vue";

    export default {
        components : {
            RightBar
        },
        computed : {
            isShowRightbar(){
                return this.$store.state.rightbarStore.isShowRightbar;
            }
        }
    }
</script>

<style scoped>

</style>