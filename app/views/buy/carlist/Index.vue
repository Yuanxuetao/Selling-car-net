<template>
    <div>
        <MyFilterBox></MyFilterBox>
        <div style="height:10px;clear:both;"></div>
        <MyTable></MyTable>

      
      
    </div>
</template>

<script>
    import MyTable from "./MyTable";
    import MyFilterBox from "./MyFilterBox";
  
    
    export default {
      
        //组件创建之前
        beforeCreate() {
            this.$store.dispatch("findcarStore/fetchCar");
        },
        components : {
            MyTable,
            MyFilterBox 
        }
    }
</script>

<style scoped>

</style>