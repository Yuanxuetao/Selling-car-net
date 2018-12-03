import axios from "axios";

export default {
    namespaced: true,
    state: {
        //信号量，当前正在看到的图集名字
        nowAlbum : "view" ,
        //小序号，当前正在看这个图集中的第几号图，号从0开始
        nowIdx : 0,
        //看的这一辆车的信息
        carinfo : {}
    },
    //同步
    mutations: {
        changeCarinfo(state , {carinfo}){
            state.carinfo = carinfo;
        },
        changeNowAlbum(state , {nowAlbum}){
            state.nowAlbum = nowAlbum;
        },
        changeNowIdx(state, { nowIdx }) {
            state.nowIdx = nowIdx;
        } 
    },
    actions : {
        //请求服务器数据
        async init({commit} , {id}){
            //改变相册、idx、车辆信息
            commit("changeNowAlbum" , {"nowAlbum" : "view"});
            commit("changeNowIdx", {"nowIdx" : 0});
            commit("changeCarinfo", {"carinfo" : []});
            //真正请求服务器的语句：
            const {result} = await axios.get("/api/carinfo?id=" + id).then(data=>data.data);
            //通知mutations改变
            commit("changeCarinfo" , {"carinfo" : result});
        },
        changeNowAlbum({ commit }, { nowAlbum }) {
            commit("changeNowIdx", { "nowIdx": 0 });
            commit("changeNowAlbum", { nowAlbum });
        },
        //下一张
        goNext({commit , state}){
            if(state.nowIdx < state.carinfo.images[state.nowAlbum].length - 1){
                commit("changeNowIdx" , {"nowIdx" : state.nowIdx + 1});
            }else{
                //小序号归0
                commit("changeNowIdx", { "nowIdx": 0});
                //罗列所有图集顺序
                var arr = ["view","inner","engine","more"];
                //得到当前的图集的序号
                var _albumidx = arr.indexOf(state.nowAlbum);
                //让序号加1
                var _nextAlbumIdx = (_albumidx + 1) % 4;
                //变图集
                commit("changeNowAlbum", { "nowAlbum": arr[_nextAlbumIdx]});
            }
        },
        //上一张
        goPrev({ commit, state }) {
            if (state.nowIdx > 0) {
                commit("changeNowIdx", { "nowIdx": state.nowIdx - 1 });
            } else {
                //罗列所有图集顺序
                var arr = ["view", "inner", "engine", "more"];
                //得到当前的图集的序号
                var _albumidx = arr.indexOf(state.nowAlbum);
                //让序号加1
                var _prevAlbumIdx = _albumidx - 1 > 0 ? _albumidx - 1 : 3;
                //变图集
                commit("changeNowAlbum", { "nowAlbum": arr[_prevAlbumIdx] });
                //小序号变为当前图集最后一张
                commit("changeNowIdx", { "nowIdx": state.carinfo.images[state.nowAlbum].length - 1 });
            }
        }
    }
}