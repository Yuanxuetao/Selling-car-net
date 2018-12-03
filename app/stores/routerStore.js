export default {
    namespaced: true,
    state: {
        columnname: "",     //栏目名称（英语）
        col2ndname: ""     //二级栏目名称（英语）
    },
    mutations: {
        changeColumnName(state, { cn }) {
            state.columnname = cn;
        },
        change2NdName(state , {cn}){
            state.col2ndname = cn;
        }
    }
}