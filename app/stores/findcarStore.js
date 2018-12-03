import axios from "axios";
import querystring from "querystring";

export default {
    namespaced: true,
    state: {
        "filters" : [
             
        ],
        "page" : 1,
        "pagesize" : 10,
        "sortby" : "id",
        "sortdirection" : 1,
        "results" : [],
        "total" : 0
    },
    mutations : {
        changePage(state, { page }) {
            state.page = page;
        },
        changePagesize(state, { pagesize }) {
            state.pagesize = pagesize;
        },
        changeSort(state, { sortby, sortdirection }) {
            state.sortby = sortby;
            state.sortdirection = sortdirection;
        },
        changeResults(state, { results}){
            state.results = results;
        },
        changeTotal(state, { total }) {
            state.total = total;
        },
        //增加过滤条件
        addFilter(state ,{k , v}){
            state.filters.push({k,v});
        },
        //修改v
        updateFilter(state , {k , v}){
            state.filters = state.filters.map(item => item.k == k ? {...item , v} : item);
        },
        //删除
        delFilter(state , {k}){
            state.filters = state.filters.filter(item => item.k != k);
        }
    },
    actions: {
        //拉取服务器的数据
        async fetchCar({commit , state}){
            //得到state中的参数
            const {page , pagesize , sortby , sortdirection , filters} = state;
            
            //将filters数组变为对象
            var filtersobj = {};
            for(let i = 0 ; i < filters.length ; i++){
                filtersobj[filters[i].k] = filters[i].v;
            }
            //这里真正发出请求
            const {total , results} = await axios.get(
                "/api/findcar?" + querystring.stringify({
                page, 
                pagesize, 
                sortby, 
                sortdirection,
                //展开filters对象体
                ...filtersobj
            })).then(data=>data.data);
            //改变results
            commit("changeResults" , {results});
            commit("changeTotal", { total});
        },
        //改变filter
        changeFilter({commit , state , dispatch} , {k,v}){
            //判断到底是改还是增加？
            var isExist = false;
            //遍历state的filters数组，看到底有没有
            state.filters.forEach(item=>{
                if(item.k == k){
                    isExist = true;
                }
            });

            //如果这个k已经存在，就是修改
            if(isExist){
                commit("updateFilter" , {k , v});
            }else{
                //如果不存在就是增加
                commit("addFilter", { k, v });
            }

            //如果改变了品牌，车系要删除
            if(k == "brand"){
                commit("delFilter", {"k" : "series"});
            }

            //页面归1
            commit("changePage", { "page": 1 });

            //重新拉取数据
            dispatch("fetchCar");
        },
        //删除
        delFilter({ commit , state , dispatch }, { k }) {
            commit("delFilter" , {k});
            commit("changePage", { "page": 1 });
            //重新拉取数据
            dispatch("fetchCar");
        },
        //换页
        changePage({ commit, dispatch }, { page }) {
            //先改页码
            commit("changePage", { page });
            //改变
            dispatch("fetchCar");
        },
        //换每页几条
        changePagesize({ commit, dispatch }, { pagesize }) {
            //先改每页几条
            commit("changePagesize", { pagesize });
            commit("changePage", { "page" : 1 });
            //改变
            dispatch("fetchCar");
        },
        //改变排序
        changeSort({ commit, dispatch }, { key, order }) {
            //先改每页几条
            commit("changeSort", { "sortby": key, "sortdirection": order == "desc" ? -1 : 1 });
            commit("changePage", { "page": 1 });
            //改变
            dispatch("fetchCar");
        }
    }
}