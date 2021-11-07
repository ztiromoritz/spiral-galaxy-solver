import { reactive } from "vue";
import { defineStore } from 'pinia'


const {floor, ceil} = Math;

export const useGameState = defineStore('game-state', ()=>{
    const state = reactive({
        field: [],
        centers : [],
        trivialFields: [] // can't be removed
    });


    function forEachField(fn: (x,y, value)=>void){
        state.field.forEach((row,y)=>{
            row.forEach((value,x)=> {if(fn) fn(x,y,value);})
        })
    }

    function resetField(cols = 12, rows=12){
        for (let row=0; row<rows;row++){
            state.field.push(new Array(cols).fill(-1));
                //.map(()=>Math.floor(Math.random()*44)));
        }   
    }

    function setCenters(centers){
        state.centers = centers;
    }

    function initTrivial(){
        state.centers.forEach(([x,y], index)=>{
            state.field[floor(y)][floor(x)] = index;
            state.field[floor(y)][ceil(x)] = index;
            state.field[ceil(y)][floor(x)] = index;
            state.field[ceil(y)][ceil(x)] = index;
        })
        state.trivialFields = [];
        forEachField((x,y,value)=>{
            if(value>0) state.trivialFields.push([x,y])
        })
    }

    function allPossibleMoves(){
        // for every marked field only check left and up, 
        // because down and right will follow as mirrored 
    }

    function applyMove(){

    }

    return {state, resetField, setCenters, initTrivial};    
})






