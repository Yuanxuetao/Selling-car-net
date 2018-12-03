<template>
    <div>
        <h3>外观照片：</h3>
        <vue-dropzone ref="myVueDropzone" id="view" :options="dropzoneOptions"></vue-dropzone>
        <h3>内饰照片：</h3>
        <vue-dropzone ref="myVueDropzone" id="inner" :options="dropzoneOptions"></vue-dropzone>
        <h3>结构及发动机照片：</h3>
        <vue-dropzone ref="myVueDropzone" id="engine" :options="dropzoneOptions"></vue-dropzone>
        <h3>更多细节照片：</h3>
        <vue-dropzone ref="myVueDropzone" id="more" :options="dropzoneOptions"></vue-dropzone>
        <Button type="primary" @click="submitHandler()">确定</Button>
    </div>
</template>

<script>
    import vue2Dropzone from 'vue2-dropzone';
    export default {
        components: {
            vueDropzone: vue2Dropzone
        },
        data(){
            return {
                dropzoneOptions: {
                    url: '/api/uppic',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    headers: { "My-Awesome-Header": "header value" },
                    success(file , response){
                        file.previewElement.setAttribute("data-filename" , response.filename)
                    }
                }
            }
        },
        methods : {
            submitHandler(){
                var view = [];
                var inner = [];
                var engine = [];
                var more = [];
                //遍历DOM
                $("#view .dz-preview").each(function(){
                    view.push($(this).data("filename"));
                });
                $("#inner .dz-preview").each(function(){
                    inner.push($(this).data("filename"));
                });
                $("#engine .dz-preview").each(function(){
                    engine.push($(this).data("filename"));
                });
                $("#more .dz-preview").each(function(){
                    more.push($(this).data("filename"));
                });

                this.$store.commit("saleStore/changeStep2Form" , {"step2Form" : {
                    view , inner , engine , more
                }});

                this.$store.commit("saleStore/changeStep" , {"step" : 3});
            }
        },
        mounted() {
            //允许排序
            $(".vue-dropzone").sortable();
        },
    }
</script>

<style scoped>

</style>