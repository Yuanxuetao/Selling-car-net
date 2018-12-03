<template>
    <div>
        <img :src="`http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar}`" alt="">
    </div>
</template>

<script>
    export default {
        props : ["row"]
    }
</script>

<style scoped>

</style>