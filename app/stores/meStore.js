import axios from "axios";
import querystring from "querystring";

export default {
    namespaced: true,
    state: {
        username : "",
        name : "",
        tel : "",
        type : "",
        department : "",
        avatar : ""
    },
    mutations: {
        //改变信息
        changeInfo(state , {username , name , tel , type , department , avatar}){
            state.username = username;
            state.name = name;
            state.tel = tel;
            state.type = type;
            state.department = department;
            state.avatar = avatar;
        }
    }
}