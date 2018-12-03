//引入vue-router 
import VueRouter from "vue-router";
import axios from "axios";
//引包
import Index_layout from "./views/index/Index_layout";
import Index from "./views/index/Index";
import Buy_layout from "./views/buy";
import Carlist from "./views/buy/carlist";
import Sifa from "./views/buy/sifa";
import Ai from "./views/buy/ai";
import Compare from "./views/buy/compare";
import Sale from "./views/sale";
import User from "./views/user";
import Park from "./views/park";
import Carpic from "./views/carpic";
import Login from "./views/login";

 
export default (store) => {
    const router = new VueRouter({
        routes: [
            //header区域的布局
            {
                path: "/index",
                component: Index_layout,
                children: [
                    //首页
                    {
                        path: "index",
                        component: Index,
                        name: "index"
                    },
                    //买车栏目
                    {
                        path: "buy",
                        component: Buy_layout,
                        name : "buy",
                        children: [
                            {
                                path: "",
                                //当用户直接输入buy的时候，会跳转到carlist子栏目
                                redirect: {
                                    "name": "carlist"
                                }
                            },
                            {
                                path: "carlist",
                                component: Carlist,
                                name: "carlist",
                                meta : {
                                    showRightbar: true
                                }
                            },
                            {
                                path: "sifa",
                                component: Sifa,
                                name: "sifa",
                                meta: {
                                    showRightbar: true
                                }
                            },
                            {
                                path: "ai",
                                component: Ai,
                                name: "ai",
                                meta: {
                                    showRightbar: true
                                }
                            },
                            {
                                path: "compare",
                                component: Compare,
                                name: "compare",
                                meta: {
                                    showRightbar: true
                                }
                            }
                        ] 
                    },
                    //卖车栏目
                    {
                        path: "sale",
                        component: Sale,
                        name: "sale"
                    },
                    //用户栏目
                    {
                        path: "user",
                        component: User,
                        name: "user"
                    },
                    //停车场栏目
                    {
                        path: "park",
                        component: Park,
                        name: "park"
                    }
                ]
            },
            {
                path: "/carpic/:id",
                component: Carpic,
                name: "carpic",
                meta: {
                    showRightbar: true
                }
            },
            {
                path: "/login",
                component: Login,
                name: "login"
            },
            {
                path : "*",
                redirect : {"name" : "index"}
            }
        ]
    });

    /* ****************************
     *           路由守卫
     * ****************************/
    //每当用户切换路由的时候做的事情
    router.afterEach(async function (to, from){
        //如果用户访问的不是/login，那么要判断用户是否登录
        if (to.fullPath != "/login"){
            //发出Ajax请求，看这个用户是否登录，如果没有登录，强制转移到/login
            const { status , info } = await axios.get("/api/me").then(data => data.data);
            
            if (status == -1) {
                //强行跳转。
                router.push({"name" : "login"});
                return;
            }else{
                //已经登录了
                store.commit("meStore/changeInfo", info);
            }
        }
       
        //如果匹配这个模式
        if (/\/index\/(\w+)/.test(to.fullPath)){
            //提炼路由中的index/某某某/adfadsf的莫某某部分,正则表达式中的圆括号表示捕获。
            store.commit("routerStore/changeColumnName" , {
                "cn": to.fullPath.match(/\/index\/(\w+)/)[1]
            });
        }

        if (/\/index\/\w+\/(\w+)/.test(to.fullPath)) {
            //提炼路由中的index/某某某/adfadsf的莫某某部分,正则表达式中的圆括号表示捕获。
            store.commit("routerStore/change2NdName", {
                "cn": to.fullPath.match(/\/index\/\w+\/(\w+)/)[1]
            });
        }
        
        //显示右边条
        store.commit("rightbarStore/changeIsShowRightBar", { "isShowRightbar": to.meta.showRightbar ? true : false});
    });
    return router;
}