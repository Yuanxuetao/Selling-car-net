//引入Vue
import Vue from "vue";
//引入iview
import iview from "iview";
//引入Vuex
import Vuex from "vuex";
//引入vue-router
import VueRouter from "vue-router";
//引入拖拽插件
import VueDraggable from 'vue-draggable';


//引入根组件
import App from "./App";
//引入路由文件
import getRouter from "./router";
//引入store文件
import storeObj from "./stores";
//引入过滤器
import sishewuru from "./filters/sishewuru";
import getyearfromtimestamp from "./filters/getyearfromtimestamp";
import qianfenfu from "./filters/qianfenfu";
//引入全局组件
import Tutu from "./components/Tutu";
import ChangeAvatar from "./components/changeavatar/ChangeAvatar.vue";

//安装iview
Vue.use(iview);
//安装Vuex
Vue.use(Vuex);
//安装vue-router 
Vue.use(VueRouter);
//安装插件
Vue.use(VueDraggable);
 
 
//创建store对象
const store = new Vuex.Store(storeObj);

//定义过滤器
Vue.filter("sishewuru" , sishewuru);
Vue.filter("getyearfromtimestamp", getyearfromtimestamp);
Vue.filter("qianfenfu", qianfenfu);

//定义组件
Vue.component("Tutu" , Tutu);
Vue.component("ChangeAvatar", ChangeAvatar);
 
//运行上树
new Vue({
    //挂载点
    el : "#app",
    //渲染
    render(h){
        return h(App);
    },
    //路由，为什么要调用一个函数将store传给它呢？是因为router文件要用store。
    router : getRouter(store),
    //仓库
    store
});
