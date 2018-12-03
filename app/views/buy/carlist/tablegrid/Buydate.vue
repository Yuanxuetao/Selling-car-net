<template>
    <div>
        {{moment(buydate).format("YYYY年MM月DD日")}}
    </div>
</template>

<script>
    import moment from "moment";
    export default {
        props : ["buydate"],
        methods : {
            moment
        }
    }
</script>

<style scoped>

</style>