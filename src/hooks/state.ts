import { reactive } from "vue";

export const state = reactive({
    field: [],
    centers : [[6,6], [9.5,7], [9.5,10.5], [2,2.5]]
});


for (let i=0; i<120;i++){
    state.field.push(new Array(120)
        .fill(0)
        .map(()=>Math.floor(Math.random()*44)));
}

