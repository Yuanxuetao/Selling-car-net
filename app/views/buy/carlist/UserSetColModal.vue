<template>
    <div>
      
        <div v-drag-and-drop:options="options">
            <h3>备选：</h3>
            <ul ref="list1">
                <li v-for="item in unexist" :key="item.e" :data-e="item.e">{{item.c}}</li>
            </ul>
            <h3>当前设置：</h3>
            <ul ref="list2" id="list2">
                <li v-for="item in exist" :key="item.e" :data-e="item.e">{{item.c}}</li>
            </ul>
        </div>
        
    </div>
</template>

<script>
    var allcols = [
        {"c" : "发动机" , "e" : "engine"},
        {"c" : "购买日期" , "e" : "buydate"},
        {"c" : "是否有牌" , "e" : "license"},
        {"c" : "排放" , "e" : "exhaust"},
        {"c" : "头像" , "e" : "avatar"},
        {"c" : "ID" , "e" : "id"},
        {"c" : "颜色" , "e" : "color"},
        {"c" : "售价" , "e" : "price"},
        {"c" : "公里数" , "e" : "km"},
        {"c" : "品牌" , "e" : "brand"},
        {"c" : "车系" , "e" : "series"},
        {"c" : "变速箱" , "e" : "gearbox"},
        {"c" : "燃料" , "e" : "fuel"}
    ]

    export default {
        props : ["colSort"],
        mounted() {
            
        },
        computed : {
            exist(){
                var arr = [];
                allcols.forEach(item=>{
                    if(this.colSort.includes(item.e)){
                        arr.push(item);
                    }
                })
                return arr;
            },
            unexist(){
                var arr = [];
                allcols.forEach(item=>{
                    if(!this.colSort.includes(item.e)){
                        arr.push(item);
                    }
                })
                return arr;
            }
        },
        data(){
            return {
                options : {
                    dropzoneSelector: 'ul',
                    draggableSelector: 'li',
                    excludeOlderBrowsers: true,
                    multipleDropzonesItemsDraggingEnabled: true,
                    showDropzoneAreas: true,
                    onDrop: function(event) {},
                    onDragstart: function(event) {},
                    onDragend: function(event) {}
                }

            }
        }
    }
</script>

<style scoped lang="less">
    li{
        float: left;
        border:1px solid #eee;
        padding:4px;
        margin-right:10px;
        margin-bottom:10px;
    }
    ul{
        list-style: none;
        overflow: hidden;
        width:100%;
        min-height:30px;
       
    }
</style>