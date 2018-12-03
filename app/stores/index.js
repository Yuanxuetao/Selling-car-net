import routerStore from "./routerStore";
import carpicStore from "./carpicStore";
import findcarStore from "./findcarStore";
import rightbarStore from "./rightbarStore";
import saleStore from "./saleStore";
import meStore from "./meStore";

export default {
    modules : {
        //路由的store
        routerStore,
        //图集的store
        carpicStore,
        //车辆大表的store
        findcarStore,
        //右侧条的store
        rightbarStore,
        //卖车的store
        saleStore,
        //登录人的store
        meStore
    }
}