<template>
    <div>
        <DatePicker type="daterange" placeholder="Select date" style="width: 200px" :value="v" @on-change="changeHandler" :clearable="false"></DatePicker>
    </div>
</template>

<script>
    export default {
        props : ["english"],
        methods : {
            changeDate(v){
                console.log(v);
            }
        },
        computed : {
            //得到store的fitlers数据中和这个组件的k相同的项
            getStoreTheFilter(){
                return this.$store.state.findcarStore.filters.filter(item=>item.k == this.english)[0];
            },
            v(){
                if(this.getStoreTheFilter){
                    return this.getStoreTheFilter.v.split("to").map(item=>new Date(Number(item)));
                }else{
                    return [];
                }
            }
        },
        methods : {
            changeHandler(v){
                this.$store.dispatch("findcarStore/changeFilter", {"k" : this.english , "v" : v.map(item=>Date.parse(item)).join("to")});
            }
        }
    }
</script>

<style scoped>

</style>