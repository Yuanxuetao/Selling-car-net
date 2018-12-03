import axios from "axios";

export default {
    namespaced : true ,
    state : {
        step : 1 ,       //人类序号，从1开始，1、2、3、4
        step1Form : {},
        step2Form : {}
    },
    mutations : {
        changeStep(state , {step}){
            state.step = step;
        },
        changeStep1Form(state, { step1Form}){
            state.step1Form = step1Form;
        },
        changeStep2Form(state, { step2Form }) {
            state.step2Form = step2Form;
        }
    },
    actions : {
        addCar({state}){
            axios.post("/api/addcar" , {
                step1Form: state.step1Form,
                step2Form: state.step2Form
            })
        }
    }
}