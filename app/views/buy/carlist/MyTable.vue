<template>
    <div>
        <Row>
            <Col :span="8">
                <h3>共找到{{total}}辆车符合条件，共{{Math.ceil(total/pagesize)}}页，当前第{{page}}页</h3>
            </Col>
            <Col :span="1" :offset="24 - 8 - 1">
                <Button type="primary" shape="circle" icon="md-settings" @click="showModal"></Button>
            </Col>
        </Row>
        

        <Table :columns="columns" :data="results" @on-sort-change="changeSort"></Table>

        <div style="height:10px;"></div>

        <Page :total="total" :page-size="pagesize" :current="page" @on-change="changePage" show-sizer @on-page-size-change="changePagesize"></Page>
    
        <!-- 模态框（悬浮层）用户自定义列 -->
        <Modal
            v-model="modal1"
            title="请更改表格列"
            @on-ok="ok"
            @on-cancel="cancel"
        >
            <div ref="modalbox" v-if="modal1">
                <UserSetColModal :colSort="colSort"></UserSetColModal>  
            </div>
        </Modal>
    </div>
</template>

<script>
    //引入全部的列定义。
    import colConfig from "./colConfig";
    import UserSetColModal from "./UserSetColModal";

    export default {
        data(){
            return {
                //列排序
                colSort : ["avatar" , "id" ,  "brand" , "series" , "price" , "km"],
                //列所有定义
                columns : [],
                modal1 : false
            }
        },
        //组件创建之后，根据列排序，从列的全部定义中组件columns。
        created() {
            this.setColumnsByColSort();
        },
        computed : {
            results(){
                return this.$store.state.findcarStore.results;
            },
            total(){
                return this.$store.state.findcarStore.total;
            },
            pagesize(){
                return this.$store.state.findcarStore.pagesize;
            },
            page(){
                return this.$store.state.findcarStore.page;
            }
        },
        methods : {
            changePage(page){
                this.$store.dispatch("findcarStore/changePage" , {page});
            },
            changePagesize(pagesize){
                this.$store.dispatch("findcarStore/changePagesize" , {pagesize});
            },
            changeSort({column , key , order}){
                this.$store.dispatch("findcarStore/changeSort" , {key , order});
            },
            ok () {
                var arr = []
                $(this.$refs.modalbox).find("#list2 li").each(function(){
                    arr.push($(this).attr("data-e"));
                });
                //改
                this.colSort = arr;
                //
                this.setColumnsByColSort();
                //关闭模态框
                this.modal1 = false;
            },
            cancel () {
               this.modal1 = false;
            },
            //显示模态框
            showModal(){
                this.modal1 = true;
            },
            //定义列的顺序
            setColumnsByColSort(){
                this.columns = [];
                for(let i = 0 ; i < this.colSort.length ; i++){
                    for(let j = 0 ; j < colConfig.length ; j++){
                        if(this.colSort[i] == colConfig[j].key){
                            this.columns.push(colConfig[j])
                        }
                    }
                }
            }
        },
        components : {
            UserSetColModal
        }
    }
</script>

<style scoped lang="less">

</style>