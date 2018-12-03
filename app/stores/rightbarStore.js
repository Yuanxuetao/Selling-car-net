export default {
    namespaced: true,
    state: {
        //右侧条是否显示
        isShowRightbar : false,
        //当前正在加入对比的车
        comparedArr: [{ "_id": "5bfb53a837c9adcdde540df5", "id": 1000003, "brand": "大众", "series": "高尔夫", "color": "蓝", "price": 8.14, "km": 135417, "engine": "1.4L", "buydate": 914464546004, "license": false, "exhaust": "国四", "gearbox": "自动", "fuel": "油电混合", "avatar": "5a4229c2eaa03750448_20.jpg", "images": { "view": ["5a4229c2eaa03750448_20.jpg", "5a4229c8dd771462960_20.jpg", "5a4229cf78382901914_20.jpg", "5a422a39b78ab986392_20.jpg", "5a422a40c2e2a699247_20.jpg"], "inner": ["5a4229e553619969710_20.jpg", "5a4229eb33fbe234682_20.jpg", "5a4229f090f20605255_20.jpg", "5a4229f622cfe569755_20.jpg", "5a422a0e014f9947050_20.jpg", "5a422a1b7b7a9235840_20.jpg", "5a422a222c9b3588375_20.jpg", "5a422a3380112743984_20.jpg"], "engine": ["5a4229d4ed53b727882_20.jpg", "5a422a533b2d3496412_20.jpg"], "more": ["5a4229da4eb43708309_20.jpg", "5a4229dfb514d371825_20.jpg", "5a4229fc1c660111870_20.jpg", "5a422a014a14f129227_20.jpg", "5a422a471e6b3731841_20.jpg", "5a422a4ce48f6667806_20.jpg", "5a422a585abd7148768_20.jpg"] }, "_index": 2, "_rowKey": 3 }, { "_id": "5bfb53a837c9adcdde540df1", "id": 1000002, "brand": "大众", "series": "高尔夫", "color": "黑", "price": 22.53, "km": 2580, "engine": "3.0L", "buydate": 1310704636173, "license": true, "exhaust": "国二", "gearbox": "自动", "fuel": "油电混合", "avatar": "5a409c5717a0c710849_20.jpg", "images": { "engine": ["5a409c6adc6f2354285_20.jpg", "5a409c7a7e474781663_20.jpg"], "more": ["5a409c716c3b0931782_20.jpg", "5a409ca54c74f886291_20.jpg", "5a409cafae801483442_20.jpg", "5a409d140d03f565102_20.jpg"], "view": ["5a409c5717a0c710849_20.jpg", "5a409c5e25de8848657_20.jpg", "5a409c642491a546766_20.jpg", "5a409d01482de401822_20.jpg", "5a409d09e3f95706843_20.jpg"], "inner": ["5a409c7f4f98b474481_20.jpg", "5a409c86b6558392235_20.jpg", "5a409c8e46a3a362323_20.jpg", "5a409c9ab1a28896583_20.jpg", "5a409cda3cccd170048_20.jpg", "5a409ce3daa62265548_20.jpg", "5a409cf639367170142_20.jpg"] }, "_index": 1, "_rowKey": 2 }, { "_id": "5bfb53a837c9adcdde540dfe", "id": 1000001, "brand": "大众", "series": "高尔夫", "color": "白", "price": 2.04, "km": 1115327, "engine": "1.8L", "buydate": 1081733795781, "license": true, "exhaust": "国二", "gearbox": "手动", "fuel": "油电混合", "avatar": "5a431eee712a1916040_20.jpg", "images": { "view": ["5a431eee712a1916040_20.jpg", "5a431ef14e77b483692_20.jpg", "5a431ef3d3100712103_20.jpg", "5a431f222a25d810647_20.jpg", "5a431f24bacf5597500_20.jpg"], "inner": ["5a431efdaddc8111692_20.jpg", "5a431f00368a0477275_20.jpg", "5a431f02c20d7835811_20.jpg", "5a431f052ed4a904077_20.jpg", "5a431f0fedeb8400974_20.jpg", "5a431f127418b383983_20.jpg", "5a431f14a0831906186_20.jpg", "5a431f175b887971421_20.jpg", "5a431f19a813e265297_20.jpg", "5a431f1f35087346417_20.jpg"], "engine": ["5a431ef67b477567191_20.jpg", "5a431f2d398b6861732_20.jpg"], "more": ["5a431ef91b96a677728_20.jpg", "5a431efb1c5f6838164_21.jpg", "5a431f07a2a6c133008_20.jpg", "5a431f0b39e3f872429_20.jpg", "5a431f277de41733472_20.jpg", "5a431f2a2f609612447_20.jpg", "5a431f2f51665578792_20.jpg"] }, "_index": 0, "_rowKey": 1 }]
    },
    mutations: {
        changeIsShowRightBar(state, { isShowRightbar}){
            state.isShowRightbar = isShowRightbar;
        },
        addComparedArrCar(state , {carinfo}){
            state.comparedArr.push(carinfo);
        },
        delComparedArrCar(state , {id}){
            state.comparedArr = state.comparedArr.filter(item=>item.id != id);
        }
    } 
}